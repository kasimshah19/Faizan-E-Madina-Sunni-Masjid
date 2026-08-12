import Donation from '../models/Donation.js';
import Member from '../models/Member.js';
import { generateReceipt } from '../services/pdfService.js';
import mongoose from 'mongoose';

/**
 * @route   POST /api/donations
 * @desc    Create a new donation (public or authenticated)
 */
export const createDonation = async (req, res, next) => {
    try {
        const { amount, category, paymentMethod, isAnonymous, donorName, donorEmail, message } = req.body;

        const donationData = {
            amount,
            category,
            paymentMethod,
            isAnonymous: Boolean(isAnonymous),
            status: 'completed', // For now, treated as directly completed/logged
            message
        };

        // If authenticated user
        if (req.user) {
            donationData.donor = req.user.id;
            // if not anonymous, derive details from the existing auth
            if (!isAnonymous) {
                donationData.donorName = req.user.fullName || donorName;
                donationData.donorEmail = req.user.email || donorEmail;
            }
        } else {
            // Guest logic
            if (!isAnonymous) {
                donationData.donorName = donorName;
                donationData.donorEmail = donorEmail;
            }
        }

        const donation = await Donation.create(donationData);

        // If logged-in user is a Member, increment their donation total
        if (req.user) {
            await Member.findOneAndUpdate(
                { user: req.user.id },
                { $inc: { donationTotal: amount } },
                { new: true }
            );
        }

        if (req.user) {
            logAction({
                userId: req.user.id,
                action: 'DONATION_RECORDED',
                module: 'Donations',
                targetId: donation._id,
                details: { amount: donation.amount },
                req
            });
        }
        return res.status(201).json({
            success: true,
            data: donation
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/donations/all
 * @desc    Get paginated all donations (admin only)
 */
export const getAllDonations = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, category, status, startDate, endDate } = req.query;

        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Fetch the list 
        let donations = await Donation.find(query)
            .populate('donor', 'fullName email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        // Respect anonymity: strip donor data from anonymous donations even for admin
        donations = donations.map(donation => {
            if (donation.isAnonymous) {
                donation.donor = null;
                donation.donorName = 'Anonymous';
                donation.donorEmail = null;
            }
            return donation;
        });

        const total = await Donation.countDocuments(query);

        return res.status(200).json({
            success: true,
            count: donations.length,
            total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            data: donations
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/donations/my
 * @desc    Get logged-in user's donations
 */
export const getMyDonations = async (req, res, next) => {
    try {
        const donations = await Donation.find({ donor: req.user.id })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: donations.length,
            data: donations
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/donations/:id
 * @desc    Get single donation by ID
 */
export const getDonationById = async (req, res, next) => {
    try {
        const donation = await Donation.findById(req.params.id)
            .populate('donor', 'fullName email');

        if (!donation) {
            return res.status(404).json({ success: false, message: 'Donation not found' });
        }

        // Role check: Only the donor or an admin can view this
        if (
            String(donation.donor?._id) !== req.user.id &&
            !['admin', 'superadmin'].includes(req.user.role)
        ) {
            return res.status(403).json({ success: false, message: 'Not authorized to view this donation' });
        }

        return res.status(200).json({
            success: true,
            data: donation
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/donations/:id/receipt
 * @desc    Download PDF Receipt
 */
export const getDonationReceipt = async (req, res, next) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ success: false, message: 'Donation not found' });
        }

        // Authorization check (simplest form for now: must be logged in as original donor OR admin)
        // NOTE: This restricts guest donors from fetching their receipt. Realistically we'd use a short-lived token generated at checkout, but for this spec auth bounds are fine
        if (
            String(donation.donor) !== req.user.id &&
            !['admin', 'superadmin'].includes(req.user.role)
        ) {
            return res.status(403).json({ success: false, message: 'Not authorized to view this receipt' });
        }

        const pdfBuffer = await generateReceipt(donation);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="receipt-${donation._id}.pdf"`);

        return res.send(pdfBuffer);
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/donations/analytics
 * @desc    Admin Aggregation Analytics
 */
export const getDonationAnalytics = async (req, res, next) => {
    try {
        // 1. Total All-time
        const totalResult = await Donation.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } }
        ]);

        const totalAmount = totalResult.length > 0 ? totalResult[0].totalAmount : 0;
        const totalCount = totalResult.length > 0 ? totalResult[0].count : 0;

        // 2. Category Pie breakdown
        const categoryResult = await Donation.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: '$category', sum: { $sum: '$amount' } } }
        ]);

        // 3. Monthly bar graph breakdown (last 12 months)
        const exactLastYear = new Date();
        exactLastYear.setMonth(exactLastYear.getMonth() - 11);
        const startOfLastYear = new Date(exactLastYear.getFullYear(), exactLastYear.getMonth(), 1);

        const monthlyResult = await Donation.aggregate([
            { $match: { status: 'completed', createdAt: { $gte: startOfLastYear } } },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    total: { $sum: '$amount' }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalAmount,
                totalCount,
                categoryBreakdown: categoryResult,
                monthlyTrends: monthlyResult
            }
        });

    } catch (error) {
        next(error);
    }
};

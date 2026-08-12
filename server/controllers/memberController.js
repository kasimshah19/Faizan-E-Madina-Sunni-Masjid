import Member from '../models/Member.js';
import Volunteer from '../models/Volunteer.js';
import User from '../models/User.js';

// @desc    Get logged in member's profile
// @route   GET /api/member/me
export const getMyMemberProfile = async (req, res) => {
    try {
        const member = await Member.findOne({ user: req.user.id });
        if (!member) {
            return res.status(404).json({ success: false, message: 'Member profile not found' });
        }
        res.status(200).json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update logged in member's profile
// @route   PUT /api/member/me
export const updateMyMemberProfile = async (req, res) => {
    try {
        const { address, city, emergencyContact } = req.body;
        const member = await Member.findOneAndUpdate(
            { user: req.user.id },
            { address, city, emergencyContact },
            { new: true, runValidators: true }
        );
        if (!member) return res.status(404).json({ success: false, message: 'Member profile not found' });
        res.status(200).json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all members
// @route   GET /api/member
export const getAllMembers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page - 1) * limit;

        const { search, membershipStatus } = req.query;
        let query = {};
        if (membershipStatus) query.membershipStatus = membershipStatus;

        let userIds = null;
        if (search) {
            const users = await User.find({
                $or: [
                    { fullName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            }).select('_id');
            userIds = users.map(u => u._id);
            query.user = { $in: userIds };
        }

        const total = await Member.countDocuments(query);
        const members = await Member.find(query)
            .skip(skip)
            .limit(limit)
            .populate('user', 'fullName email phone isEmailVerified isActive')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }, data: members });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Request Volunteer Role
// @route   POST /api/member/request-volunteer
export const requestVolunteer = async (req, res) => {
    try {
        // Check if existing
        const existing = await Volunteer.findOne({ user: req.user.id });
        if (existing) {
            return res.status(400).json({ success: false, message: `Volunteer request already exists with status: ${existing.status}` });
        }

        const request = await Volunteer.create({
            user: req.user.id,
            status: 'pending'
        });

        res.status(201).json({ success: true, message: 'Volunteer request submitted successfully', data: request });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

import Announcement from '../models/Announcement.js';
import { validationResult } from 'express-validator';

// @desc    Create a new announcement
// @route   POST /api/announcements
// @access  Private (Admin/Committee)
export const createAnnouncement = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { title, content, priority, isPinned, expiresAt } = req.body;

        const announcement = await Announcement.create({
            title,
            content,
            priority: priority || 'medium',
            isPinned: isPinned || false,
            expiresAt,
            createdBy: req.user.id,
            isActive: true,
        });

        res.status(201).json({
            success: true,
            data: announcement,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all active announcements (Public)
// @route   GET /api/announcements
// @access  Public
export const getAllAnnouncements = async (req, res, next) => {
    try {
        const { priority, page = 1, limit = 10 } = req.query;

        const now = new Date();

        // Filter out inactive and expired announcements
        let filter = {
            isActive: true,
            $or: [
                { expiresAt: { $exists: false } },
                { expiresAt: null },
                { expiresAt: { $gt: now } }
            ]
        };

        if (priority) {
            filter.priority = priority;
        }

        const parsedPage = parseInt(page, 10) || 1;
        const parsedLimit = parseInt(limit, 10) || 10;
        const startIndex = (parsedPage - 1) * parsedLimit;

        // Sort order: pinned announcements first, then by createdAt descending
        const announcements = await Announcement.find(filter)
            .sort({ isPinned: -1, createdAt: -1 })
            .skip(startIndex)
            .limit(parsedLimit)
            .populate('createdBy', 'fullName')
            .lean();

        res.status(200).json({
            success: true,
            count: announcements.length,
            pagination: {
                page: parsedPage,
                limit: parsedLimit
            },
            data: announcements,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all announcements regardless of status (Admin)
// @route   GET /api/announcements/admin/all
// @access  Private (Admin/Committee)
export const getAllAnnouncementsAdmin = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const parsedPage = parseInt(page, 10) || 1;
        const parsedLimit = parseInt(limit, 10) || 20;
        const startIndex = (parsedPage - 1) * parsedLimit;

        const announcements = await Announcement.find()
            .sort({ createdAt: -1 })
            .skip(startIndex)
            .limit(parsedLimit)
            .populate('createdBy', 'fullName email role')
            .lean();

        res.status(200).json({
            success: true,
            count: announcements.length,
            pagination: {
                page: parsedPage,
                limit: parsedLimit
            },
            data: announcements,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single announcement by ID
// @route   GET /api/announcements/:id
// @access  Public
export const getAnnouncementById = async (req, res, next) => {
    try {
        const announcement = await Announcement.findById(req.params.id)
            .populate('createdBy', 'fullName')
            .lean();

        if (!announcement) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }

        res.status(200).json({
            success: true,
            data: announcement,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update an announcement
// @route   PUT /api/announcements/:id
// @access  Private (Admin/Committee)
export const updateAnnouncement = async (req, res, next) => {
    try {
        let announcement = await Announcement.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }

        // Ownership check for committee members
        if (req.user.role === 'committee' && announcement.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Forbidden — you can only update your own announcements' });
        }

        if (req.body.createdBy) {
            delete req.body.createdBy; // Prevent transferring ownership
        }

        const { title, content, priority, isPinned, expiresAt } = req.body;

        const allowedUpdates = {
            ...(title && { title }),
            ...(content && { content }),
            ...(priority && { priority }),
            ...(isPinned !== undefined && { isPinned }),
            ...(expiresAt !== undefined && { expiresAt }),
        };

        announcement = await Announcement.findByIdAndUpdate(req.params.id, allowedUpdates, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: announcement,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private (Admin only)
export const deleteAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }

        await announcement.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
            message: 'Announcement deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle announcement active status
// @route   PATCH /api/announcements/:id/toggle-active
// @access  Private (Admin/Committee)
export const toggleAnnouncementActive = async (req, res, next) => {
    try {
        let announcement = await Announcement.findById(req.params.id);

        if (!announcement) {
            return res.status(404).json({ success: false, message: 'Announcement not found' });
        }

        // Ownership check for committee members
        if (req.user.role === 'committee' && announcement.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Forbidden — you can only alter your own announcements' });
        }

        announcement.isActive = !announcement.isActive;
        await announcement.save();

        res.status(200).json({
            success: true,
            data: announcement,
            message: `Announcement is now ${announcement.isActive ? 'active' : 'inactive'}`
        });
    } catch (error) {
        next(error);
    }
};

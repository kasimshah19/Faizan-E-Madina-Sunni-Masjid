import AuditLog from '../models/AuditLog.js';

// @desc    Get all audit logs (Admin only)
// @route   GET /api/audit-logs
export const getAuditLogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page - 1) * limit;

        const { module, action, userId, startDate, endDate } = req.query;
        let query = {};

        if (module) query.module = module;
        if (action) query.action = action;
        if (userId) query.user = userId;

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const total = await AuditLog.countDocuments(query);
        const logs = await AuditLog.find(query)
            .populate('user', 'fullName email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            data: logs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get audit logs for a specific target (Admin only)
// @route   GET /api/audit-logs/target/:targetId
export const getAuditLogsForTarget = async (req, res) => {
    try {
        const logs = await AuditLog.find({ targetId: req.params.targetId })
            .populate('user', 'fullName email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single audit log by ID (Admin only)
// @route   GET /api/audit-logs/:id
export const getAuditLogById = async (req, res) => {
    try {
        const log = await AuditLog.findById(req.params.id)
            .populate('user', 'fullName email');

        if (!log) {
            return res.status(404).json({ success: false, message: 'Audit Log not found' });
        }

        res.status(200).json({
            success: true,
            data: log
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

import ContactMessage from '../models/ContactMessage.js';
import User from '../models/User.js';
import { sendContactNotificationEmail, sendContactReplyEmail } from '../services/emailService.js';

// @desc    Visitor: Send a public contact message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = async (req, res) => {
    try {
        const { name, email, phone, subject, message, category } = req.body;

        const contactReq = await ContactMessage.create({
            name,
            email,
            phone,
            subject,
            message,
            category
        });

        // Fire-and-forget notification to admins
        // Find admins
        User.find({ role: 'admin' }).select('email').lean().then(admins => {
            const adminEmails = admins.map(a => a.email);
            sendContactNotificationEmail(adminEmails, contactReq);
        }).catch(err => console.error("Could not fetch admins for contact notification", err));

        res.status(201).json({ success: true, message: 'Message sent successfully. We will get back to you soon.', data: contactReq });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Admin: Get all contact messages
// @route   GET /api/contact/admin
// @access  Private/Admin
export const getAdminContactMessages = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const startIndex = (page - 1) * limit;

        const { search, status, category, priority, sort } = req.query;

        let query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } }
            ];
        }
        if (status) query.status = status;
        if (category) query.category = category;
        if (priority) query.priority = priority;

        // Ensure we don't fetch archived unless status explicitly requests it
        if (!status) {
            query.status = { $ne: 'archived' };
        }

        let sortStr = '-createdAt';
        if (sort === 'oldest') sortStr = 'createdAt';

        const total = await ContactMessage.countDocuments(query);
        const messages = await ContactMessage.find(query)
            .sort(sortStr)
            .skip(startIndex)
            .limit(limit)
            .populate('assignedTo', 'name fullName email')
            .populate('repliedBy', 'name fullName email');

        res.status(200).json({
            success: true,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
            data: messages
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Admin: Get single message details (marks read)
// @route   GET /api/contact/admin/:id
// @access  Private/Admin
export const getAdminContactMessageById = async (req, res) => {
    try {
        const msg = await ContactMessage.findById(req.params.id)
            .populate('assignedTo', 'name fullName email')
            .populate('repliedBy', 'name fullName email');

        if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });

        if (msg.status === 'unread') {
            msg.status = 'read';
            await msg.save();
        }

        res.status(200).json({ success: true, data: msg });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Admin: Update message attributes (status/priority/assignedTo)
// @route   PATCH /api/contact/admin/:id/status
// @access  Private/Admin
export const updateContactMessageStatus = async (req, res) => {
    try {
        const { status, priority, assignedTo } = req.body;
        const msg = await ContactMessage.findById(req.params.id);

        if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });

        if (status) msg.status = status;
        if (priority) msg.priority = priority;
        if (assignedTo) msg.assignedTo = assignedTo;

        await msg.save();

        res.status(200).json({ success: true, message: 'Updated successfully', data: msg });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Admin: Reply to Visitor
// @route   POST /api/contact/admin/:id/reply
// @access  Private/Admin
export const replyToContactMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const msg = await ContactMessage.findById(req.params.id);

        if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });

        if (msg.status === 'archived') {
            return res.status(400).json({ success: false, message: 'Cannot reply to an archived message' });
        }

        // Send Email First (Throw inside email utility if fails)
        try {
            await sendContactReplyEmail(msg.email, msg.name, msg.subject, message);
        } catch (emailErr) {
            return res.status(500).json({ success: false, message: 'Failed to dispatch reply email. Message state preserved.' });
        }

        // Update record upon successful email send
        msg.replyMessage = message;
        msg.repliedBy = req.user.id;
        msg.repliedAt = new Date();
        msg.status = 'replied';

        await msg.save();

        res.status(200).json({ success: true, message: 'Reply sent successfully', data: msg });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

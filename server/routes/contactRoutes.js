import { Router } from 'express';
import {
    createContactMessage,
    getAdminContactMessages,
    getAdminContactMessageById,
    updateContactMessageStatus,
    replyToContactMessage
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { validateContactSubmit, validateContactReply, validateContactStatusUpdate } from '../validators/contactValidator.js';

const router = Router();

// @route   POST /api/contact
// @desc    Public endpoint to send a message
router.post(
    '/',
    contactLimiter,
    validateContactSubmit,
    validate,
    createContactMessage
);

// Protected Admin Routes
router.use('/admin', protect, authorize('admin'));

// @route   GET /api/contact/admin
// @desc    Admin: get paginated list with filtering/sorting
router.get('/admin', getAdminContactMessages);

// @route   GET /api/contact/admin/:id
// @desc    Admin: view a single message
router.get('/admin/:id', getAdminContactMessageById);

// @route   PATCH /api/contact/admin/:id/status
// @desc    Admin: update status, priority, or assignment
router.patch(
    '/admin/:id/status',
    validateContactStatusUpdate,
    validate,
    updateContactMessageStatus
);

// @route   POST /api/contact/admin/:id/reply
// @desc    Admin: send email reply to visitor
router.post(
    '/admin/:id/reply',
    validateContactReply,
    validate,
    replyToContactMessage
);

export default router;

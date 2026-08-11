import { body } from 'express-validator';

export const validateContactSubmit = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('phone')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 20 }).withMessage('Phone cannot exceed 20 characters'),
    body('subject')
        .trim()
        .notEmpty().withMessage('Subject is required')
        .isLength({ min: 3, max: 200 }).withMessage('Subject must be between 3 and 200 characters'),
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10, max: 3000 }).withMessage('Message must be between 10 and 3000 characters'),
    body('category')
        .optional({ checkFalsy: true })
        .isIn(['General Inquiry', 'Donation', 'Madrasa', 'Events', 'Volunteer', 'Marriage / Nikah', 'Janazah', 'Suggestion', 'Complaint', 'Other'])
        .withMessage('Invalid category'),
];

export const validateContactReply = [
    body('message')
        .trim()
        .notEmpty().withMessage('Reply message is required')
        .isLength({ min: 10, max: 3000 }).withMessage('Reply message must be between 10 and 3000 characters'),
];

export const validateContactStatusUpdate = [
    body('status')
        .optional({ checkFalsy: true })
        .isIn(['unread', 'read', 'in_progress', 'replied', 'resolved', 'archived'])
        .withMessage('Invalid status'),
    body('priority')
        .optional({ checkFalsy: true })
        .isIn(['low', 'normal', 'high', 'urgent'])
        .withMessage('Invalid priority'),
    body('assignedTo')
        .optional({ checkFalsy: true })
        .isMongoId().withMessage('Invalid User ID'),
];

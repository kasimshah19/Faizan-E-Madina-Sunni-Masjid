import { body } from 'express-validator';

export const createAnnouncementRules = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Announcement title is required')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters'),
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Announcement content is required')
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Invalid priority level. Must be low, medium, or high.'),
    body('isPinned')
        .optional()
        .isBoolean()
        .withMessage('isPinned must be a boolean'),
    body('expiresAt')
        .optional()
        .isISO8601()
        .withMessage('Invalid date format for expiresAt')
        .custom((value) => {
            if (new Date(value) < new Date()) {
                throw new Error('Expiry date cannot be in the past');
            }
            return true;
        }),
];

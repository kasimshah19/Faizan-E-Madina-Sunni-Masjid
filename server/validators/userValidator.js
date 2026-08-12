import { body } from 'express-validator';

export const validateUpdateProfile = [
    body('fullName').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
    body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone cannot exceed 20 characters'),
    body('avatar').optional().isURL().withMessage('Avatar must be a valid URL')
];

export const validateUpdateRole = [
    body('role').isIn(['member', 'volunteer', 'committee', 'admin']).withMessage('Invalid role specified')
];

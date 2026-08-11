import { body } from 'express-validator';

export const createTeacherRules = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Teacher full name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Full name must be between 2 and 100 characters'),
    body('qualification')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Qualification cannot exceed 200 characters'),
    body('specialization')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Specialization cannot exceed 200 characters'),
    body('contact')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Contact cannot exceed 20 characters'),
];

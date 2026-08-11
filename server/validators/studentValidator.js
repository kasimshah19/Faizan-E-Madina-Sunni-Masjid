import { body } from 'express-validator';

export const createStudentRules = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Student full name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Full name must be between 2 and 100 characters'),
    body('age')
        .optional()
        .isInt({ min: 3, max: 100 })
        .withMessage('Age must be between 3 and 100'),
    body('guardianName')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Guardian name cannot exceed 100 characters'),
    body('guardianContact')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Guardian contact cannot exceed 20 characters'),
];

import { body } from 'express-validator';

export const validateUpdateSkills = [
    body('skills').optional().isArray().withMessage('Skills must be an array of strings'),
    body('skills.*').optional().isString().trim(),
    body('availability').optional().trim().isLength({ max: 200 }).withMessage('Availability cannot exceed 200 characters')
];

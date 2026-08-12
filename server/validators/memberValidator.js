import { body } from 'express-validator';

export const validateUpdateMember = [
    body('address').optional().trim().isLength({ max: 300 }).withMessage('Address cannot exceed 300 characters'),
    body('city').optional().trim().isLength({ max: 100 }).withMessage('City cannot exceed 100 characters'),
    body('emergencyContact').optional().trim().isLength({ max: 20 }).withMessage('Emergency contact cannot exceed 20 characters')
];

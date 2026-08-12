import { body } from 'express-validator';

export const validateAssignCommittee = [
    body('user').isMongoId().withMessage('Valid user ID required'),
    body('designation').trim().isLength({ min: 2, max: 100 }).withMessage('Designation must be between 2 and 100 characters'),
    body('permissions').optional().isArray().withMessage('Permissions must be an array of strings'),
    body('permissions.*').optional().isString().trim()
];

export const validateUpdatePermissions = [
    body('permissions').isArray().withMessage('Permissions must be an array of strings'),
    body('permissions.*').isString().trim()
];

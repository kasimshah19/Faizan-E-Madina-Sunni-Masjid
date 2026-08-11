import { body, validationResult } from 'express-validator';

export const uploadDocumentRules = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),

    body('category')
        .notEmpty().withMessage('Category is required')
        .isIn(['annual_report', 'notice', 'circular', 'policy', 'other'])
        .withMessage('Category must be one of: annual_report, notice, circular, policy, other'),

    body('isPublic')
        .optional()
        .isBoolean().withMessage('isPublic must be a boolean value')
];

export const updateDocumentRules = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 2 }).withMessage('Title must be at least 2 characters'),

    body('category')
        .optional()
        .isIn(['annual_report', 'notice', 'circular', 'policy', 'other'])
        .withMessage('Category must be one of: annual_report, notice, circular, policy, other'),

    body('isPublic')
        .optional()
        .isBoolean().withMessage('isPublic must be a boolean value')
];

export const validateDocument = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = {};
        errors.array().forEach((err) => {
            extractedErrors[err.path] = err.msg;
        });

        return res.status(400).json({
            success: false,
            message: 'Validation Failed',
            errors: extractedErrors,
        });
    }
    next();
};

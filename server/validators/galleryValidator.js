import { body, validationResult } from 'express-validator';

export const uploadGalleryRules = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 2 })
        .withMessage('Title must be at least 2 characters'),

    body('category')
        .optional()
        .isIn(['events', 'mosque', 'madrasa', 'community', 'other'])
        .withMessage('Category must be one of: events, mosque, madrasa, community, other'),
];

export const updateGalleryRules = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Title must be at least 2 characters'),

    body('category')
        .optional()
        .isIn(['events', 'mosque', 'madrasa', 'community', 'other'])
        .withMessage('Category must be one of: events, mosque, madrasa, community, other'),
];

export const validateGallery = (req, res, next) => {
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

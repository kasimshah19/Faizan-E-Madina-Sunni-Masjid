import { body, validationResult } from 'express-validator';

export const createDonationRules = [
    body('amount')
        .isNumeric().withMessage('Amount must be a number')
        .custom(value => parseFloat(value) > 0).withMessage('Amount must be greater than 0'),

    body('category')
        .isIn(['general', 'ramadan', 'construction', 'water', 'electricity', 'madrasa'])
        .withMessage('Invalid donation category'),

    body('paymentMethod')
        .isIn(['cash', 'online', 'bank_transfer'])
        .withMessage('Invalid payment method'),

    body('donorName')
        .custom((value, { req }) => {
            // If there is no authenticated user and it's not marked as anonymous, donorName is required
            if (!req.user && !req.body.isAnonymous && !value) {
                throw new Error('Donor name is required for guest checkout');
            }
            return true;
        }),

    body('donorEmail')
        .custom((value, { req }) => {
            // If there is no authenticated user and it's not marked as anonymous, donorEmail is required
            if (!req.user && !req.body.isAnonymous && !value) {
                throw new Error('Donor email is required for guest checkout');
            }
            if (value) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(value)) {
                    throw new Error('Please provide a valid email address');
                }
            }
            return true;
        }),
];

export const validateDonation = (req, res, next) => {
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

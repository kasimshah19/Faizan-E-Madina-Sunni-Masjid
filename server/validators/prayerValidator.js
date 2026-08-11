import { body, validationResult } from 'express-validator';

// 24-Hour Time Regex Validation (e.g. 14:30)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const timeMessage = 'Must be in HH:MM format (24-hour)';

export const updatePrayerRules = [
    body('date').isISO8601().withMessage('Valid date is required'),
    body('fajr').matches(timeRegex).withMessage(`Fajr: ${timeMessage}`),
    body('sunrise').matches(timeRegex).withMessage(`Sunrise: ${timeMessage}`),
    body('zuhr').matches(timeRegex).withMessage(`Zuhr: ${timeMessage}`),
    body('asr').matches(timeRegex).withMessage(`Asr: ${timeMessage}`),
    body('maghrib').matches(timeRegex).withMessage(`Maghrib: ${timeMessage}`),
    body('isha').matches(timeRegex).withMessage(`Isha: ${timeMessage}`),
    // Jummah might only be on fridays, but we format validate it anyway if provided
    body('jummah').optional({ checkFalsy: true }).matches(timeRegex).withMessage(`Jummah: ${timeMessage}`),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Standardize validation error response structure format
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

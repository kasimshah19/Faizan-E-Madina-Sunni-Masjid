import { body, param, query } from 'express-validator';

export const createEventRules = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Event title is required')
        .isLength({ min: 3 })
        .withMessage('Event title must be at least 3 characters'),
    body('category')
        .notEmpty()
        .withMessage('Event category is required')
        .isIn([
            'islamic_lecture',
            'ramadan',
            'eid_prayer',
            'youth_program',
            'quran_competition',
            'charity',
        ])
        .withMessage('Invalid event category'),
    body('date')
        .notEmpty()
        .withMessage('Event date is required')
        .isISO8601()
        .withMessage('Invalid date format')
        .custom((value) => {
            const selectedDate = new Date(value);
            selectedDate.setHours(0, 0, 0, 0); // Ignore time for comparison
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                throw new Error('Event date cannot be in the past');
            }
            return true;
        }),
    body('startTime')
        .optional()
        .notEmpty()
        .withMessage('Start time cannot be empty if provided'),
    body('endTime')
        .optional()
        .notEmpty()
        .withMessage('End time cannot be empty if provided'),
    body('location')
        .notEmpty()
        .withMessage('Location is required')
        .trim(),
    body('maxAttendees')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Max attendees must be a positive integer'),
    body('isRegistrationRequired')
        .optional()
        .isBoolean()
        .withMessage('isRegistrationRequired must be a boolean')
];

export const rsvpRules = [
    param('id')
        .isMongoId()
        .withMessage('Invalid event ID format')
];

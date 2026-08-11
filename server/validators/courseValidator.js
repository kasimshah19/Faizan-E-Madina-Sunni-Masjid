import { body } from 'express-validator';

export const createCourseRules = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Course name is required')
        .isLength({ min: 2, max: 200 })
        .withMessage('Course name must be between 2 and 200 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('Description cannot exceed 2000 characters'),
    body('teacher')
        .notEmpty()
        .withMessage('Teacher reference is required')
        .isMongoId()
        .withMessage('Invalid Teacher ID format'),
    body('schedule')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Schedule cannot exceed 200 characters'),
    body('duration')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Duration cannot exceed 100 characters'),
    body('maxStudents')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Max students must be at least 1')
];

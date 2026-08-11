import { body } from 'express-validator';

export const markAttendanceRules = [
    body('studentId')
        .notEmpty()
        .withMessage('Student ID is required')
        .isMongoId()
        .withMessage('Invalid Student ID format'),
    body('courseId')
        .notEmpty()
        .withMessage('Course ID is required')
        .isMongoId()
        .withMessage('Invalid Course ID format'),
    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Invalid date format'),
    body('status')
        .notEmpty()
        .withMessage('Attendance status is required')
        .isIn(['present', 'absent', 'late', 'excused'])
        .withMessage('Status must be present, absent, late, or excused')
];

export const markBulkAttendanceRules = [
    body('courseId')
        .notEmpty()
        .withMessage('Course ID is required')
        .isMongoId()
        .withMessage('Invalid Course ID format'),
    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Invalid date format'),
    body('records')
        .isArray({ min: 1 })
        .withMessage('Records must be an array with at least one item'),
    body('records.*.studentId')
        .notEmpty()
        .withMessage('Student ID is required for all records')
        .isMongoId()
        .withMessage('Invalid Student ID format in records'),
    body('records.*.status')
        .notEmpty()
        .withMessage('Status is required for all records')
        .isIn(['present', 'absent', 'late', 'excused'])
        .withMessage('Invalid status in records')
];

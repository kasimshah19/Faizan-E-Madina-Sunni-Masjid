import { body } from 'express-validator';

export const recordGradeRules = [
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
    body('assessmentName')
        .trim()
        .notEmpty()
        .withMessage('Assessment name is required')
        .isLength({ max: 100 })
        .withMessage('Assessment name cannot exceed 100 characters'),
    body('marksObtained')
        .notEmpty()
        .withMessage('Marks obtained is required')
        .isNumeric()
        .withMessage('Marks obtained must be a number'),
    body('totalMarks')
        .notEmpty()
        .withMessage('Total marks is required')
        .isNumeric()
        .withMessage('Total marks must be a number')
        .custom((value, { req }) => {
            if (value < 1) throw new Error('Total marks must be greater than 0');
            if (req.body.marksObtained > value) throw new Error('Marks obtained cannot be greater than total marks');
            return true;
        }),
    body('remarks')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Remarks cannot exceed 500 characters')
];

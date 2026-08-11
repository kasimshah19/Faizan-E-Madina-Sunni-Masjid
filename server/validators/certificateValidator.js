import { body, param, query } from 'express-validator';
import mongoose from 'mongoose';

const VALID_TYPES = [
    'Madrasa Course Completion',
    'Quran Course Completion',
    'Tajweed Course Completion',
    'Hifz Program Completion',
    'Arabic Learning Completion',
    'Quran Competition Participation',
    'Quran Competition Achievement',
    'Islamic Education Program',
    'Event Participation',
    'Volunteer Appreciation'
];

export const validateCreateRequest = [
    body('recipient')
        .notEmpty().withMessage('Recipient User ID is required')
        .custom((val) => mongoose.Types.ObjectId.isValid(val)).withMessage('Invalid Recipient ID format'),
    body('certificateType')
        .notEmpty().withMessage('Certificate Type is required')
        .isIn(VALID_TYPES).withMessage('Invalid Certificate Type'),
    body('title')
        .notEmpty().withMessage('Certificate title is required'),
    body('completionDate')
        .notEmpty().withMessage('Completion date is required')
        .isISO8601().withMessage('Must be a valid date'),
    body('course')
        .optional()
        .custom((val) => mongoose.Types.ObjectId.isValid(val)).withMessage('Invalid Course ID format'),
    body('event')
        .optional()
        .custom((val) => mongoose.Types.ObjectId.isValid(val)).withMessage('Invalid Event ID format'),
    body('student')
        .optional()
        .custom((val) => mongoose.Types.ObjectId.isValid(val)).withMessage('Invalid Student ID format'),
];

export const validateCertIdParam = [
    param('id')
        .notEmpty().withMessage('Certificate ID is required')
        .custom((val) => mongoose.Types.ObjectId.isValid(val)).withMessage('Invalid Certificate ID format')
];

export const validateCertNumberParam = [
    param('certificateNumber')
        .notEmpty().withMessage('Certificate Number is required')
        .matches(/^FEM-\d{4}-.+-\d{6}$/).withMessage('Invalid Certificate Number Format')
];

import { query, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';

// Validation result checker
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

export const getAuditLogsValidator = [
    query('startDate').optional().isISO8601().withMessage('startDate must be a valid ISO8601 date'),
    query('endDate').optional().isISO8601().withMessage('endDate must be a valid ISO8601 date'),
    query('userId').optional().custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('userId must be a valid Mongo ObjectId'),
    checkValidation
];

export const getAuditLogsForTargetValidator = [
    param('targetId').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('targetId must be a valid Mongo ObjectId'),
    checkValidation
];

export const getAuditLogByIdValidator = [
    param('id').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('id must be a valid Mongo ObjectId'),
    checkValidation
];

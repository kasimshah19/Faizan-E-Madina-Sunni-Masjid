import express from 'express';
import {
    getAuditLogs,
    getAuditLogsForTarget,
    getAuditLogById
} from '../controllers/auditLogController.js';
import {
    getAuditLogsValidator,
    getAuditLogsForTargetValidator,
    getAuditLogByIdValidator
} from '../validators/auditLogValidator.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All audit log routes are restricted to admins
router.use(protect);
router.use(authorize('admin'));

// Route ordering is important - /target/:targetId must come before /:id
router.get('/', getAuditLogsValidator, getAuditLogs);
router.get('/target/:targetId', getAuditLogsForTargetValidator, getAuditLogsForTarget);
router.get('/:id', getAuditLogByIdValidator, getAuditLogById);

export default router;

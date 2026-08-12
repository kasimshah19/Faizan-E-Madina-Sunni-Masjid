import { Router } from 'express';
import {
    getMyCommitteeProfile,
    getAllCommitteeMembers,
    assignCommitteeMember,
    updateCommitteePermissions,
    removeCommitteeMember
} from '../controllers/committeeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { validateAssignCommittee, validateUpdatePermissions } from '../validators/committeeValidator.js';

const router = Router();

// Committee access
router.get('/me', protect, authorize('committee'), getMyCommitteeProfile);

// Views for Admin/Committee
router.get('/', protect, authorize('admin', 'committee'), getAllCommitteeMembers);

// Admin Management
router.post('/assign', protect, authorize('admin'), validateAssignCommittee, validate, assignCommitteeMember);
router.put('/:id/permissions', protect, authorize('admin'), validateUpdatePermissions, validate, updateCommitteePermissions);
router.delete('/:id', protect, authorize('admin'), removeCommitteeMember);

export default router;

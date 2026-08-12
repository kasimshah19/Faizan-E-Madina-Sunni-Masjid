import { Router } from 'express';
import {
    getMyMemberProfile,
    updateMyMemberProfile,
    getAllMembers,
    requestVolunteer
} from '../controllers/memberController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { validateUpdateMember } from '../validators/memberValidator.js';

const router = Router();

// Member access routes
router.get('/me', protect, authorize('member'), getMyMemberProfile);
router.put('/me', protect, authorize('member'), validateUpdateMember, validate, updateMyMemberProfile);
router.post('/request-volunteer', protect, authorize('member'), requestVolunteer);

// Admin / Committee routes
router.get('/', protect, authorize('admin', 'committee'), getAllMembers);

export default router;

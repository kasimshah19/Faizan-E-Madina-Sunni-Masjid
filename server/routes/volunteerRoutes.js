import { Router } from 'express';
import {
    getMyVolunteerProfile,
    getAllVolunteers,
    approveVolunteerRequest,
    rejectVolunteerRequest,
    updateVolunteerSkills
} from '../controllers/volunteerController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { validateUpdateSkills } from '../validators/volunteerValidator.js';

const router = Router();

// Volunteer access to own profile
// Allow members to view pending status (if member, they can see their Volunteer doc status)
router.get('/me', protect, authorize('volunteer', 'member'), getMyVolunteerProfile);
router.put('/me/skills', protect, authorize('volunteer'), validateUpdateSkills, validate, updateVolunteerSkills);

// Admin / Committee view all
router.get('/', protect, authorize('admin', 'committee'), getAllVolunteers);

// Admin approval workflow
router.put('/:id/approve', protect, authorize('admin'), approveVolunteerRequest);
router.put('/:id/reject', protect, authorize('admin'), rejectVolunteerRequest);

export default router;

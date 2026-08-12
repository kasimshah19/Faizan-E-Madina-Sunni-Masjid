import { Router } from 'express';
import {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    getUserById,
    updateUserRole,
    toggleUserActive,
    deleteUser
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { validateUpdateProfile, validateUpdateRole } from '../validators/userValidator.js';

const router = Router();

// Order matters: /me routes before /:id routes
router.get('/me', protect, getMyProfile);
router.put('/me', protect, validateUpdateProfile, validate, updateMyProfile);

// Admin only routes
router.use(protect, authorize('admin'));

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id/role', validateUpdateRole, validate, updateUserRole);
router.patch('/:id/toggle-active', toggleUserActive);
router.delete('/:id', deleteUser);

export default router;

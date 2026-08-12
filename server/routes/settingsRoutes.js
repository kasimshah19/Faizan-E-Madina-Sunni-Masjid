import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public route for frontend to read settings (e.g. maintenance mode boolean)
router.get('/', getSettings);

// Protected routes
router.use(protect);
router.use(authorize('admin')); // Only super admins can change system rules

router.put('/', updateSettings);

export default router;

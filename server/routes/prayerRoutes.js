import express from 'express';
import {
    getTodayPrayerTimes,
    getAllPrayerTimes,
    updatePrayerTimes,
    deletePrayerTimes,
} from '../controllers/prayerController.js';
import { updatePrayerRules, validate } from '../validators/prayerValidator.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

/**
 * Public Routes
 */
router.get('/today', getTodayPrayerTimes);
router.get('/', getAllPrayerTimes);

/**
 * Protected Routes (Admin Only)
 */
router.put(
    '/update',
    protect,
    authorize('admin', 'superadmin'),
    updatePrayerRules,
    validate,
    updatePrayerTimes
);

router.delete(
    '/:id',
    protect,
    authorize('admin', 'superadmin'),
    deletePrayerTimes
);

export default router;

import express from 'express';
import { getDashboardStats, getFinancialChartData, getDemographicStats } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Apply auth middleware to all analytics routes (admin only)
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard-stats', getDashboardStats);
router.get('/financial-chart', getFinancialChartData);
router.get('/demographics', getDemographicStats);

export default router;

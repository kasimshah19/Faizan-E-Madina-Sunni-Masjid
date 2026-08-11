import express from 'express';
import {
    createAnnouncement,
    getAllAnnouncements,
    getAllAnnouncementsAdmin,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement,
    toggleAnnouncementActive
} from '../controllers/announcementController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { createAnnouncementRules } from '../validators/announcementValidator.js';

const router = express.Router();

// Public routes
router.get('/', getAllAnnouncements);

// Protected routes - Admin specific GET
router.get('/admin/all', protect, authorize('admin', 'committee'), getAllAnnouncementsAdmin);

// Public route (needs to be after admin-specific routes)
router.get('/:id', getAnnouncementById);

// Protected routes - Admin/Committee
router.post('/', protect, authorize('admin', 'committee'), createAnnouncementRules, createAnnouncement);
router.put('/:id', protect, authorize('admin', 'committee'), updateAnnouncement);
router.patch('/:id/toggle-active', protect, authorize('admin', 'committee'), toggleAnnouncementActive);

// Protected routes - Admin only
router.delete('/:id', protect, authorize('admin'), deleteAnnouncement);

export default router;

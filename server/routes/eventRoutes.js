import express from 'express';
import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    rsvpToEvent,
    cancelRsvp,
    getEventRegistrations,
    getMyRsvps
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { createEventRules, rsvpRules } from '../validators/eventValidator.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);

// Protected routes - any authenticated user
router.get('/my-rsvps', protect, getMyRsvps);

// Public route (needs to be after /my-rsvps to prevent route conflict)
router.get('/:id', getEventById);

// Protected routes - authenticated specific interactions
router.post('/:id/rsvp', protect, rsvpRules, rsvpToEvent);
router.delete('/:id/rsvp', protect, rsvpRules, cancelRsvp);

// Admin/Committee routes
router.post('/', protect, authorize('admin', 'committee'), createEventRules, createEvent);
router.put('/:id', protect, authorize('admin', 'committee'), updateEvent);
router.get('/:id/registrations', protect, authorize('admin', 'committee'), getEventRegistrations);

// Admin only route
router.delete('/:id', protect, authorize('admin'), deleteEvent);

export default router;

import express from 'express';
import {
    enrollStudentInCourse,
    unenrollStudentFromCourse
} from '../controllers/enrollmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Base /api/enrollments
router.post('/', protect, authorize('admin', 'committee'), enrollStudentInCourse);
router.delete('/', protect, authorize('admin', 'committee'), unenrollStudentFromCourse);

export default router;

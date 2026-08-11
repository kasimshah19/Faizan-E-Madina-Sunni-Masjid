import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { createCourseRules } from '../validators/courseValidator.js';

const router = express.Router();

router.post('/', protect, authorize('admin', 'committee'), createCourseRules, createCourse);
router.get('/', getAllCourses); // Public
router.get('/:id', getCourseById); // Public
router.put('/:id', protect, authorize('admin', 'committee'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

export default router;

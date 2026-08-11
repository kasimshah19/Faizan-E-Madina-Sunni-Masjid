import express from 'express';
import {
    createTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} from '../controllers/teacherController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { createTeacherRules } from '../validators/teacherValidator.js';

const router = express.Router();

router.post('/', protect, authorize('admin'), createTeacherRules, createTeacher);
router.get('/', getAllTeachers); // Public
router.get('/:id', getTeacherById); // Public
router.put('/:id', protect, authorize('admin'), updateTeacher);
router.delete('/:id', protect, authorize('admin'), deleteTeacher);

export default router;

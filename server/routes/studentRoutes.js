import express from 'express';
import {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { createStudentRules } from '../validators/studentValidator.js';

const router = express.Router();

router.post('/', protect, authorize('admin', 'committee'), createStudentRules, createStudent);
router.get('/', protect, authorize('admin', 'committee', 'teacher'), getAllStudents);
router.get('/:id', protect, getStudentById); // Role authorization check handled inside controller
router.put('/:id', protect, authorize('admin', 'committee'), updateStudent);
router.delete('/:id', protect, authorize('admin'), deleteStudent);

export default router;

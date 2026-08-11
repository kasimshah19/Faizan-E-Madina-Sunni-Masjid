import express from 'express';
import {
    recordGrade,
    getStudentGrades,
    updateGrade,
    deleteGrade
} from '../controllers/gradeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { recordGradeRules } from '../validators/gradeValidator.js';

const router = express.Router();

router.post('/', protect, authorize('admin', 'committee', 'teacher'), recordGradeRules, recordGrade);
router.get('/student/:id', protect, getStudentGrades); // Custom role checks inside controller or open for that student
router.put('/:id', protect, authorize('admin', 'committee', 'teacher'), updateGrade);
router.delete('/:id', protect, authorize('admin', 'committee', 'teacher'), deleteGrade);

export default router;

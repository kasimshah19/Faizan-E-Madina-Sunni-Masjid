import express from 'express';
import {
    markAttendance,
    markBulkAttendance,
    getStudentAttendance,
    getCourseAttendance
} from '../controllers/attendanceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { markAttendanceRules, markBulkAttendanceRules } from '../validators/attendanceValidator.js';

const router = express.Router();

router.post('/', protect, authorize('admin', 'committee', 'teacher'), markAttendanceRules, markAttendance);
router.post('/bulk', protect, authorize('admin', 'committee', 'teacher'), markBulkAttendanceRules, markBulkAttendance);
router.get('/student/:id', protect, getStudentAttendance); // Authorization handled internally
router.get('/course/:id', protect, authorize('admin', 'committee', 'teacher'), getCourseAttendance);

export default router;

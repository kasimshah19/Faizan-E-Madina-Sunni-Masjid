import Attendance from '../models/Attendance.js';
import { validationResult } from 'express-validator';

// @desc    Mark attendance for a student (upsert)
// @route   POST /api/attendance
// @access  Private (Admin/Committee/Teacher)
export const markAttendance = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { studentId, courseId, date, status } = req.body;

        // Normalize date to ignore time for upsert matching
        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

        const filter = {
            student: studentId,
            course: courseId,
            date: attendanceDate
        };

        const update = {
            status,
            markedBy: req.user.id
        };

        // Upsert behavior: Update if exists, otherwise create
        const attendance = await Attendance.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: attendance,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Bulk mark attendance for multiple students (upsert)
// @route   POST /api/attendance/bulk
// @access  Private (Admin/Committee/Teacher)
export const markBulkAttendance = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { courseId, date, records } = req.body;

        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

        // Using Promise.all for parallel upserts
        const promises = records.map(record => {
            const filter = {
                student: record.studentId,
                course: courseId,
                date: attendanceDate
            };
            const update = {
                status: record.status,
                markedBy: req.user.id
            };

            return Attendance.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true,
                runValidators: true,
            });
        });

        const results = await Promise.all(promises);

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get attendance history for a single student
// @route   GET /api/attendance/student/:id
// @access  Private
export const getStudentAttendance = async (req, res, next) => {
    try {
        const studentId = req.params.id;
        const { courseId, startDate, endDate } = req.query;

        let filter = { student: studentId };

        if (courseId) filter.course = courseId;
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        const records = await Attendance.find(filter)
            .populate('course', 'name')
            .populate('markedBy', 'fullName')
            .sort({ date: -1 })
            .lean();

        // Compute Summary
        const totalClasses = records.length;
        const presentCount = records.filter(r => r.status === 'present').length;
        const absentCount = records.filter(r => r.status === 'absent').length;
        const lateCount = records.filter(r => r.status === 'late').length;
        const excusedCount = records.filter(r => r.status === 'excused').length;

        // Treat 'late' as present for simple percentage calculation, but tracking raw stats
        const attendancePercentage = totalClasses === 0 ? 100 : Math.round(((presentCount + lateCount) / totalClasses) * 100);

        res.status(200).json({
            success: true,
            summary: {
                totalClasses,
                presentCount,
                absentCount,
                lateCount,
                excusedCount,
                attendancePercentage
            },
            count: records.length,
            data: records
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get attendance by course for a specific date
// @route   GET /api/attendance/course/:id
// @access  Private (Admin/Committee/Teacher)
export const getCourseAttendance = async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const { date, startDate, endDate } = req.query;

        let filter = { course: courseId };

        if (date) {
            const queryDate = new Date(date);
            queryDate.setHours(0, 0, 0, 0);
            filter.date = queryDate;
        } else if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        const records = await Attendance.find(filter)
            .populate('student', 'fullName guardName')
            .sort({ date: -1 })
            .lean();

        res.status(200).json({
            success: true,
            count: records.length,
            data: records
        });
    } catch (error) {
        next(error);
    }
};

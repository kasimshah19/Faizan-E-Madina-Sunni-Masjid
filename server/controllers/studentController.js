import Student from '../models/Student.js';
import Course from '../models/Course.js';
import { validationResult } from 'express-validator';

// @desc    Create a new student
// @route   POST /api/students
// @access  Private (Admin/Committee)
export const createStudent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { user, fullName, age, guardianName, guardianContact, admissionDate, status } = req.body;

        const student = await Student.create({
            user: user || undefined,
            fullName,
            age,
            guardianName,
            guardianContact,
            admissionDate,
            status: status || 'active',
        });

        res.status(201).json({
            success: true,
            data: student,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Private (Admin/Committee/Teacher)
export const getAllStudents = async (req, res, next) => {
    try {
        const { status, search, page = 1, limit = 20 } = req.query;

        let filter = {};
        if (status) filter.status = status;
        if (search) filter.fullName = { $regex: search, $options: 'i' };

        const parsedPage = parseInt(page, 10) || 1;
        const parsedLimit = parseInt(limit, 10) || 20;
        const startIndex = (parsedPage - 1) * parsedLimit;

        const students = await Student.find(filter)
            .skip(startIndex)
            .limit(parsedLimit)
            .sort({ fullName: 1 })
            .lean();

        res.status(200).json({
            success: true,
            count: students.length,
            pagination: {
                page: parsedPage,
                limit: parsedLimit
            },
            data: students,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private (Admin/Committee/Teacher, or original user)
export const getStudentById = async (req, res, next) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId)
            .populate({
                path: 'enrolledCourses',
                select: 'name teacher',
                populate: {
                    path: 'teacher',
                    select: 'fullName'
                }
            })
            .lean();

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Role check: if normal member/user, ensure they can only view their own student profile
        if (req.user.role === 'member' || req.user.role === 'volunteer' || req.user.role === 'public') {
            if (student.user?.toString() !== req.user.id) {
                return res.status(403).json({ success: false, message: 'Forbidden — you can only view your own student record' });
            }
        }

        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Private (Admin/Committee)
export const updateStudent = async (req, res, next) => {
    try {
        let student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Don't modify enrolledCourses via this endpoint, use enroll controller!
        if (req.body.enrolledCourses) {
            delete req.body.enrolledCourses;
        }

        student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private (Admin only)
export const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        // Remove student from any Course.enrolledStudents arrays
        await Course.updateMany(
            { enrolledStudents: student._id },
            { $pull: { enrolledStudents: student._id } }
        );

        // Note: Attendance and Grade records are explicitly retained as historical data
        // based on original requirements. (No deletion of those).

        await student.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
            message: 'Student deleted successfully. History retained.'
        });
    } catch (error) {
        next(error);
    }
};

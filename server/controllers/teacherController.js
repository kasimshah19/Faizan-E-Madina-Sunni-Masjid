import Teacher from '../models/Teacher.js';
import { validationResult } from 'express-validator';

// @desc    Create a new teacher
// @route   POST /api/teachers
// @access  Private (Admin only)
export const createTeacher = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { user, fullName, qualification, specialization, contact, joinedDate, status } = req.body;

        const teacher = await Teacher.create({
            user: user || undefined,
            fullName,
            qualification,
            specialization,
            contact,
            joinedDate,
            status: status || 'active',
        });

        res.status(201).json({
            success: true,
            data: teacher,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Public
export const getAllTeachers = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        let filter = {};
        if (status) filter.status = status;

        const parsedPage = parseInt(page, 10) || 1;
        const parsedLimit = parseInt(limit, 10) || 20;
        const startIndex = (parsedPage - 1) * parsedLimit;

        const teachers = await Teacher.find(filter)
            .skip(startIndex)
            .limit(parsedLimit)
            .sort({ fullName: 1 })
            .populate('assignedCourses', 'name schedule duration')
            .lean();

        res.status(200).json({
            success: true,
            count: teachers.length,
            pagination: {
                page: parsedPage,
                limit: parsedLimit
            },
            data: teachers,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get teacher by ID
// @route   GET /api/teachers/:id
// @access  Public
export const getTeacherById = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id)
            .populate('assignedCourses', 'name schedule duration maxStudents')
            .lean();

        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }

        res.status(200).json({
            success: true,
            data: teacher,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a teacher
// @route   PUT /api/teachers/:id
// @access  Private (Admin only)
export const updateTeacher = async (req, res, next) => {
    try {
        let teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }

        // Don't modify assignedCourses via this generic endpoint
        if (req.body.assignedCourses) {
            delete req.body.assignedCourses;
        }

        const { fullName, qualification, specialization, contact, joinedDate, status } = req.body;
        const allowedUpdates = {
            ...(fullName && { fullName }),
            ...(qualification && { qualification }),
            ...(specialization && { specialization }),
            ...(contact && { contact }),
            ...(joinedDate && { joinedDate }),
            ...(status && { status }),
        };

        teacher = await Teacher.findByIdAndUpdate(req.params.id, allowedUpdates, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: teacher,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a teacher
// @route   DELETE /api/teachers/:id
// @access  Private (Admin only)
export const deleteTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }

        // Hard block deletion if this teacher is assigned to active courses
        if (teacher.assignedCourses && teacher.assignedCourses.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete teacher with active course assignments — reassign courses first'
            });
        }

        await teacher.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
            message: 'Teacher deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};

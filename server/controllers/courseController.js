import Course from '../models/Course.js';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';
import { validationResult } from 'express-validator';

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Admin/Committee)
export const createCourse = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, description, teacher, schedule, duration, maxStudents } = req.body;

        const teacherObj = await Teacher.findById(teacher);
        if (!teacherObj) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }

        const course = await Course.create({
            name,
            description,
            teacher,
            schedule,
            duration,
            maxStudents,
            enrolledStudents: [],
        });

        // Push course ID into Teacher's assignedCourses array
        teacherObj.assignedCourses.push(course._id);
        await teacherObj.save();

        res.status(201).json({
            success: true,
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find()
            .populate('teacher', 'fullName')
            .lean();

        const enrichedCourses = courses.map(course => {
            return {
                ...course,
                enrolledCount: course.enrolledStudents.length,
                // Optional privacy scrub: omit student list from public view completely
                enrolledStudents: undefined
            };
        });

        res.status(200).json({
            success: true,
            count: enrichedCourses.length,
            data: enrichedCourses,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('teacher', 'fullName specification contact')
            .lean();

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({
            success: true,
            data: {
                ...course,
                enrolledCount: course.enrolledStudents.length,
                enrolledStudents: undefined // Privacy protection: Do not expose student IDs/List publicly
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private (Admin/Committee)
export const updateCourse = async (req, res, next) => {
    try {
        let course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        const oldTeacherId = course.teacher.toString();
        const newTeacherId = req.body.teacher;

        // Handle Teacher change mapping
        if (newTeacherId && oldTeacherId !== newTeacherId) {
            const newTeacher = await Teacher.findById(newTeacherId);
            if (!newTeacher) {
                return res.status(404).json({ success: false, message: 'New Teacher not found' });
            }

            // Remove course from old teacher
            await Teacher.findByIdAndUpdate(oldTeacherId, {
                $pull: { assignedCourses: course._id }
            });

            // Add course to new teacher
            await Teacher.findByIdAndUpdate(newTeacherId, {
                $addToSet: { assignedCourses: course._id }
            });
        }

        if (req.body.enrolledStudents) {
            delete req.body.enrolledStudents; // Enrollment endpoints should handle this
        }

        const { name, description, teacher: bodyTeacher, schedule, duration, maxStudents } = req.body;

        const allowedUpdates = {
            ...(name && { name }),
            ...(description && { description }),
            ...(bodyTeacher && { teacher: bodyTeacher }),
            ...(schedule && { schedule }),
            ...(duration && { duration }),
            ...(maxStudents !== undefined && { maxStudents }),
        };

        course = await Course.findByIdAndUpdate(req.params.id, allowedUpdates, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private (Admin only)
export const deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Cascade Cleanup 1: Remove from assigned teacher
        await Teacher.findByIdAndUpdate(course.teacher, {
            $pull: { assignedCourses: course._id }
        });

        // Cascade Cleanup 2: Remove from all enrolled students
        await Student.updateMany(
            { enrolledCourses: course._id },
            { $pull: { enrolledCourses: course._id } }
        );

        // Note: Attendance and Grade records will remain for historical context

        await course.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
            message: 'Course deleted successfully. Teacher and Student references cleaned up.'
        });
    } catch (error) {
        next(error);
    }
};

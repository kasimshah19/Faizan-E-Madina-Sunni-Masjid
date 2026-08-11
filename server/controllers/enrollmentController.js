import Course from '../models/Course.js';
import Student from '../models/Student.js';

// @desc    Enroll a student into a course
// @route   POST /api/enrollments
// @access  Private (Admin/Committee)
export const enrollStudentInCourse = async (req, res, next) => {
    try {
        const { studentId, courseId } = req.body;

        if (!studentId || !courseId) {
            return res.status(400).json({ success: false, message: 'studentId and courseId are required' });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // Check if already enrolled
        if (student.enrolledCourses.includes(courseId) || course.enrolledStudents.includes(studentId)) {
            return res.status(400).json({ success: false, message: 'Student is already enrolled in this course' });
        }

        // Check course limits
        if (course.maxStudents && course.enrolledStudents.length >= course.maxStudents) {
            return res.status(400).json({ success: false, message: 'Course is full' });
        }

        // Note: Due to lack of robust multi-doc transaction replica set guarantees locally, using sequential updates
        // The safest fallback is catching errors mid-update and attempting a rollback, or leaving a detailed log
        try {
            // Step 1: Update Course
            course.enrolledStudents.push(studentId);
            await course.save();

            // Step 2: Update Student
            student.enrolledCourses.push(courseId);
            await student.save();

            res.status(201).json({
                success: true,
                message: 'Student enrolled successfully',
            });
        } catch (err) {
            console.error(`Enrollment failed partially, student: ${studentId}, course: ${courseId}`, err);
            // Fallback rollback
            await Course.findByIdAndUpdate(courseId, { $pull: { enrolledStudents: studentId } }).catch(() => { });
            return res.status(500).json({ success: false, message: 'Enrollment process failed. Reverted state.' });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Unenroll a student from a course
// @route   DELETE /api/enrollments
// @access  Private (Admin/Committee)
export const unenrollStudentFromCourse = async (req, res, next) => {
    try {
        const { studentId, courseId } = req.body;

        if (!studentId || !courseId) {
            return res.status(400).json({ success: false, message: 'studentId and courseId are required' });
        }

        // Step 1: Update Course
        await Course.findByIdAndUpdate(courseId, {
            $pull: { enrolledStudents: studentId }
        });

        // Step 2: Update Student
        await Student.findByIdAndUpdate(studentId, {
            $pull: { enrolledCourses: courseId }
        });

        res.status(200).json({
            success: true,
            message: 'Student unenrolled successfully',
        });
    } catch (error) {
        next(error);
    }
};

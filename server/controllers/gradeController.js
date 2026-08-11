import Grade from '../models/Grade.js';
import { validationResult } from 'express-validator';

// @desc    Record a new grade
// @route   POST /api/grades
// @access  Private (Admin/Committee/Teacher)
export const recordGrade = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { studentId, courseId, assessmentName, marksObtained, totalMarks, remarks } = req.body;

        // Compute letter grade
        const percentage = (marksObtained / totalMarks) * 100;
        let letterGrade = 'F';
        if (percentage >= 90) letterGrade = 'A';
        else if (percentage >= 80) letterGrade = 'B';
        else if (percentage >= 70) letterGrade = 'C';
        else if (percentage >= 60) letterGrade = 'D';

        const grade = await Grade.create({
            student: studentId,
            course: courseId,
            assessmentName,
            marksObtained,
            totalMarks,
            grade: letterGrade,
            remarks,
            recordedBy: req.user.id
        });

        res.status(201).json({
            success: true,
            data: grade
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all grades for a student
// @route   GET /api/grades/student/:id
// @access  Private
export const getStudentGrades = async (req, res, next) => {
    try {
        const studentId = req.params.id;
        const { courseId } = req.query;

        let filter = { student: studentId };
        if (courseId) filter.course = courseId;

        const grades = await Grade.find(filter)
            .populate('course', 'name')
            .populate('recordedBy', 'fullName')
            .sort({ createdAt: -1 })
            .lean();

        // Compute Summary
        const totalAssessments = grades.length;

        let overallPercentage = null;
        if (totalAssessments > 0) {
            let cumulativeMarks = grades.reduce((acc, curr) => acc + curr.marksObtained, 0);
            let cumulativeTotal = grades.reduce((acc, curr) => acc + curr.totalMarks, 0);
            overallPercentage = Math.round((cumulativeMarks / cumulativeTotal) * 100);
        }

        res.status(200).json({
            success: true,
            summary: {
                totalAssessments,
                overallPercentage
            },
            count: grades.length,
            data: grades
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a grade
// @route   PUT /api/grades/:id
// @access  Private (Admin/Committee/Teacher)
export const updateGrade = async (req, res, next) => {
    try {
        let grade = await Grade.findById(req.params.id);

        if (!grade) {
            return res.status(404).json({ success: false, message: 'Grade record not found' });
        }

        // Role check: Teacher can only update their own grades, admin can update any
        if ((req.user.role === 'teacher' || req.user.role === 'committee') && grade.recordedBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Forbidden — you can only update grades you recorded' });
        }

        // Recompute letter grade if marks changed
        const { assessmentName, marksObtained: newMarks, totalMarks: newTotal, remarks } = req.body;

        let updateFields = {
            ...(assessmentName && { assessmentName }),
            ...(remarks !== undefined && { remarks })
        };

        if (newMarks !== undefined || newTotal !== undefined) {
            const marksObtained = newMarks !== undefined ? newMarks : grade.marksObtained;
            const totalMarks = newTotal !== undefined ? newTotal : grade.totalMarks;

            const percentage = (marksObtained / totalMarks) * 100;
            let letterGrade = 'F';
            if (percentage >= 90) letterGrade = 'A';
            else if (percentage >= 80) letterGrade = 'B';
            else if (percentage >= 70) letterGrade = 'C';
            else if (percentage >= 60) letterGrade = 'D';

            updateFields.marksObtained = marksObtained;
            updateFields.totalMarks = totalMarks;
            updateFields.grade = letterGrade;
        }

        grade = await Grade.findByIdAndUpdate(req.params.id, updateFields, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: grade
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a grade
// @route   DELETE /api/grades/:id
// @access  Private (Admin/Committee/Teacher)
export const deleteGrade = async (req, res, next) => {
    try {
        const grade = await Grade.findById(req.params.id);

        if (!grade) {
            return res.status(404).json({ success: false, message: 'Grade record not found' });
        }

        // Role check: Teacher can only update their own grades, admin can delete any
        if (req.user.role === 'teacher' && grade.recordedBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Forbidden — you can only delete grades you recorded' });
        }

        await grade.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Grade record deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

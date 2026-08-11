import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: [true, 'Student reference is required'],
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: [true, 'Course reference is required'],
        },
        assessmentName: {
            type: String,
            required: [true, 'Assessment name is required'],
            trim: true,
            maxlength: [100, 'Assessment name cannot exceed 100 characters'],
        },
        marksObtained: {
            type: Number,
            required: [true, 'Marks obtained is required'],
            min: [0, 'Marks cannot be negative'],
        },
        totalMarks: {
            type: Number,
            required: [true, 'Total marks is required'],
            min: [1, 'Total marks must be greater than 0'],
        },
        grade: {
            type: String,
            trim: true, // Auto-computed later e.g. A, B, C
        },
        remarks: {
            type: String,
            trim: true,
            maxlength: [500, 'Remarks cannot exceed 500 characters'],
        },
        recordedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'recordedBy (User reference) is required'],
        },
    },
    { timestamps: true }
);

export default mongoose.model('Grade', gradeSchema);

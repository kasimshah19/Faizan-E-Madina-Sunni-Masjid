import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
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
        date: {
            type: Date,
            required: [true, 'Attendance date is required'],
        },
        status: {
            type: String,
            enum: {
                values: ['present', 'absent', 'late', 'excused'],
                message: '{VALUE} is not a valid attendance status',
            },
            required: [true, 'Attendance status is required'],
        },
        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Could be an internal Teacher user or Admin user
            required: [true, 'markedBy (User reference) is required'],
        },
    },
    { timestamps: true }
);

// Prevent duplicate attendance records for the same student, course, and date
attendanceSchema.index({ student: 1, course: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);

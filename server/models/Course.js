import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
      minlength: [2, 'Course name must be at least 2 characters'],
      maxlength: [200, 'Course name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    schedule: {
      type: String, // e.g. "Mon/Wed/Fri 5-6 PM"
      trim: true,
      maxlength: [200, 'Schedule cannot exceed 200 characters'],
    },
    duration: {
      type: String,
      trim: true,
      maxlength: [100, 'Duration cannot exceed 100 characters'],
    },
    maxStudents: {
      type: Number,
      min: [1, 'Max students must be at least 1'],
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);

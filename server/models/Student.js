import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // Optional — student may not have a login
    },
    fullName: {
      type: String,
      required: [true, 'Student full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    age: {
      type: Number,
      min: [3, 'Age must be at least 3'],
      max: [100, 'Age cannot exceed 100'],
    },
    guardianName: {
      type: String,
      trim: true,
      maxlength: [100, 'Guardian name cannot exceed 100 characters'],
    },
    guardianContact: {
      type: String,
      trim: true,
      maxlength: [20, 'Guardian contact cannot exceed 20 characters'],
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    status: {
      type: String,
      enum: {
        values: ['active', 'graduated', 'dropped'],
        message: '{VALUE} is not a valid student status',
      },
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);

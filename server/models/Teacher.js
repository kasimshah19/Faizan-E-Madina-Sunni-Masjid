import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // Optional — teacher may not have a login
    },
    fullName: {
      type: String,
      required: [true, 'Teacher full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    qualification: {
      type: String,
      trim: true,
      maxlength: [200, 'Qualification cannot exceed 200 characters'],
    },
    specialization: {
      type: String,
      trim: true,
      maxlength: [200, 'Specialization cannot exceed 200 characters'],
    },
    contact: {
      type: String,
      trim: true,
      maxlength: [20, 'Contact cannot exceed 20 characters'],
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    assignedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    status: {
      type: String,
      enum: {
        values: ['active', 'inactive'],
        message: '{VALUE} is not a valid teacher status',
      },
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Teacher', teacherSchema);

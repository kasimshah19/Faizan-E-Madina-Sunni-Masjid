import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'approved', 'rejected'],
        message: '{VALUE} is not a valid volunteer status',
      },
      default: 'pending',
    },
    skills: {
      type: [String],
      default: [],
    },
    availability: {
      type: String,
      trim: true,
      maxlength: [200, 'Availability description cannot exceed 200 characters'],
    },
    totalHoursServed: {
      type: Number,
      default: 0,
      min: [0, 'Total hours served cannot be negative'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Volunteer', volunteerSchema);

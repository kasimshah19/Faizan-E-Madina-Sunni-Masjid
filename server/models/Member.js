import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
    },
    address: {
      type: String,
      trim: true,
      maxlength: [300, 'Address cannot exceed 300 characters'],
    },
    city: {
      type: String,
      trim: true,
      maxlength: [100, 'City name cannot exceed 100 characters'],
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    membershipStatus: {
      type: String,
      enum: {
        values: ['active', 'inactive'],
        message: '{VALUE} is not a valid membership status',
      },
      default: 'active',
    },
    emergencyContact: {
      type: String,
      trim: true,
      maxlength: [20, 'Emergency contact cannot exceed 20 characters'],
    },
    donationTotal: {
      type: Number,
      default: 0,
      min: [0, 'Donation total cannot be negative'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Member', memberSchema);

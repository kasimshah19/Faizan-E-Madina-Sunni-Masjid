import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event reference is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    attendanceStatus: {
      type: String,
      enum: {
        values: ['registered', 'attended', 'no_show'],
        message: '{VALUE} is not a valid attendance status',
      },
      default: 'registered',
    },
    qrCode: {
      type: String, // For future QR attendance feature
    },
  },
  { timestamps: true }
);

// Compound unique index — prevents duplicate registration
eventRegistrationSchema.index({ event: 1, user: 1 }, { unique: true });

export default mongoose.model('EventRegistration', eventRegistrationSchema);

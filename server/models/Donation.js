import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // Optional — null for anonymous / guest donations
    },
    donorName: {
      type: String,
      trim: true,
      maxlength: [100, 'Donor name cannot exceed 100 characters'],
    },
    donorEmail: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [1, 'Donation amount must be at least 1'],
    },
    category: {
      type: String,
      enum: {
        values: ['general', 'ramadan', 'construction', 'water', 'electricity', 'madrasa'],
        message: '{VALUE} is not a valid donation category',
      },
      default: 'general',
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ['cash', 'online', 'bank_transfer'],
        message: '{VALUE} is not a valid payment method',
      },
      default: 'cash',
    },
    transactionId: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'completed', 'failed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'completed',
    },
    receiptUrl: {
      type: String, // PDF path / URL
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Donor message cannot exceed 500 characters'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Donation', donationSchema);

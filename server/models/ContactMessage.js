import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      minlength: [3, 'Subject must be at least 3 characters'],
      maxlength: [200, 'Subject cannot exceed 200 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [3000, 'Message cannot exceed 3000 characters'],
    },
    category: {
      type: String,
      enum: ['General Inquiry', 'Donation', 'Madrasa', 'Events', 'Volunteer', 'Marriage / Nikah', 'Janazah', 'Suggestion', 'Complaint', 'Other'],
      default: 'General Inquiry',
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'in_progress', 'replied', 'resolved', 'archived'],
      default: 'unread',
    },
    priority: {
      type: String,
      enum: ['low', 'normal', 'high', 'urgent'],
      default: 'normal',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    repliedAt: {
      type: Date,
    },
    replyMessage: {
      type: String,
      trim: true,
      maxlength: [3000, 'Reply message cannot exceed 3000 characters'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('ContactMessage', contactMessageSchema);

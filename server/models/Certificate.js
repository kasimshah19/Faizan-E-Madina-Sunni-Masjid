import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // If applicable for madrasa students
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // If applicable for course completion
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // If applicable for event participation
  },
  certificateType: {
    type: String,
    required: true,
    enum: [
      'Madrasa Course Completion',
      'Quran Course Completion',
      'Tajweed Course Completion',
      'Hifz Program Completion',
      'Arabic Learning Completion',
      'Quran Competition Participation',
      'Quran Competition Achievement',
      'Islamic Education Program',
      'Event Participation',
      'Volunteer Appreciation'
    ],
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  grade: {
    type: String,
    trim: true, // e.g. "A+", "Excellent"
  },
  achievement: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'issued', 'revoked'],
    default: 'pending',
    index: true,
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  completionDate: {
    type: Date,
    required: true,
  },
  issuedDate: {
    type: Date,
  },
  pdfUrl: {
    type: String,
  },
  pdfPublicId: {
    type: String, // from Cloudinary if used
  },
  certificateUrl: {
    type: String, // ONE canonical URL
  },
  qrCodeData: {
    type: String, // base64 representation if stored locally
  },
}, { timestamps: true });

// Prevent duplicate certificates for the same exact course/event for the same user
// (Only enforce unique if the combination exists so we don't accidentally enforce uniqueness on empty fields)
certificateSchema.index({ recipient: 1, course: 1, certificateType: 1 }, { unique: true, partialFilterExpression: { course: { $exists: true } } });
certificateSchema.index({ recipient: 1, event: 1, certificateType: 1 }, { unique: true, partialFilterExpression: { event: { $exists: true } } });

export default mongoose.model('Certificate', certificateSchema);

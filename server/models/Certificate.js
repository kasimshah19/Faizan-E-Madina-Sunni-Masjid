import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
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
    issuedDate: {
      type: Date,
      default: Date.now,
    },
    certificateUrl: {
      type: String, // PDF path / URL
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    certificateNumber: {
      type: String,
      unique: true,
      // Auto-generated format: FEM-CERT-YYYY-NNNN
    },
  },
  { timestamps: true }
);

// Auto-generate certificateNumber before saving
certificateSchema.pre('save', async function () {
  if (!this.certificateNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Certificate').countDocuments();
    const seq = String(count + 1).padStart(4, '0');
    this.certificateNumber = `FEM-CERT-${year}-${seq}`;
  }
});

export default mongoose.model('Certificate', certificateSchema);

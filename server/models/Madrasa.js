import mongoose from 'mongoose';

const madrasaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Madrasa name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    establishedYear: {
      type: Number,
      min: [1900, 'Established year must be 1900 or later'],
    },
    contactPerson: {
      type: String,
      trim: true,
      maxlength: [100, 'Contact person name cannot exceed 100 characters'],
    },
    totalStudents: {
      type: Number,
      default: 0,
      min: [0, 'Total students cannot be negative'],
    },
    totalTeachers: {
      type: Number,
      default: 0,
      min: [0, 'Total teachers cannot be negative'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Madrasa', madrasaSchema);

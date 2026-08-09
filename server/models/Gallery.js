import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Gallery item title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    mediaType: {
      type: String,
      enum: {
        values: ['image', 'video'],
        message: '{VALUE} is not a valid media type',
      },
      required: [true, 'Media type is required'],
    },
    mediaUrl: {
      type: String,
      required: [true, 'Media URL is required'], // Cloudinary URL
    },
    thumbnailUrl: {
      type: String,
    },
    album: {
      type: String,
      trim: true,
      maxlength: [100, 'Album name cannot exceed 100 characters'],
    },
    category: {
      type: String,
      enum: {
        values: ['events', 'mosque', 'madrasa', 'community', 'other'],
        message: '{VALUE} is not a valid gallery category',
      },
      default: 'other',
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);

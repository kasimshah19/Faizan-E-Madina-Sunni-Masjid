import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      trim: true,
      default: 'Faizan E Madina Sunni Masjid',
      maxlength: [200, 'Site name cannot exceed 200 characters'],
    },
    siteTagline: {
      type: String,
      trim: true,
      maxlength: [300, 'Site tagline cannot exceed 300 characters'],
    },
    logoUrl: {
      type: String,
    },
    contactEmail: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
    },
    contactPhone: {
      type: String,
      trim: true,
      maxlength: [20, 'Contact phone cannot exceed 20 characters'],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [500, 'Address cannot exceed 500 characters'],
    },
    socialLinks: {
      facebook: { type: String, trim: true },
      twitter: { type: String, trim: true },
      instagram: { type: String, trim: true },
      youtube: { type: String, trim: true },
    },
    donationGoals: {
      type: Map,
      of: Number,
      // e.g. { general: 50000, ramadan: 100000, construction: 500000 }
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);

import mongoose from 'mongoose';

const prayerTimingSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, 'Date is required'],
      unique: true,
    },
    fajr: {
      type: String,
      trim: true,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Fajr must be in HH:MM format'],
    },
    sunrise: {
      type: String,
      trim: true,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Sunrise must be in HH:MM format'],
    },
    zuhr: {
      type: String,
      trim: true,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Zuhr must be in HH:MM format'],
    },
    asr: {
      type: String,
      trim: true,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Asr must be in HH:MM format'],
    },
    maghrib: {
      type: String,
      trim: true,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Maghrib must be in HH:MM format'],
    },
    isha: {
      type: String,
      trim: true,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Isha must be in HH:MM format'],
    },
    jummah: {
      type: String,
      trim: true,
    },
    hijriDate: {
      type: String,
      trim: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('PrayerTiming', prayerTimingSchema);

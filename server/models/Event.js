import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      minlength: [3, 'Event title must be at least 3 characters'],
      maxlength: [200, 'Event title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    category: {
      type: String,
      enum: {
        values: [
          'islamic_lecture',
          'ramadan',
          'eid_prayer',
          'youth_program',
          'quran_competition',
          'charity',
        ],
        message: '{VALUE} is not a valid event category',
      },
      required: [true, 'Event category is required'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    startTime: {
      type: String,
      trim: true,
    },
    endTime: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      maxlength: [300, 'Location cannot exceed 300 characters'],
    },
    bannerImage: {
      type: String, // Cloudinary URL
    },
    maxAttendees: {
      type: Number,
      min: [1, 'Max attendees must be at least 1'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: {
        values: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        message: '{VALUE} is not a valid event status',
      },
      default: 'upcoming',
    },
    isRegistrationRequired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);

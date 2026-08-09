import mongoose from 'mongoose';

const committeeMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
      maxlength: [100, 'Designation cannot exceed 100 characters'],
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // must be admin
    },
    permissions: {
      type: [String],
      default: [],
      // e.g. ['events', 'gallery', 'announcements', 'volunteers', 'madrasa']
    },
  },
  { timestamps: true }
);

export default mongoose.model('CommitteeMember', committeeMemberSchema);

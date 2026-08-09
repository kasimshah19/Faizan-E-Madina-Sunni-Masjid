import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    action: {
      type: String,
      required: [true, 'Action is required'],
      trim: true,
      maxlength: [100, 'Action cannot exceed 100 characters'],
      // e.g. "DELETE_USER", "UPDATE_DONATION"
    },
    module: {
      type: String,
      required: [true, 'Module is required'],
      trim: true,
      maxlength: [100, 'Module cannot exceed 100 characters'],
      // e.g. "Donations", "Events"
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      // Optional — the record affected
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      // Snapshot of what changed
    },
    ipAddress: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('AuditLog', auditLogSchema);

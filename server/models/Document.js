import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Document title is required'],
            trim: true,
            minlength: [2, 'Title must be at least 2 characters'],
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        category: {
            type: String,
            enum: {
                values: ['annual_report', 'notice', 'circular', 'policy', 'other'],
                message: '{VALUE} is not a valid document category',
            },
            required: [true, 'Document category is required'],
        },
        fileUrl: {
            type: String,
            required: [true, 'File URL is required'], // Cloudinary URL
        },
        cloudinaryPublicId: {
            type: String,
            required: [true, 'Cloudinary Public ID is required'],
        },
        fileSize: {
            type: Number, // In bytes
        },
        fileName: {
            type: String,
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
        publishDate: {
            type: Date,
            default: Date.now,
        },
        downloadCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Document', documentSchema);

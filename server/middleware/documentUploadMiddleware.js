import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// ──────────────────────────────────────────────
// CLOUDINARY UPLOAD (Documents / PDF module)
// ──────────────────────────────────────────────
const documentCloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'faizan-e-madina/documents',
        allowed_formats: ['pdf'], // Strictly PDF only
        // Cloudinary requires resource_type 'raw' for non-image/non-video files (like PDFs)
        resource_type: 'raw',
    },
});

const documentFileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF files are allowed for documents.'), false);
    }
};

// 15MB limit
export const documentUpload = multer({
    storage: documentCloudinaryStorage,
    limits: { fileSize: 15 * 1024 * 1024 },
    fileFilter: documentFileFilter,
});

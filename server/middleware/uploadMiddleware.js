import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// ──────────────────────────────────────────────
// 1. LOCAL DISK UPLOAD (existing — used by other modules)
// ──────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    // Secure local filename generation
    const ext = path.extname(file.originalname);
    const randName = crypto.randomBytes(8).toString('hex');
    cb(null, `${Date.now()}-${randName}${ext}`);
  },
});

// Strict MIME type checking
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed.'), false);
  }
};

// 5MB limit
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter
});

// ──────────────────────────────────────────────
// 2. CLOUDINARY UPLOAD (Gallery module)
// ──────────────────────────────────────────────
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'faizan-e-madina/gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov'],
    // Let Cloudinary detect the resource_type (image vs video) automatically
    resource_type: 'auto',
  },
});

const galleryFileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg', 'image/png', 'image/webp',
    'video/mp4', 'video/quicktime',
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, WEBP, MP4, and MOV files are allowed.'), false);
  }
};

// 50MB limit (accommodates video uploads)
export const galleryUpload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: galleryFileFilter,
});


import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Multer config for local uploads
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

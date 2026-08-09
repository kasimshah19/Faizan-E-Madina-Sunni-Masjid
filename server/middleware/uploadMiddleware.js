import multer from 'multer';

// Multer config — placeholder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, ${Date.now()}-),
});

export const upload = multer({ storage });

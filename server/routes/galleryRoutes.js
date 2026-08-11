import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { galleryUpload } from '../middleware/uploadMiddleware.js';
import {
    uploadGalleryItem,
    getAllGalleryItems,
    getAlbums,
    getGalleryItemById,
    updateGalleryItem,
    deleteGalleryItem,
} from '../controllers/galleryController.js';
import {
    uploadGalleryRules,
    updateGalleryRules,
    validateGallery,
} from '../validators/galleryValidator.js';

const router = Router();

// POST /api/gallery — Upload a new gallery item (admin/committee)
// Note: galleryUpload.single('media') must come BEFORE validators
//       because multipart/form-data body is only parsed after multer runs.
router.post(
    '/',
    protect,
    authorize('admin', 'committee'),
    galleryUpload.single('media'),
    uploadGalleryRules,
    validateGallery,
    uploadGalleryItem
);

// GET /api/gallery — List all gallery items (public, paginated, filterable)
router.get('/', getAllGalleryItems);

// GET /api/gallery/albums — Get distinct album names with counts (public)
// ⚠️  Must be BEFORE /:id to avoid treating "albums" as an ObjectId
router.get('/albums', getAlbums);

// GET /api/gallery/:id — Get single gallery item (public)
router.get('/:id', getGalleryItemById);

// PUT /api/gallery/:id — Update metadata (admin/committee, ownership check)
router.put(
    '/:id',
    protect,
    authorize('admin', 'committee'),
    updateGalleryRules,
    validateGallery,
    updateGalleryItem
);

// DELETE /api/gallery/:id — Delete item + Cloudinary asset (admin/committee, ownership check)
router.delete(
    '/:id',
    protect,
    authorize('admin', 'committee'),
    deleteGalleryItem
);

export default router;

import Gallery from '../models/Gallery.js';
import cloudinary from '../config/cloudinary.js';

/**
 * @route   POST /api/gallery
 * @desc    Upload a new gallery item (admin/committee only)
 */
export const uploadGalleryItem = async (req, res, next) => {
    try {
        // Multer-cloudinary processes the file and attaches it to req.file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No media file uploaded. Please attach a file under the "media" field.',
            });
        }

        const { title, description, album, category, tags } = req.body;

        // Derive mediaType from the file's mimetype (image/* → image, video/* → video)
        const mediaType = req.file.mimetype.startsWith('video') ? 'video' : 'image';

        // multer-storage-cloudinary puts the Cloudinary URL on req.file.path
        const mediaUrl = req.file.path;

        // Extract the Cloudinary public_id for later deletion
        // multer-storage-cloudinary stores it as req.file.filename
        const cloudinaryPublicId = req.file.filename;

        // For videos, generate a thumbnail URL using Cloudinary's convention:
        // Replace the file extension with .jpg to get an auto-generated video poster frame
        let thumbnailUrl = null;
        if (mediaType === 'video') {
            // Cloudinary video thumbnail: replace video extension with .jpg
            // This grabs the first frame of the video as a JPEG thumbnail
            thumbnailUrl = mediaUrl.replace(/\.(mp4|mov)$/i, '.jpg');
        }

        // Parse tags: comma-separated string → array
        const parsedTags = tags
            ? tags.split(',').map((t) => t.trim()).filter(Boolean)
            : [];

        const galleryItem = await Gallery.create({
            title,
            description,
            mediaType,
            mediaUrl,
            thumbnailUrl,
            album,
            category,
            uploadedBy: req.user.id,
            tags: parsedTags,
            cloudinaryPublicId,
        });

        return res.status(201).json({
            success: true,
            data: galleryItem,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/gallery
 * @desc    Get all gallery items (public, paginated, filterable)
 */
export const getAllGalleryItems = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, category, album, mediaType, search } = req.query;

        const query = {};

        if (category) query.category = category;
        if (album) query.album = album;
        if (mediaType) query.mediaType = mediaType;

        // Search matches against tags array or title (case-insensitive)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } },
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const items = await Gallery.find(query)
            .populate('uploadedBy', 'fullName')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        const total = await Gallery.countDocuments(query);

        return res.status(200).json({
            success: true,
            count: items.length,
            total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            data: items,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/gallery/albums
 * @desc    Get distinct album names with item counts (public)
 */
export const getAlbums = async (req, res, next) => {
    try {
        const albums = await Gallery.aggregate([
            // Only include items that have an album name set
            { $match: { album: { $exists: true, $ne: null, $ne: '' } } },
            {
                $group: {
                    _id: '$album',
                    count: { $sum: 1 },
                    latestImage: { $first: '$mediaUrl' },
                },
            },
            { $sort: { count: -1 } },
            {
                $project: {
                    _id: 0,
                    album: '$_id',
                    count: 1,
                    latestImage: 1,
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            count: albums.length,
            data: albums,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/gallery/:id
 * @desc    Get a single gallery item by ID (public)
 */
export const getGalleryItemById = async (req, res, next) => {
    try {
        const item = await Gallery.findById(req.params.id)
            .populate('uploadedBy', 'fullName');

        if (!item) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/gallery/:id
 * @desc    Update gallery item metadata (admin/committee — ownership check)
 *          Does NOT replace the actual uploaded file/media.
 */
export const updateGalleryItem = async (req, res, next) => {
    try {
        const item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        // Ownership check: committee can only update their own uploads, admin can update any
        if (
            req.user.role === 'committee' &&
            String(item.uploadedBy) !== String(req.user.id)
        ) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden — you can only update your own uploads',
            });
        }

        // Only allow updating metadata fields
        const { title, description, album, category, tags } = req.body;

        if (title !== undefined) item.title = title;
        if (description !== undefined) item.description = description;
        if (album !== undefined) item.album = album;
        if (category !== undefined) item.category = category;
        if (tags !== undefined) {
            item.tags = typeof tags === 'string'
                ? tags.split(',').map((t) => t.trim()).filter(Boolean)
                : tags;
        }

        await item.save();

        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/gallery/:id
 * @desc    Delete gallery item + Cloudinary asset (admin/committee — ownership check)
 */
export const deleteGalleryItem = async (req, res, next) => {
    try {
        const item = await Gallery.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        // Ownership check: committee can only delete their own uploads, admin can delete any
        if (
            req.user.role === 'committee' &&
            String(item.uploadedBy) !== String(req.user.id)
        ) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden — you can only delete your own uploads',
            });
        }

        // Delete asset from Cloudinary (don't block DB deletion if this fails)
        if (item.cloudinaryPublicId) {
            try {
                const resourceType = item.mediaType === 'video' ? 'video' : 'image';
                await cloudinary.uploader.destroy(item.cloudinaryPublicId, {
                    resource_type: resourceType,
                });
            } catch (cloudError) {
                console.warn(
                    `⚠️  Cloudinary deletion failed for publicId "${item.cloudinaryPublicId}":`,
                    cloudError.message
                );
                // Continue to delete MongoDB document regardless
            }
        }

        await Gallery.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Gallery item deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

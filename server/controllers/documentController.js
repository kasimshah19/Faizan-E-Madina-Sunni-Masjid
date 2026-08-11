import Document from '../models/Document.js';
import cloudinary from '../config/cloudinary.js';

/**
 * @route   POST /api/documents
 * @desc    Upload a new document (admin/committee only)
 */
export const uploadDocument = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No document file uploaded. Please attach a PDF under the "document" field.',
            });
        }

        const { title, description, category, isPublic } = req.body;

        const fileUrl = req.file.path;
        const cloudinaryPublicId = req.file.filename;
        const fileSize = req.file.size;
        const fileName = req.file.originalname;

        const doc = await Document.create({
            title,
            description,
            category,
            fileUrl,
            cloudinaryPublicId,
            fileSize,
            fileName,
            uploadedBy: req.user.id,
            isPublic: isPublic !== undefined ? isPublic === 'true' || isPublic === true : true,
        });

        return res.status(201).json({
            success: true,
            data: doc,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/documents
 * @desc    Get all active/public documents (public, paginated)
 */
export const getAllDocuments = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, category, search } = req.query;

        // ONLY public documents
        const query = { isPublic: true };

        if (category) query.category = category;

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const docs = await Document.find(query)
            .sort({ publishDate: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        const total = await Document.countDocuments(query);

        return res.status(200).json({
            success: true,
            count: docs.length,
            total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            data: docs,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/documents/admin/all
 * @desc    Get ALL documents including private (admin/committee only)
 */
export const getAllDocumentsAdmin = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, category, search } = req.query;

        const query = {};

        if (category) query.category = category;

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const docs = await Document.find(query)
            .populate('uploadedBy', 'fullName')
            .sort({ publishDate: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        const total = await Document.countDocuments(query);

        return res.status(200).json({
            success: true,
            count: docs.length,
            total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            data: docs,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/documents/:id
 * @desc    Get a single document by ID (respects isPublic)
 */
export const getDocumentById = async (req, res, next) => {
    try {
        const doc = await Document.findById(req.params.id)
            .populate('uploadedBy', 'fullName');

        if (!doc) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        // Visibility Check
        if (!doc.isPublic) {
            // If not public, requester MUST be authenticated and Admin/Committee
            const isStaff = req.user && ['admin', 'committee'].includes(req.user.role);

            // If neither, return 404 to avoid revealing its existence
            if (!isStaff) {
                return res.status(404).json({ success: false, message: 'Document not found' });
            }
        }

        return res.status(200).json({ success: true, data: doc });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /api/documents/:id/download
 * @desc    Increment download count and redirect to Cloudinary fileURL
 */
export const downloadDocument = async (req, res, next) => {
    try {
        const doc = await Document.findById(req.params.id);

        if (!doc) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        // Visibility Check
        if (!doc.isPublic) {
            const isStaff = req.user && ['admin', 'committee'].includes(req.user.role);
            if (!isStaff) {
                return res.status(404).json({ success: false, message: 'Document not found' });
            }
        }

        // Increment download count
        doc.downloadCount += 1;
        await doc.save();

        // 302 Redirect to the actual file URL for download/viewing
        // We use redirect because the purpose of this endpoint is to deliver the file
        // while tracking the interaction on the backend.
        return res.redirect(302, doc.fileUrl);

    } catch (error) {
        next(error);
    }
};

/**
 * @route   PUT /api/documents/:id
 * @desc    Update document metadata (admin/committee — ownership check)
 */
export const updateDocument = async (req, res, next) => {
    try {
        const doc = await Document.findById(req.params.id);

        if (!doc) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        if (
            req.user.role === 'committee' &&
            String(doc.uploadedBy) !== String(req.user.id)
        ) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden — you can only update your own uploads',
            });
        }

        const { title, description, category, isPublic } = req.body;

        if (title !== undefined) doc.title = title;
        if (description !== undefined) doc.description = description;
        if (category !== undefined) doc.category = category;
        if (isPublic !== undefined) doc.isPublic = isPublic;

        await doc.save();

        return res.status(200).json({ success: true, data: doc });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /api/documents/:id
 * @desc    Delete document + Cloudinary asset (admin/committee — ownership check)
 */
export const deleteDocument = async (req, res, next) => {
    try {
        const doc = await Document.findById(req.params.id);

        if (!doc) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }

        if (
            req.user.role === 'committee' &&
            String(doc.uploadedBy) !== String(req.user.id)
        ) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden — you can only delete your own uploads',
            });
        }

        // Delete asset from Cloudinary
        // IMPORTANT: resource_type must be 'raw' for PDFs
        if (doc.cloudinaryPublicId) {
            try {
                await cloudinary.uploader.destroy(doc.cloudinaryPublicId, {
                    resource_type: 'raw',
                });
            } catch (cloudError) {
                console.warn(
                    `⚠️  Cloudinary deletion failed for publicId "${doc.cloudinaryPublicId}":`,
                    cloudError.message
                );
            }
        }

        await Document.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Document deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

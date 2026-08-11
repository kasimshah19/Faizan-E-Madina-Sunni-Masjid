import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { documentUpload } from '../middleware/documentUploadMiddleware.js';
import {
    uploadDocument,
    getAllDocuments,
    getAllDocumentsAdmin,
    getDocumentById,
    downloadDocument,
    updateDocument,
    deleteDocument,
} from '../controllers/documentController.js';
import {
    uploadDocumentRules,
    updateDocumentRules,
    validateDocument,
} from '../validators/documentValidator.js';

const router = Router();

// POST /api/documents — Upload a new document (admin/committee)
router.post(
    '/',
    protect,
    authorize('admin', 'committee'),
    documentUpload.single('document'), // Extract PDF
    uploadDocumentRules,
    validateDocument, // Validate schema
    uploadDocument
);

// GET /api/documents — List all public documents
router.get('/', getAllDocuments);

// GET /api/documents/admin/all — List ALL documents including private (admin/committee)
// ⚠️ Must be before /:id
router.get(
    '/admin/all',
    protect,
    authorize('admin', 'committee'),
    getAllDocumentsAdmin
);

// GET /api/documents/:id/download — Download counter + redirect to file
// Optional: we decode token here minimally but protect is NOT mandatory globally 
// since downloadDocument handles its own visibility checks.
// But to supply `req.user` if they are logged in so they can bypass 404 on private files,
// we could do a gentle token parse or rely on the frontend sending tokens.
// For now, if it's protected, we require the token. Let's use a soft protect if needed, 
// or simply run the standard protect if the UI accesses it as an admin.
// Actually, standard `protect` strictly rejects unauthenticated users, which prevents public downloads.
// To satisfy the requirement: "downloadDocument: Public (respects isPublic)".
// We need custom logic. Express middleware runs sequentially.
// Let's implement an optional auth parser inline or modify the endpoint.
// For simplicity, we'll try to extract user if header exists, otherwise let it pass as guest.
import { verifyAccessToken } from '../services/tokenService.js';
import User from '../models/User.js';

const optionalAuth = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = verifyAccessToken(token);
            const user = await User.findById(decoded.id);
            if (user && user.isActive) {
                req.user = { id: user._id, role: user.role };
            }
        } catch (e) {
            // Ignore token errors for optional auth
        }
    }
    next();
};

router.get('/:id/download', optionalAuth, downloadDocument);

// GET /api/documents/:id — Get single document
// Uses optionalAuth so the controller knows if it's an admin requesting a private doc
router.get('/:id', optionalAuth, getDocumentById);

// PUT /api/documents/:id — Update metadata (admin/committee, ownership check)
router.put(
    '/:id',
    protect,
    authorize('admin', 'committee'),
    updateDocumentRules,
    validateDocument,
    updateDocument
);

// DELETE /api/documents/:id — Delete document + Cloudinary asset 
router.delete(
    '/:id',
    protect,
    authorize('admin', 'committee'),
    deleteDocument
);

export default router;

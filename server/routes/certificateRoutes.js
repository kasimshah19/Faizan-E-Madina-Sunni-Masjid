import { Router } from 'express';
import {
    createCertificate,
    getCertificates,
    getMyCertificates,
    getCertificateById,
    verifyCertificate,
    approveCertificate,
    issueCertificate,
    revokeCertificate,
    downloadCertificate
} from '../controllers/certificateController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { validateCreateRequest, validateCertIdParam, validateCertNumberParam } from '../validators/certificateValidator.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = Router();

// Public Routes
router.get('/public/:certificateNumber', validateCertNumberParam, validate, verifyCertificate);

// Protected Member Routes
router.get('/my', protect, getMyCertificates);
router.get('/:id/download', protect, validateCertIdParam, validate, downloadCertificate);
router.get('/:id', protect, validateCertIdParam, validate, getCertificateById);

// Admin / Committee Routes
router.post('/', protect, authorize('admin', 'committee'), validateCreateRequest, validate, createCertificate);
router.get('/', protect, authorize('admin', 'committee'), getCertificates);

// State transitions (Admin only)
router.patch('/:id/approve', protect, authorize('admin'), validateCertIdParam, validate, approveCertificate);
router.patch('/:id/issue', protect, authorize('admin'), validateCertIdParam, validate, issueCertificate);
router.patch('/:id/revoke', protect, authorize('admin', 'committee'), validateCertIdParam, validate, revokeCertificate);

export default router;

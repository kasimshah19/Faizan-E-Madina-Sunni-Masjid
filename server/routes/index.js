import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import memberRoutes from './memberRoutes.js';
import volunteerRoutes from './volunteerRoutes.js';
import committeeRoutes from './committeeRoutes.js';
import donationRoutes from './donationRoutes.js';
import eventRoutes from './eventRoutes.js';
import prayerRoutes from './prayerRoutes.js';
import galleryRoutes from './galleryRoutes.js';
import announcementRoutes from './announcementRoutes.js';
import contactRoutes from './contactRoutes.js';
import madrasaRoutes from './madrasaRoutes.js';
import certificateRoutes from './certificateRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import auditLogRoutes from './auditLogRoutes.js';
import settingsRoutes from './settingsRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/member', memberRoutes);
router.use('/volunteer', volunteerRoutes);
router.use('/committee', committeeRoutes);
router.use('/donation', donationRoutes);
router.use('/event', eventRoutes);
router.use('/prayer', prayerRoutes);
router.use('/gallery', galleryRoutes);
router.use('/announcement', announcementRoutes);
router.use('/contact', contactRoutes);
router.use('/madrasa', madrasaRoutes);
router.use('/certificate', certificateRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/auditLog', auditLogRoutes);
router.use('/settings', settingsRoutes);

export default router;


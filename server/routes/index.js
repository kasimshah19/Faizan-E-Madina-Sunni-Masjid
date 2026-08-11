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

import studentRoutes from './studentRoutes.js';
import teacherRoutes from './teacherRoutes.js';
import courseRoutes from './courseRoutes.js';
import enrollmentRoutes from './enrollmentRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';
import gradeRoutes from './gradeRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/member', memberRoutes);
router.use('/volunteer', volunteerRoutes);
router.use('/committee', committeeRoutes);
router.use('/donations', donationRoutes);
router.use('/events', eventRoutes);
router.use('/prayers', prayerRoutes);
router.use('/gallery', galleryRoutes);
router.use('/announcements', announcementRoutes);
router.use('/contact', contactRoutes);
router.use('/madrasa', madrasaRoutes);
router.use('/certificate', certificateRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/auditLog', auditLogRoutes);
router.use('/settings', settingsRoutes);

router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/grades', gradeRoutes);

export default router;


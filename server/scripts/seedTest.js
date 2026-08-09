/**
 * seedTest.js — One-time seed script to create one dummy document per model.
 * Confirms all 19 collections appear in MongoDB Atlas.
 *
 * Usage:  node scripts/seedTest.js
 * Cleanup: node scripts/seedTest.js --cleanup
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Import all 19 models
import User from '../models/User.js';
import Member from '../models/Member.js';
import Volunteer from '../models/Volunteer.js';
import CommitteeMember from '../models/CommitteeMember.js';
import Donation from '../models/Donation.js';
import Event from '../models/Event.js';
import EventRegistration from '../models/EventRegistration.js';
import PrayerTiming from '../models/PrayerTiming.js';
import Gallery from '../models/Gallery.js';
import Announcement from '../models/Announcement.js';
import ContactMessage from '../models/ContactMessage.js';
import Madrasa from '../models/Madrasa.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Course from '../models/Course.js';
import Certificate from '../models/Certificate.js';
import Notification from '../models/Notification.js';
import AuditLog from '../models/AuditLog.js';
import Settings from '../models/Settings.js';

const isCleanup = process.argv.includes('--cleanup');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected for seeding');

        if (isCleanup) {
            console.log('\n🧹 Cleaning up seed data...');
            const collections = await mongoose.connection.db.listCollections().toArray();
            for (const col of collections) {
                await mongoose.connection.db.dropCollection(col.name);
                console.log(`   Dropped: ${col.name}`);
            }
            console.log('\n✅ All collections dropped.');
            await mongoose.disconnect();
            process.exit(0);
        }

        console.log('\n📦 Creating seed documents...\n');

        // 1. User (base for all refs)
        const user = await User.create({
            fullName: 'Seed Admin',
            email: 'seed@test.com',
            password: 'hashed_placeholder_password',
            role: 'admin',
        });
        console.log('  ✅ User created');

        // 2. Member
        await Member.create({ user: user._id, city: 'Seed City' });
        console.log('  ✅ Member created');

        // 3. Volunteer
        await Volunteer.create({ user: user._id, skills: ['cleaning'] });
        console.log('  ✅ Volunteer created');

        // 4. CommitteeMember
        await CommitteeMember.create({
            user: user._id,
            designation: 'Secretary',
            permissions: ['events'],
        });
        console.log('  ✅ CommitteeMember created');

        // 5. Donation
        await Donation.create({ donor: user._id, amount: 100, category: 'general' });
        console.log('  ✅ Donation created');

        // 6. Event
        const event = await Event.create({
            title: 'Seed Event',
            category: 'islamic_lecture',
            date: new Date(),
        });
        console.log('  ✅ Event created');

        // 7. EventRegistration
        await EventRegistration.create({ event: event._id, user: user._id });
        console.log('  ✅ EventRegistration created');

        // 8. PrayerTiming
        await PrayerTiming.create({
            date: new Date(),
            fajr: '05:00',
            sunrise: '06:15',
            zuhr: '12:30',
            asr: '16:00',
            maghrib: '18:45',
            isha: '20:00',
        });
        console.log('  ✅ PrayerTiming created');

        // 9. Gallery
        await Gallery.create({
            title: 'Seed Image',
            mediaType: 'image',
            mediaUrl: 'https://example.com/seed.jpg',
        });
        console.log('  ✅ Gallery created');

        // 10. Announcement
        await Announcement.create({ title: 'Seed Announcement', content: 'Test content for seed.' });
        console.log('  ✅ Announcement created');

        // 11. ContactMessage
        await ContactMessage.create({
            name: 'Seed Visitor',
            email: 'visitor@test.com',
            subject: 'Test Subject',
            message: 'This is a test contact message for seeding.',
        });
        console.log('  ✅ ContactMessage created');

        // 12. Madrasa
        await Madrasa.create({ name: 'Faizan E Madina Madrasa Wing' });
        console.log('  ✅ Madrasa created');

        // 13. Course (create before Student/Teacher for refs)
        const course = await Course.create({ name: 'Quran Recitation' });
        console.log('  ✅ Course created');

        // 14. Student
        const student = await Student.create({
            fullName: 'Seed Student',
            age: 10,
            enrolledCourses: [course._id],
        });
        console.log('  ✅ Student created');

        // 15. Teacher
        await Teacher.create({
            fullName: 'Seed Teacher',
            specialization: 'Tajweed',
            assignedCourses: [course._id],
        });
        console.log('  ✅ Teacher created');

        // 16. Certificate
        await Certificate.create({
            student: student._id,
            course: course._id,
            issuedBy: user._id,
        });
        console.log('  ✅ Certificate created');

        // 17. Notification
        await Notification.create({
            user: user._id,
            title: 'Seed Notification',
            message: 'Welcome to Faizan E Madina!',
            type: 'system',
        });
        console.log('  ✅ Notification created');

        // 18. AuditLog
        await AuditLog.create({
            user: user._id,
            action: 'SEED_DATABASE',
            module: 'System',
            details: { note: 'Initial seed test' },
        });
        console.log('  ✅ AuditLog created');

        // 19. Settings
        await Settings.create({
            siteName: 'Faizan E Madina Sunni Masjid',
            siteTagline: 'Serving the community with faith',
        });
        console.log('  ✅ Settings created');

        // List all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`\n🎉 Done! ${collections.length} collections created:\n`);
        collections.forEach((col) => console.log(`   📁 ${col.name}`));

        await mongoose.disconnect();
        console.log('\n✅ Disconnected. Seed complete.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed Error:', error.message);
        process.exit(1);
    }
}

seed();

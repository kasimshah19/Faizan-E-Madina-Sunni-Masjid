import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Announcement from '../models/Announcement.js';
import User from '../models/User.js';

dotenv.config();

const seedAnnouncements = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding Announcements...');

        // Find test users
        let admin = await User.findOne({ role: 'admin' });
        let committee = await User.findOne({ role: 'committee' });

        if (!admin) {
            console.log('No admin found, run the main seed script first.');
            process.exit();
        }

        if (!committee) {
            // fallback to admin if committee doesn't exist
            committee = admin;
        }

        // Clear existing announcements
        await Announcement.deleteMany();
        console.log('Cleared existing Announcements.');

        const now = new Date();

        const announcements = [
            {
                title: 'Eid-ul-Fitr Prayer Timings',
                content: 'Eid ul Fitr prayers will be held at 7:30 AM and 9:00 AM. Please arrive early as parking is limited.',
                priority: 'high',
                isPinned: true,
                expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // Next week
                createdBy: admin._id,
                isActive: true
            },
            {
                title: 'Masjid Carpet Replacement',
                content: 'We are replacing the main prayer hall carpets. During this time, prayers will be held in the basement.',
                priority: 'medium',
                isPinned: true,
                createdBy: admin._id,
                isActive: true
            },
            {
                title: 'Weekly Friday Sermon Theme',
                content: 'This week’s topic will focus on the importance of patience in trials.',
                priority: 'low',
                isPinned: false,
                createdBy: committee._id,
                isActive: true
            },
            {
                title: 'Expired: Winter Coat Drive',
                content: 'Please donate winter coats. We are collecting until the end of the month.',
                priority: 'medium',
                isPinned: false,
                expiresAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                createdBy: committee._id,
                isActive: true // Active but expired, should be filtered out on the public GET route
            },
            {
                title: 'Hidden Announcement',
                content: 'This announcement is no longer active and is hidden completely.',
                priority: 'low',
                isPinned: false,
                createdBy: admin._id,
                isActive: false // Directly inactive
            },
            {
                title: 'Youth Program Starting Soon',
                content: 'Register your children for the summer youth program starting next week.',
                priority: 'high',
                isPinned: false,
                createdBy: admin._id,
                isActive: true
            }
        ];

        const insertedAnnouncements = await Announcement.insertMany(announcements);
        console.log(`${insertedAnnouncements.length} announcements seeded successfully!`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAnnouncements();

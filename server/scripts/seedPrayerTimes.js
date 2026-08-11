import 'dotenv/config';
import mongoose from 'mongoose';
import PrayerTiming from '../models/PrayerTiming.js';
import User from '../models/User.js';

const seedPrayerTimes = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully.');

        // Find the master admin to set as 'updatedBy' (fallback to null if not found)
        const admin = await User.findOne({ role: 'superadmin' });
        const adminId = admin ? admin._id : null;

        const timingsToInsert = [];

        // Create timings for today and next 6 days
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + i);
            // Normalize time to midnight
            const midnightDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

            // Increment times slightly for realism
            const ishaMin = 30 + i;

            timingsToInsert.push({
                date: midnightDate,
                fajr: '04:25',
                sunrise: '05:45',
                zuhr: '12:45',
                asr: '16:30',
                maghrib: '19:05',
                isha: `20:${ishaMin}`, // Just manipulating minutes so they differ
                jummah: '13:30',
                hijriDate: `${18 + i} Dhu'l Qadah 1445`,
                updatedBy: adminId
            });
        }

        console.log(`Clearing existing ${timingsToInsert.length} days of prayer timings to prevent duplicates...`);

        const dates = timingsToInsert.map(t => t.date);
        await PrayerTiming.deleteMany({ date: { $in: dates } });

        console.log('Inserting real-like dummy timings...');
        await PrayerTiming.insertMany(timingsToInsert);

        console.log('Seed completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error(`Error with seed: ${error.message}`);
        process.exit(1);
    }
};

seedPrayerTimes();

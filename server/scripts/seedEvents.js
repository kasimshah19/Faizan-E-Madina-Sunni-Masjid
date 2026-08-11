import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event.js';
import EventRegistration from '../models/EventRegistration.js';
import User from '../models/User.js';

dotenv.config();

const seedEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding events...');

        // Find test users or create a temporary one if needed
        let admin = await User.findOne({ role: 'admin' });
        let member = await User.findOne({ role: 'member' });

        if (!admin) {
            console.log('No admin found, run npm run seed first to create users.');
            process.exit();
        }

        if (!member) {
            console.log('No member found.');
            process.exit();
        }

        // Clear existing events
        await Event.deleteMany();
        await EventRegistration.deleteMany();
        console.log('Cleared existing Events and Registrations.');

        const today = new Date();

        const events = [
            {
                title: 'Weekly Tafseer e Quran',
                description: 'Join us for the weekly understanding of the Quran.',
                category: 'islamic_lecture',
                date: new Date(new Date().setDate(today.getDate() + 7)),
                startTime: '19:00',
                endTime: '20:30',
                location: 'Main Hall',
                maxAttendees: 50,
                isRegistrationRequired: true,
                createdBy: admin._id,
                status: 'upcoming'
            },
            {
                title: 'Ramadan Daily Iftar',
                description: 'Daily community Iftar during the blessed month.',
                category: 'ramadan',
                date: new Date(new Date().setDate(today.getDate() + 14)),
                startTime: 'Sunset',
                endTime: '20:00',
                location: 'Prayer Courtyard',
                isRegistrationRequired: false,
                createdBy: admin._id,
                status: 'upcoming'
            },
            {
                title: 'Youth Career Guidance Session',
                description: 'Career counseling for high school and university students.',
                category: 'youth_program',
                date: new Date(new Date().setDate(today.getDate() + 3)),
                startTime: '14:00',
                endTime: '16:00',
                location: 'Conference Room 1',
                maxAttendees: 20,
                isRegistrationRequired: true,
                createdBy: admin._id,
                status: 'upcoming'
            },
            {
                title: 'Past Charity Dinner',
                description: 'Annual charity dinner for mosque expansion.',
                category: 'charity',
                date: new Date(new Date().setDate(today.getDate() - 5)), // Past date
                startTime: '18:00',
                endTime: '22:00',
                location: 'Banquet Hall',
                maxAttendees: 100,
                isRegistrationRequired: true,
                createdBy: admin._id,
                status: 'completed'
            },
            {
                title: 'Quran Recitation Competition',
                description: 'Annual competition for Madrasa students.',
                category: 'quran_competition',
                date: new Date(new Date().setDate(today.getDate() + 30)),
                startTime: '09:00',
                endTime: '13:00',
                location: 'Main Hall',
                maxAttendees: 1, // small max attendees to test Event is Full limit easily
                isRegistrationRequired: true,
                createdBy: admin._id,
                status: 'upcoming'
            }
        ];

        const insertedEvents = await Event.insertMany(events);
        console.log(`${insertedEvents.length} events seeded.`);

        // Seed registrations
        // Register member to the "Weekly Tafseer"
        const tafseerEvent = insertedEvents.find(e => e.title === 'Weekly Tafseer e Quran');
        if (tafseerEvent) {
            await EventRegistration.create({
                event: tafseerEvent._id,
                user: member._id,
                attendanceStatus: 'registered'
            });
            console.log(`Member registered for ${tafseerEvent.title}`);
        }

        // Register member to "Youth Career Guidance Session"
        const youthEvent = insertedEvents.find(e => e.title === 'Youth Career Guidance Session');
        if (youthEvent) {
            await EventRegistration.create({
                event: youthEvent._id,
                user: member._id,
                attendanceStatus: 'registered'
            });
            console.log(`Member registered for ${youthEvent.title}`);
        }

        console.log('Seed events completed successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedEvents();

/**
 * seedGallery.js — Seed the Gallery collection with placeholder data.
 *
 * ⚠️  IMPORTANT: These are placeholder external URLs (Unsplash), NOT real
 *    Cloudinary uploads. They have no cloudinaryPublicId and cannot be
 *    deleted via the Cloudinary API. Real admin uploads go through the
 *    POST /api/gallery endpoint which uses Cloudinary storage.
 *
 * Usage:  node scripts/seedGallery.js   (from server/ directory)
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import Gallery from '../models/Gallery.js';

const seedGallery = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully.');

        console.log('Clearing old gallery items...');
        await Gallery.deleteMany({});

        const placeholderItems = [
            {
                title: 'Masjid Main Entrance',
                description: 'Beautiful view of the masjid main entrance during sunset.',
                mediaType: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800',
                album: 'Masjid Photos',
                category: 'mosque',
                tags: ['entrance', 'sunset', 'exterior'],
            },
            {
                title: 'Friday Prayer Congregation',
                description: 'Jummah prayer attended by hundreds of community members.',
                mediaType: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800',
                album: 'Events',
                category: 'events',
                tags: ['jummah', 'prayer', 'congregation'],
            },
            {
                title: 'Madrasa Classroom',
                description: 'Students learning Quran recitation in the madrasa.',
                mediaType: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
                album: 'Madrasa',
                category: 'madrasa',
                tags: ['students', 'quran', 'education'],
            },
            {
                title: 'Ramadan Iftar Gathering',
                description: 'Community iftar during the blessed month of Ramadan.',
                mediaType: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1567942712661-82b9b407abbf?w=800',
                album: 'Events',
                category: 'events',
                tags: ['ramadan', 'iftar', 'community'],
            },
            {
                title: 'Interior Dome Architecture',
                description: 'Intricate dome patterns inside the masjid prayer hall.',
                mediaType: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1545167496-c1e092d383a2?w=800',
                album: 'Masjid Photos',
                category: 'mosque',
                tags: ['dome', 'architecture', 'interior'],
            },
            {
                title: 'Eid Celebration',
                description: 'Joyous Eid-ul-Fitr celebrations at the masjid grounds.',
                mediaType: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800',
                album: 'Events',
                category: 'events',
                tags: ['eid', 'celebration', 'festive'],
            },
            {
                title: 'Community Food Drive',
                description: 'Volunteers distributing food packets to the community.',
                mediaType: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
                album: 'Community Service',
                category: 'community',
                tags: ['food', 'charity', 'volunteers'],
            },
            {
                title: 'Wudu Area Renovation',
                description: 'Newly renovated wudu (ablution) area of the masjid.',
                mediaType: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1585129777188-94600bc7b4b3?w=800',
                album: 'Masjid Photos',
                category: 'mosque',
                tags: ['wudu', 'renovation', 'facilities'],
            },
            {
                title: 'Quran Competition Winners',
                description: 'Annual Quran recitation competition award ceremony.',
                mediaType: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1577036421869-7c8d388d2123?w=800',
                album: 'Madrasa',
                category: 'madrasa',
                tags: ['quran', 'competition', 'awards'],
            },
            {
                title: 'Night View of Masjid',
                description: 'Masjid beautifully illuminated during the night hours.',
                mediaType: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800',
                album: 'Masjid Photos',
                category: 'mosque',
                tags: ['night', 'lights', 'exterior'],
            },
        ];

        await Gallery.insertMany(placeholderItems);
        console.log(`✅ Inserted ${placeholderItems.length} placeholder gallery items.`);

        console.log('Seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error(`Error with seed: ${error.message}`);
        process.exit(1);
    }
};

seedGallery();

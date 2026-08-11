/**
 * seedDocuments.js — Seed the Document collection with placeholder data.
 *
 * ⚠️ IMPORTANT: These are placeholder external URLs (sample PDFs), NOT real
 *    Cloudinary uploads. They have a fake cloudinaryPublicId and cannot be
 *    deleted via the Cloudinary API. Real admin uploads go through the
 *    POST /api/documents endpoint which uses Cloudinary storage properly.
 *
 * Usage:  node scripts/seedDocuments.js   (from server/ directory)
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import Document from '../models/Document.js';
import User from '../models/User.js';

const seedDocuments = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully.');

        // Look for our test admin user to attach as uploader
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            console.log('No admin found, creating a fallback dummy ObjectId');
            admin = { _id: new mongoose.Types.ObjectId() };
        }

        console.log('Clearing old document items...');
        await Document.deleteMany({});

        // Note: PDF URLs point to W3C sample PDFs which are usually highly reliable.
        const placeholderItems = [
            {
                title: '2025 Annual Financial Report',
                description: 'Detailed report of masjid income, expenses, and charity distributions for the 2025 fiscal year.',
                category: 'annual_report',
                fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                cloudinaryPublicId: 'fake-public-id-1',
                fileSize: 1048576, // 1MB
                fileName: 'annual_financial_report_2025.pdf',
                uploadedBy: admin._id,
                isPublic: true,
            },
            {
                title: 'Ramadan 2026 Timetable & Guidelines',
                description: 'Complete prayer schedule and guidelines for Taraweeh and Iftar during Ramadan.',
                category: 'circular',
                fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                cloudinaryPublicId: 'fake-public-id-2',
                fileSize: 204800, // 200KB
                fileName: 'ramadan_2026_guidelines.pdf',
                uploadedBy: admin._id,
                isPublic: true,
            },
            {
                title: 'Child Safeguarding Policy',
                description: 'Mandatory reading for all Madrasa staff and volunteers regarding child safety and protocols.',
                category: 'policy',
                fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                cloudinaryPublicId: 'fake-public-id-3',
                fileSize: 524288, // 500KB
                fileName: 'safeguarding_policy_v2.pdf',
                uploadedBy: admin._id,
                isPublic: true, // Making this public so parents can also read
            },
            {
                title: 'Eid al-Adha Parking Notice',
                description: 'Instructions and maps for overflow parking during Eid prayers.',
                category: 'notice',
                fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                cloudinaryPublicId: 'fake-public-id-4',
                fileSize: 153600, // 150KB
                fileName: 'eid_parking_map.pdf',
                uploadedBy: admin._id,
                isPublic: true,
            },
            {
                title: 'Internal Committee Financial Governance Draft',
                description: '(INTERNAL) Draft policy for handling large donor transactions and foreign transfers.',
                category: 'policy',
                fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                cloudinaryPublicId: 'fake-public-id-5',
                fileSize: 81920, // 80KB
                fileName: 'internal_governance_draft.pdf',
                uploadedBy: admin._id,
                isPublic: false, // PRIVATE - Only admins/committee should see this
            },
        ];

        await Document.insertMany(placeholderItems);
        console.log(`✅ Inserted ${placeholderItems.length} placeholder document items (including 1 private document).`);

        console.log('Seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error(`Error with seed: ${error.message}`);
        process.exit(1);
    }
};

seedDocuments();

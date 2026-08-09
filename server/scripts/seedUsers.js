import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import User from '../models/User.js';
import Member from '../models/Member.js';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Clear existing test users to prevent duplicate key errors
        const testEmails = [
            'admin@faizanemadina.com',
            'committee@faizanemadina.com',
            'volunteer@faizanemadina.com',
            'member@faizanemadina.com'
        ];

        await User.deleteMany({ email: { $in: testEmails } });
        console.log('Cleared old test users');

        const password = 'Password@123';

        const usersToCreate = [
            {
                fullName: 'Admin User',
                email: 'admin@faizanemadina.com',
                role: 'admin',
            },
            {
                fullName: 'Committee View',
                email: 'committee@faizanemadina.com',
                role: 'committee',
            },
            {
                fullName: 'Volunteer Helper',
                email: 'volunteer@faizanemadina.com',
                role: 'volunteer',
            },
            {
                fullName: 'Regular Member',
                email: 'member@faizanemadina.com',
                role: 'member',
            }
        ];

        console.log('Creating users...');

        for (const u of usersToCreate) {
            try {
                // Must set isEmailVerified true so we can log in immediately
                const user = await User.create({
                    ...u,
                    password,
                    isEmailVerified: true
                });

                // All users need a linked Member document per Phase 1 architecture
                await Member.create({ user: user._id });
            } catch (innerError) {
                fs.writeFileSync('innerError.log', String(innerError.stack || innerError));
                throw innerError;
            }
        }

        console.log('✅ Seed successful! You can now log in with the following accounts:');
        console.table(usersToCreate.map(u => ({ email: u.email, password, role: u.role })));

        process.exit();
    } catch (error) {
        fs.writeFileSync('seedError.log', error.stack || String(error));
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedUsers();

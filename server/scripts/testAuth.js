import mongoose from 'mongoose';
import 'dotenv/config';
import app from '../app.js';
import User from '../models/User.js';
import { generateAccessToken } from '../services/tokenService.js';

let server;

const testAuth = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        server = app.listen(5006, async () => {
            console.log('Testing Server running on 5006');

            // 1. Create a dummy member user for testing the token
            // find or create one randomly
            const dummyId = new mongoose.Types.ObjectId();
            const testUser = await User.create({
                _id: dummyId,
                firstName: 'Test',
                lastName: 'Member',
                fullName: 'Test Member',
                email: `testmember_${Date.now()}@test.com`,
                password: 'Password123!',
                role: 'member',
                isActive: true,
            });

            // 2. Generate token for this 'member'
            const accessToken = generateAccessToken(testUser._id, testUser.role);

            // 3. Test hitting the PUT /api/prayers/update (Admin Only) with 'member' token
            console.log('--- Testing /api/prayers/update as Member ---');
            const req1 = await fetch('http://localhost:5006/api/prayers/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ date: new Date(), fajr: '05:00', sunrise: '06:00', zuhr: '13:00', asr: '17:00', maghrib: '19:00', isha: '20:30', jummah: '13:30' })
            });
            console.log(`Status Code: ${req1.status} (Expected: 403)`);
            const body1 = await req1.json();
            console.log('Response Body:', body1);

            // 4. Test hitting /api/user/me mapping (Protected, but allows 'member')
            // Wait, let's see where /me is mounted. Usually /api/auth/me or /api/user/me
            console.log('\n--- Testing /api/user/profile as Member ---');
            const req2 = await fetch('http://localhost:5006/api/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(`Status Code: ${req2.status} (Expected: 200 or 404 but not 403)`);

            // cleanup
            await testUser.deleteOne();
            server.close();
            await mongoose.connection.close();
            process.exit(0);
        });
    } catch (err) {
        console.error(err);
        if (server) server.close();
        process.exit(1);
    }
};

testAuth();

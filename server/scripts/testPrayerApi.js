import fetch from 'node-fetch'; // Vite/Node 18+ has built in fetch, we can just use native fetch if available.
import app from '../app.js';
import mongoose from 'mongoose';
import 'dotenv/config';

let server;

async function runTests() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        server = app.listen(5005, async () => {
            console.log('Testing Server running on port 5005');

            // 1. Test GET /api/prayers/today
            const res1 = await fetch('http://localhost:5005/api/prayers/today');
            const data1 = await res1.json();
            console.log('GET /api/prayers/today:', res1.status, data1.success ? 'SUCCESS' : 'FAIL');

            // 2. Test GET /api/prayers
            const res2 = await fetch('http://localhost:5005/api/prayers');
            const data2 = await res2.json();
            console.log('GET /api/prayers:', res2.status, data2.success ? 'SUCCESS' : 'FAIL', `Count: ${data2.count}`);

            // 3. Test PUT /api/prayers/update without token (should fail)
            const res3 = await fetch('http://localhost:5005/api/prayers/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: new Date(), fajr: '05:00', sunrise: '06:00', zuhr: '13:00', asr: '17:00', maghrib: '19:00', isha: '20:30', jummah: '13:30' })
            });
            console.log('PUT /api/prayers/update (auth block):', res3.status === 401 ? 'SUCCESS (Blocked)' : 'FAIL');

            // cleanup
            server.close();
            await mongoose.connection.close();
            console.log('Tests finished');
            process.exit(0);
        });

    } catch (err) {
        console.error(err);
        if (server) server.close();
        process.exit(1);
    }
}

runTests();

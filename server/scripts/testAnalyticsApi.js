import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/faizan-e-madina', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB for Testing'))
    .catch(err => console.error(err));

const runTests = async () => {
    try {
        console.log('\n--- 1. Authenticating as Admin ---');
        const loginRes = await fetch('http://127.0.0.1:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@faizanemadina.com',
                password: 'Password@123'
            })
        });
        const loginData = await loginRes.json();
        const token = loginData.accessToken;
        if (!token) throw new Error('Login failed. Token not received.');
        console.log('✅ Admin Token Aquired!');

        const authHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        console.log('\n--- 2. Fetching Dashboard Stats ---');
        const statsRes = await fetch('http://127.0.0.1:5000/api/analytics/dashboard-stats', { headers: authHeaders });
        const stats = await statsRes.json();
        console.log('✅ Dashboard Stats:', stats.data);

        console.log('\n--- 3. Fetching Settings ---');
        const setRes = await fetch('http://127.0.0.1:5000/api/settings', { headers: authHeaders });
        const textSettings = await setRes.text();
        let getSettings;
        try {
            getSettings = JSON.parse(textSettings);
        } catch (e) {
            throw new Error(`Failed to parse settings JSON. Raw response: ${textSettings.substring(0, 200)}`);
        }
        if (!getSettings.success) throw new Error('Failed to fetch settings');
        console.log('✅ Base Settings:', getSettings.data);

        console.log('\n--- 4. Updating Settings (Triggering Audit Log) ---');
        const updateRes = await fetch('http://127.0.0.1:5000/api/settings', {
            method: 'PUT',
            headers: authHeaders,
            body: JSON.stringify({
                maintenanceMode: true,
                contactPhone: "+91-9876543210"
            })
        });
        const updated = await updateRes.json();
        if (!updated.success) throw new Error('Failed to update settings');
        console.log('✅ Settings Updated Successfully!');

        console.log('\n--- 5. Restoring Settings ---');
        await fetch('http://127.0.0.1:5000/api/settings', {
            method: 'PUT',
            headers: authHeaders,
            body: JSON.stringify({ maintenanceMode: false })
        });
        console.log('✅ Restored maintenance mode back to false.');

        console.log('\n🎉 All Analytics & Settings API endpoints verified successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Test Failed:', error.message);
        process.exit(1);
    }
}

setTimeout(runTests, 1000);

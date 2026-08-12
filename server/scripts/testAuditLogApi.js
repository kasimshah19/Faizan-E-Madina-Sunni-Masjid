const BASE_URL = 'http://127.0.0.1:5000/api';

async function run() {
    console.log('--- STARTING AUDIT LOG TESTS ---');
    try {
        // 1. Authenticate Admin
        console.log('1. Authenticating Admin...');
        let res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@faizanemadina.com', password: 'Password@123' })
        });
        if (!res.ok) {
            console.error('Admin Login Failed:', await res.text());
            throw new Error('Admin login failed');
        }
        const adminAuth = await res.json();
        const adminToken = adminAuth.accessToken;
        if (!adminToken) throw new Error('Admin login failed');

        // 2. Action: Promote Kasim Email Test user to Volunteer
        const targetUserId = '6a774cbd5000a1ad40289304';
        console.log('2. Promoting Member to Volunteer (Triggering USER_ROLE_CHANGED)...');
        await fetch(`${BASE_URL}/users/${targetUserId}/role`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` },
            body: JSON.stringify({ role: 'volunteer' })
        });

        // 3. Action: Assign Committee Member (Requires another user)
        console.log('3. Assigning Committee Member (Triggering COMMITTEE_MEMBER_ASSIGNED)...');
        const cUserId = '6a774cbd5000a1ad40289304';
        await fetch(`${BASE_URL}/committee/assign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` },
            body: JSON.stringify({ user: cUserId, designation: 'Event Lead', permissions: ['events'] })
        });

        // 4. Verify getting Audit Logs
        console.log('4. Fetching all audit logs...');
        res = await fetch(`${BASE_URL}/audit-logs`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        const allLogs = await res.json();
        console.log(`Total Logs in System: ${allLogs.pagination.total}`);
        console.log('Recent Log Actions:', allLogs.data.slice(0, 3).map(l => ({ action: l.action, targetId: l.targetId, user: l.user.email })));

        // 6. Test Module Filtering
        console.log('6. Filtering by module Committee...');
        res = await fetch(`${BASE_URL}/audit-logs?module=Committee`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        const cLogs = await res.json();
        console.log(`Committee Logs Count: ${cLogs.pagination.total}`);
        console.log(`First Committee Log Action: ${cLogs.data[0]?.action}`);

        // 7. Test Target Filtering
        console.log('7. Filtering logs by specific target (User ID)...');
        res = await fetch(`${BASE_URL}/audit-logs/target/${targetUserId}`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        const targetLogs = await res.json();
        console.log(`Target Logs Count: ${targetLogs.count}`);
        console.log(`First Target Log Action: ${targetLogs.data[0]?.action}`);

        console.log('--- TESTS COMPLETED SUCCESSFULLY ---');
    } catch (e) {
        console.error('TEST FAILED:', e);
    }
}

run();

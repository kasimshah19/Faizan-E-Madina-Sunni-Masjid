import fs from 'fs';

const BASE_URL = 'http://localhost:5000/api';
const pass = 'Password@123';

const logResult = (name, passed, evidence) => {
    console.log(`\n--- TEST: ${name} ---`);
    console.log(`STATUS: ${passed ? '✅ PASS' : '❌ FAIL'}`);
    console.log('EVIDENCE:', JSON.stringify(evidence, null, 2));
    if (!passed) process.exit(1);
};

const login = async (email) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
    });
    const data = await res.json();
    if (!data.success || !data.accessToken) {
        console.error("LOGIN FAILED for", email, data);
        process.exit(1);
    }
    return data.accessToken;
};

const runTests = async () => {
    try {
        console.log("Logging in...");
        const adminToken = await login('admin@faizanemadina.com');
        const commToken = await login('committee@faizanemadina.com');
        const volToken = await login('volunteer@faizanemadina.com');
        const memToken = await login('member@faizanemadina.com');

        // Test 1: GET /api/users/me for each account
        for (const [name, token] of [['Admin', adminToken], ['Committee', commToken], ['Volunteer', volToken], ['Member', memToken]]) {
            const meRes = await fetch(`${BASE_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } });
            const meData = await meRes.json();
            const passed = meRes.status === 200 && !meData.data?.password && meData.data?.roleProfile !== undefined;
            logResult(`GET /api/users/me for ${name}`, passed, { status: meRes.status, hasPassword: !!meData.data?.password, roleProfileLinked: !!meData.data?.roleProfile });
        }

        // Test 2: PUT /api/users/me block bad fields
        const putMeRes = await fetch(`${BASE_URL}/users/me`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${memToken}` },
            body: JSON.stringify({ email: 'hacked@hack.com', role: 'admin', fullName: 'Updated Member' })
        });
        const putMeData = await putMeRes.json();
        const putMePassed = putMeRes.status === 200 && putMeData.data.email !== 'hacked@hack.com' && putMeData.data.role !== 'admin' && putMeData.data.fullName === 'Updated Member';
        logResult(`PUT /api/users/me block email/role`, putMePassed, { status: putMeRes.status, email: putMeData.data?.email, role: putMeData.data?.role, fullName: putMeData.data?.fullName });

        // Test 3: GET /api/users as admin
        const adminGetUsers = await fetch(`${BASE_URL}/users`, { headers: { Authorization: `Bearer ${adminToken}` } });
        const adminGetUsersData = await adminGetUsers.json();
        const test3Passed = adminGetUsers.status === 200 && Array.isArray(adminGetUsersData.data);
        logResult(`GET /api/users as admin`, test3Passed, { status: adminGetUsers.status, usersCount: adminGetUsersData?.data?.length });

        // Test 4: GET /api/users as member -> 403
        const memGetUsers = await fetch(`${BASE_URL}/users`, { headers: { Authorization: `Bearer ${memToken}` } });
        const test4Passed = memGetUsers.status === 403;
        logResult(`GET /api/users as member`, test4Passed, { status: memGetUsers.status });

        const memUser = adminGetUsersData.data.find(u => u.role === 'member');

        // Test 5: PUT /api/users/:id/role to volunteer
        const promoteRes = await fetch(`${BASE_URL}/users/${memUser._id}/role`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
            body: JSON.stringify({ role: 'volunteer' })
        });
        const promoteData = await promoteRes.json();

        // Verify volunteer profile created
        const volProfilesReq = await fetch(`${BASE_URL}/volunteers`, { headers: { Authorization: `Bearer ${adminToken}` } });
        const volProfiles = (await volProfilesReq.json()).data;
        const linkedVol = volProfiles.find(v => String(v.user._id || v.user) === String(memUser._id));
        const test5Passed = promoteRes.status === 200 && promoteData.data.role === 'volunteer' && linkedVol && linkedVol.status === 'approved';
        logResult(`PUT /api/users/:id/role to volunteer`, test5Passed, { status: promoteRes.status, newRole: promoteData.data?.role, linkedVolunteerCreated: !!linkedVol });

        // Revert member role for remaining tests
        await fetch(`${BASE_URL}/users/${memUser._id}/role`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` }, body: JSON.stringify({ role: 'member' }) });

        // Test 6: POST /api/members/request-volunteer duplicate checks
        await fetch(`${BASE_URL}/members/request-volunteer`, { method: 'POST', headers: { Authorization: `Bearer ${memToken}` } });
        const reqVolDup = await fetch(`${BASE_URL}/members/request-volunteer`, { method: 'POST', headers: { Authorization: `Bearer ${memToken}` } });
        const test6Passed = reqVolDup.status === 400;
        logResult(`POST /api/members/request-volunteer duplicate`, test6Passed, { status: reqVolDup.status });

        // Test 7: Verify approval sets statuses
        const reqsReq = await fetch(`${BASE_URL}/volunteers`, { headers: { Authorization: `Bearer ${adminToken}` } });
        const latestVol = (await reqsReq.json()).data.find(v => String(v.user._id || v.user) === String(memUser._id) && v.status === 'pending');

        const approveReq = await fetch(`${BASE_URL}/volunteers/${latestVol._id}/approve`, { method: 'PUT', headers: { Authorization: `Bearer ${adminToken}` } });
        const approveData = await approveReq.json();
        const memVerify = await (await fetch(`${BASE_URL}/users/${memUser._id}`, { headers: { Authorization: `Bearer ${adminToken}` } })).json();

        const test7Passed = approveReq.status === 200 && approveData.data.status === 'approved' && memVerify.data.role === 'volunteer';
        logResult(`PUT /api/volunteers/:id/approve creates sync`, test7Passed, { status: approveReq.status, volunteerState: approveData.data?.status, userRoleState: memVerify.data?.role });

        // Test 8: Committee Assign
        const assignComm = await fetch(`${BASE_URL}/committee/assign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
            body: JSON.stringify({ user: memUser._id, designation: 'Sub Editor' })
        });
        const assignData = await assignComm.json();
        const commVerify = await (await fetch(`${BASE_URL}/users/${memUser._id}`, { headers: { Authorization: `Bearer ${adminToken}` } })).json();

        const test8Passed = assignComm.status === 201 && assignData.data.designation === 'Sub Editor' && commVerify.data.role === 'committee';
        logResult(`POST /api/committee/assign`, test8Passed, { status: assignComm.status, assignedProfile: !!assignData.data, updatedRole: commVerify.data?.role });

        // Test 9: Committee Delete
        const delComm = await fetch(`${BASE_URL}/committee/${assignData.data._id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${adminToken}` } });
        const revVerify = await (await fetch(`${BASE_URL}/users/${memUser._id}`, { headers: { Authorization: `Bearer ${adminToken}` } })).json();

        const test9Passed = delComm.status === 200 && revVerify.data.role === 'member';
        logResult(`DELETE /api/committee/:id reverts role`, test9Passed, { status: delComm.status, revertedRole: revVerify.data?.role });

        console.log("\nALL TESTS COMPLETED SUCCESSFULLY");

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

runTests();

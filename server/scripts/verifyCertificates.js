import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import Certificate from '../models/Certificate.js';
import User from '../models/User.js';

const API_BASE = 'http://localhost:5000/api';

async function verify() {
    await mongoose.connect(process.env.MONGO_URI);

    // Purge old mock certificates
    await Certificate.deleteMany({});
    console.log("purged existing certificates for test isolation.");

    let token = '';
    try {
        const loginRes = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@faizanemadina.com', password: 'Password@123' })
        });
        const loginData = await loginRes.json();
        if (!loginData.success) throw new Error("Login failed");
        token = loginData.accessToken;
    } catch (err) {
        console.error("Setup failed (Login):", err);
        process.exit(1);
    }

    const req = async (method, endpoint, body) => {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body ? JSON.stringify(body) : undefined
        });
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return { status: res.status, body: await res.json() };
        } else {
            return { status: res.status, body: "Blob/PDF" };
        }
    };

    console.log("--- START CERTIFICATE TESTS ---\n");

    let memberUser = await User.findOne({ role: 'member' });
    if (!memberUser) memberUser = await User.findOne();

    // 1. Create Certificate
    const createRes = await req('POST', '/certificate', {
        recipient: memberUser._id,
        certificateType: 'Tajweed Course Completion',
        title: 'Advanced Tajweed',
        completionDate: new Date().toISOString(),
        grade: 'A+'
    });
    console.log("1. Create Certificate API:", createRes.status === 201 ? 'PASS' : 'FAIL', createRes.body);

    const generatedId = createRes.body.data?._id;
    const certNum = createRes.body.data?.certificateNumber;

    // 2. Reject duplicate
    const dropDuplicate = await req('POST', '/certificate', {
        recipient: memberUser._id,
        certificateType: 'Tajweed Course Completion',
        title: 'Advanced Tajweed Duplicate',
        completionDate: new Date().toISOString()
    });
    console.log("2. Duplicate Rejection API:", dropDuplicate.status === 400 ? 'PASS' : 'FAIL', typeof dropDuplicate.body === 'object' ? dropDuplicate.body.message : '');

    // 3. Approve Certificate
    const approveRes = await req('PATCH', `/certificate/${generatedId}/approve`);
    console.log("3. Approve Transition API:", approveRes.status === 200 && approveRes.body.data.status === 'approved' ? 'PASS' : 'FAIL');

    // 4. Issue Certificate (Triggers PDF kit and QR)
    const issueRes = await req('PATCH', `/certificate/${generatedId}/issue`);
    console.log("4. Issue Transition API:", issueRes.status === 200 && issueRes.body.data.status === 'issued' ? 'PASS' : 'FAIL');

    // 5. Verify Public URL
    const verifyRes = await fetch(`${API_BASE}/certificate/verify/${certNum}`);
    const verifyBody = await verifyRes.json();
    console.log("5. Public Verify API:", verifyBody.success && verifyBody.data.valid ? 'PASS' : 'FAIL', verifyBody.data);

    // 6. Download PDF
    const dlRes = await req('GET', `/certificate/${generatedId}/download`);
    console.log("6. Download PDF Base API Route:", dlRes.status === 200 && dlRes.body === 'Blob/PDF' ? 'PASS' : 'FAIL');

    // 7. Revoke Certificate
    const revokeRes = await req('PATCH', `/certificate/${generatedId}/revoke`);
    console.log("7. Revoke Transition API:", revokeRes.status === 200 && revokeRes.body.data.status === 'revoked' ? 'PASS' : 'FAIL');

    // 8. Verify public URL detects Revoked
    const verifyRevokedRes = await fetch(`${API_BASE}/certificate/verify/${certNum}`);
    const verifyRevokedBody = await verifyRevokedRes.json();
    console.log("8. Revoked Protection API:", verifyRevokedRes.status === 400 && verifyRevokedBody.data.status === 'revoked' ? 'PASS' : 'FAIL');

    process.exit(0);
}

verify();

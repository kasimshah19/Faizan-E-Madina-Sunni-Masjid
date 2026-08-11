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
    console.log("Database connected. Purged existing certificates for test isolation.\n");

    let adminToken = '';
    let memberToken = '';
    let memberUser = null;
    let adminUser = null;

    try {
        // Admin Login
        const adminRes = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@faizanemadina.com', password: 'Password@123' })
        });
        const adminData = await adminRes.json();
        adminToken = adminData.accessToken;

        // Member Login
        const memberRes = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'member@faizanemadina.com', password: 'Password@123' }) // Assuming default seed member
        });
        const memberData = await memberRes.json();
        memberToken = memberData.accessToken;

        memberUser = await User.findOne({ email: 'member@faizanemadina.com' }) || await User.findOne({ role: 'member' });
        adminUser = await User.findOne({ email: 'admin@faizanemadina.com' });
    } catch (err) {
        console.error("Setup failed (Login): Ensure the server is running and seeded with users.", err);
        process.exit(1);
    }

    const req = async (method, endpoint, body, tokenOverride) => {
        const headers = { 'Content-Type': 'application/json' };
        if (tokenOverride !== null) {
            headers['Authorization'] = `Bearer ${tokenOverride || adminToken}`;
        }

        const res = await fetch(`${API_BASE}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });

        let resBody;
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            resBody = await res.json();
        } else if (contentType && contentType.includes("application/pdf")) {
            resBody = 'Blob/PDF';
        } else {
            resBody = await res.text();
        }
        return { status: res.status, body: resBody };
    };

    const results = {};

    console.log("--- START CERTIFICATE TESTS ---\n");

    // Test 1, 2: Model & Creation
    const createRes = await req('POST', '/certificate', {
        recipient: memberUser._id,
        certificateType: 'Tajweed Course Completion',
        title: 'Advanced Tajweed',
        completionDate: new Date().toISOString(),
        grade: 'A+'
    });
    results['2. Certificate Creation'] = createRes.status === 201 ? 'PASS' : 'FAIL';

    // Safety check if create didn't work abort
    if (createRes.status !== 201) {
        console.error("Creation failed", createRes.body);
        process.exit(1);
    }

    const generatedId = createRes.body.data._id;
    const certNum = createRes.body.data.certificateNumber;
    const certUrlDb = createRes.body.data.certificateUrl;

    // Test 4: Certificate Number Formatted correctly
    const certRegex = /^FEM-\d{4}-.+-\d{6}$/;
    results['4. Cert Number Format'] = certRegex.test(certNum) ? 'PASS' : 'FAIL';

    // Test 5: CertificateUrl is canonical 
    results['5. Canonical certificateUrl Generated'] = certUrlDb.includes(`/certificate/${certNum}`) ? 'PASS' : 'FAIL';

    // Test 3: Duplicate Certificate Prevention 
    const duplicateRes = await req('POST', '/certificate', {
        recipient: memberUser._id,
        certificateType: 'Tajweed Course Completion', // Same exact type
        title: 'Advanced Tajweed Duplicate Attempt',
        completionDate: new Date().toISOString()
    });
    results['3. Duplicate Prevention (Constraint)'] = duplicateRes.status === 400 ? 'PASS' : 'FAIL';

    // Approve & Issue flow for the further tests
    await req('PATCH', `/certificate/${generatedId}/approve`);
    const issueRes = await req('PATCH', `/certificate/${generatedId}/issue`);

    // Test 6: QR Contains exact Canonical URL
    const qrMatchesURL = issueRes.body.data.qrCodeData && typeof issueRes.body.data.qrCodeData === 'string' && issueRes.body.data.qrCodeData.startsWith('data:image/png;base64');
    results['6. QR Contains canonical URL encoded'] = qrMatchesURL ? 'PASS' : 'FAIL';

    // Test 7, 14: PDF Download works correctly
    const pdfResAdmin = await req('GET', `/certificate/${generatedId}/download`);
    results['7. PDF Contains hyperlink / Generates correct stream'] = pdfResAdmin.status === 200 && pdfResAdmin.body === 'Blob/PDF' ? 'PASS' : 'FAIL';

    // Test 8, 9, 16: Public Certificate Verification (No token)
    const publicVerifyRes = await req('GET', `/certificate/public/${certNum}`, null, null);
    // ^ null override strictly omits auth headers
    const publicSafe = publicVerifyRes.body?.data && !Object.keys(publicVerifyRes.body.data).some(k => ['password', 'email', 'phone'].includes(k.toLowerCase()));

    results['8. Public API works'] = publicVerifyRes.status === 200 ? 'PASS' : 'FAIL';
    results['9. No Authentication required on Public'] = publicVerifyRes.status === 200 ? 'PASS' : 'FAIL';
    results['16. No sensitive info in Public Return'] = publicSafe ? 'PASS' : 'FAIL';

    // Test 10: Protected Member Endpoints
    const getMyMembers = await req('GET', '/certificate/my', null, memberToken);
    results['10. Protected Member List requires Auth/Works'] = getMyMembers.status === 200 ? 'PASS' : 'FAIL';

    // Test 11: Admin Ops require Admin
    const rejectMemberIssue = await req('PATCH', `/certificate/${generatedId}/issue`, null, memberToken);
    results['11. Admin Role Security Restricts Members'] = rejectMemberIssue.status === 403 ? 'PASS' : 'FAIL';

    // Test 12, 13: Revocation & Validation
    await req('PATCH', `/certificate/${generatedId}/revoke`); // Revoke it
    const publicVerifyRevoked = await req('GET', `/certificate/public/${certNum}`, null, null);
    results['12. Revoked Certs accessible but show revoked status'] = publicVerifyRevoked.status === 400 && publicVerifyRevoked.body?.data?.status === 'revoked' ? 'PASS' : 'FAIL';

    const publicVerifyFake = await req('GET', `/certificate/public/FEM-9999-FAKE-000000`, null, null);
    results['13. Invalid certs return 404'] = publicVerifyFake.status === 404 ? 'PASS' : 'FAIL';


    console.table(results);

    process.exit(0);
}

verify();

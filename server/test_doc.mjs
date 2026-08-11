import fetch from 'node-fetch';
import fs from 'fs';
import FormData from 'form-data';
import PDFKit from 'pdfkit';
import path from 'path';

(async () => {
    // 1. Create a dummy PDF
    const pdfPath = path.join(process.cwd(), 'dummy_test.pdf');
    const doc = new PDFKit();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.text('Test PDF for upload.');
    doc.end();
    await new Promise(resolve => setTimeout(resolve, 500)); // wait for file close

    // 2. Login
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@faizanemadina.com', password: 'Password@123' })
    });
    const loginData = await loginRes.json();
    const token = loginData.accessToken;

    // 3. Upload File
    const formData = new FormData();
    formData.append('title', 'Admin Test PDF');
    formData.append('category', 'notice');
    formData.append('isPublic', 'true');
    formData.append('document', fs.createReadStream(pdfPath));

    console.log('\\n=== TEST: Real Upload ===');
    const uploadRes = await fetch('http://localhost:5000/api/documents', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
        body: formData
    });
    const uploadData = await uploadRes.json();
    console.log('Upload Result:', uploadData.success);
    const docId = uploadData.data._id;
    
    // 4. Download / Tracker Test
    console.log('\\n=== TEST: Download Count Increment ===');
    const dlRes = await fetch('http://localhost:5000/api/documents/' + docId + '/download', { redirect: 'manual' });
    console.log('Download Status Code (Expect 302):', dlRes.status);
    
    const checkRes = await fetch('http://localhost:5000/api/documents/' + docId);
    const checkData = await checkRes.json();
    console.log('Download Count:', checkData.data.downloadCount);
    
    // 5. Delete Test
    console.log('\\n=== TEST: Delete Document ===');
    const delRes = await fetch('http://localhost:5000/api/documents/' + docId, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const delData = await delRes.json();
    console.log('Delete Result:', delData.success);
    
    fs.unlinkSync(pdfPath);
})();

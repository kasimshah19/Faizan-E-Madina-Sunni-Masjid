import multer from 'multer';
import { upload } from '../middleware/uploadMiddleware.js';
import express from 'express';
import request from 'supertest';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ success: true, file: req.file });
});

app.use((err, req, res, next) => {
    res.status(400).json({ success: false, error: err.message });
});

async function runTests() {
    console.log("--- MULTIPART UPLOAD TESTS ---");

    // Create dummy files
    const validJpg = path.join(__dirname, 'test.jpg');
    fs.writeFileSync(validJpg, 'fake image data');
    const validPdf = path.join(__dirname, 'test.pdf');
    fs.writeFileSync(validPdf, 'fake pdf data');
    const invalidJs = path.join(__dirname, 'test.js');
    fs.writeFileSync(invalidJs, 'console.log("danger");');
    const oversizedFile = path.join(__dirname, 'large.pdf');
    fs.writeFileSync(oversizedFile, Buffer.alloc(6 * 1024 * 1024)); // 6MB

    let passed = 0;

    // 1. JPEG (should pass if we mock mimetype properly, but using standard fields)
    const resJpg = await request(app).post('/upload').attach('file', validJpg, { contentType: 'image/jpeg' });
    console.log(`JPEG Upload: ${resJpg.status === 200 ? 'PASS' : 'FAIL'} (${resJpg.body.error || 'Success'})`);
    if (resJpg.status === 200) passed++;

    // 2. PDF
    const resPdf = await request(app).post('/upload').attach('file', validPdf, { contentType: 'application/pdf' });
    console.log(`PDF Upload: ${resPdf.status === 200 ? 'PASS' : 'FAIL'} (${resPdf.body.error || 'Success'})`);
    if (resPdf.status === 200) passed++;

    // 3. Executable JS (Should FAIL MIME check)
    const resJs = await request(app).post('/upload').attach('file', invalidJs, { contentType: 'application/javascript' });
    console.log(`Invalid JS Upload: ${resJs.status === 400 && resJs.body.error.includes('Invalid file type') ? 'PASS' : 'FAIL'}`);
    if (resJs.status === 400) passed++;

    // 4. Oversized File (Should FAIL 5MB limit)
    const resLarge = await request(app).post('/upload').attach('file', oversizedFile, { contentType: 'application/pdf' });
    console.log(`5MB Limit Check: ${resLarge.status === 400 && resLarge.body.error.includes('File too large') ? 'PASS' : 'FAIL'}`);
    if (resLarge.status === 400) passed++;

    // Cleanup
    fs.unlinkSync(validJpg);
    fs.unlinkSync(validPdf);
    fs.unlinkSync(invalidJs);
    fs.unlinkSync(oversizedFile);
    if (resJpg.body.file) fs.unlinkSync(resJpg.body.file.path);
    if (resPdf.body.file) fs.unlinkSync(resPdf.body.file.path);

    console.log(`\nTests Passed: ${passed}/4`);
    process.exit(passed === 4 ? 0 : 1);
}

runTests();

import fs from 'fs';
import PDFDocument from 'pdfkit';

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('real_test.pdf'));
doc.text('This is a real PDF file generated for testing the Cloudinary upload pipeline.');
doc.end();

import PDFDocument from 'pdfkit';

/**
 * Generates an in-memory PDF Buffer for a Certificate.
 * Applies a premium Emerald/Gold style layout.
 */
export const generateCertificatePDFBuffer = async (certificateDoc, qrDataUri) => {
    return new Promise((resolve, reject) => {
        try {
            // Landscape Premium Certificate Template
            const doc = new PDFDocument({
                size: 'A4',
                layout: 'landscape',
                margins: { top: 50, bottom: 50, left: 50, right: 50 }
            });

            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.on('error', reject);

            // Colors
            const EMERALD = '#064E3B';
            const GOLD = '#D97706';

            // 1. Draw Inner and Outer Borders
            doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
                .lineWidth(5).stroke(EMERALD);
            doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
                .lineWidth(1).stroke(GOLD);

            // 2. Header
            doc.moveDown(2);
            doc.font('Helvetica-Bold')
                .fontSize(36)
                .fillColor(EMERALD)
                .text('Faizan E Madina Sunni Masjid', { align: 'center' });

            doc.moveDown(0.5);
            doc.font('Helvetica')
                .fontSize(22)
                .fillColor(GOLD)
                .text('CERTIFICATE OF COMPLETION', { align: 'center', characterSpacing: 2 });

            doc.moveDown(1.5);
            doc.font('Helvetica')
                .fontSize(16)
                .fillColor('#333333')
                .text('- Presented To -', { align: 'center' });

            // 3. Recipient Name
            doc.moveDown(0.5);
            doc.font('Helvetica-Bold')
                .fontSize(32)
                .fillColor(EMERALD)
                .text(certificateDoc.recipient.fullName || certificateDoc.recipient.name || 'Recipient', { align: 'center', underline: true });

            // 4. Middle Dynamic Reason Text
            doc.moveDown(1);
            doc.font('Helvetica')
                .fontSize(16)
                .fillColor('#333333')
                .text(`For successfully completing the`, { align: 'center' });

            doc.moveDown(0.5);
            doc.font('Helvetica-Bold')
                .fontSize(24)
                .fillColor(EMERALD)
                .text(certificateDoc.title.toUpperCase(), { align: 'center' });

            // 5. Grading / Date Specifics
            doc.moveDown(1);
            const metricsText = `Certificate Type: ${certificateDoc.certificateType}  •  Completion Date: ${new Date(certificateDoc.completionDate).toLocaleDateString()}`
                + (certificateDoc.grade ? `  •  Grade: ${certificateDoc.grade}` : '');

            doc.font('Helvetica-Oblique')
                .fontSize(12)
                .fillColor('#666666')
                .text(metricsText, { align: 'center' });

            // 6. Signatures and Verification block below
            const bottomY = doc.page.height - 150;

            // QR Code (Left)
            if (qrDataUri) {
                // Strip data:image/png;base64, from URI
                const base64Data = qrDataUri.replace(/^data:image\/png;base64,/, "");
                const imgBuffer = Buffer.from(base64Data, 'base64');
                doc.image(imgBuffer, 60, bottomY + 10, { width: 80 });

                doc.font('Helvetica')
                    .fontSize(8)
                    .fillColor('#444')
                    .text('Scan to Verify Authenticity', 55, bottomY + 100, { width: 90, align: 'center' });
            }

            // Cert Number (Center)
            doc.font('Helvetica-Bold')
                .fontSize(12)
                .fillColor(EMERALD)
                .text('Certificate Number', 0, bottomY + 40, { align: 'center' });
            doc.font('Helvetica')
                .fontSize(14)
                .fillColor('#333')
                .text(certificateDoc.certificateNumber, 0, bottomY + 60, { align: 'center' });

            // Signature (Right)
            doc.moveTo(doc.page.width - 250, bottomY + 80)
                .lineTo(doc.page.width - 60, bottomY + 80)
                .lineWidth(1).stroke(EMERALD);
            doc.font('Helvetica-Bold')
                .fontSize(14)
                .fillColor(EMERALD)
                .text('Authorized Issuer', doc.page.width - 250, bottomY + 90, { width: 190, align: 'center' });
            doc.font('Helvetica')
                .fontSize(10)
                .fillColor('#666')
                .text('Faizan E Madina Leadership', doc.page.width - 250, bottomY + 110, { width: 190, align: 'center' });

            // 7. Clickable Canonical Public Link (Bottom Center)
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            const certUrl = `${frontendUrl}/certificate/${certificateDoc.certificateNumber}`;

            doc.moveDown(2);
            doc.font('Helvetica-Oblique')
                .fontSize(10)
                .fillColor(GOLD)
                .text('Verify / View Certificate Online', 0, doc.page.height - 45, { align: 'center' });

            doc.font('Helvetica')
                .fontSize(9)
                .fillColor('#666')
                .text(certUrl, 0, doc.page.height - 30, { align: 'center', link: certUrl, underline: true });

            doc.end();
        } catch (e) {
            reject(e);
        }
    });
};

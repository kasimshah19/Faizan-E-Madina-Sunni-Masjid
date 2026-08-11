import PDFDocument from 'pdfkit';

export const generateReceipt = (donation) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // --- PDF CONTENT LAYOUT --- //
      const primaryColor = '#0F5132'; // Dark green
      const textColor = '#333333';

      // 1. Header
      doc
        .fillColor(primaryColor)
        .fontSize(24)
        .text('Faizan E Madina Sunni Masjid', 50, 60)
        .moveDown(0.2)
        .fontSize(16)
        .text('Donation Receipt')
        .moveDown();

      // Divider Line
      doc.moveTo(50, 115).lineTo(550, 115).lineWidth(2).strokeColor(primaryColor).stroke();

      // 2. Receipt Details
      const donorName = (donation.isAnonymous || !donation.donorName) ? 'Anonymous Donor' : donation.donorName;

      const dateObj = new Date(donation.createdAt || Date.now());
      const datePart = dateObj.toISOString().split('T')[0].replace(/-/g, '');
      const tailPart = donation._id ? donation._id.toString().slice(-4).toUpperCase() : Math.floor(Math.random() * 9000 + 1000);
      const receiptNumber = `FEM-DON-${datePart}-${tailPart}`;

      doc
        .fillColor(textColor)
        .fontSize(12)
        .moveDown(2)
        .text(`Receipt Number: ${receiptNumber}`)
        .moveDown(0.5)
        .text(`Date of Donation: ${dateObj.toLocaleDateString()}`)
        .moveDown(1.5);

      // 3. User Details
      doc
        .fontSize(14)
        .text('Donation Details:')
        .moveDown(0.5)
        .fontSize(12)
        .text(`Donor Name: ${donorName}`)
        .text(`Category: ${donation.category ? donation.category.toUpperCase() : 'GENERAL'}`)
        .text(`Payment Method: ${donation.paymentMethod ? donation.paymentMethod.toUpperCase() : 'CASH'}`)
        .text(`Transaction ID: ${donation.transactionId || 'N/A'}`)
        .moveDown(1);

      // 4. Amount Highlight Box
      doc
        .rect(50, doc.y, 500, 50)
        .fill('#F0F0F0');

      doc
        .fillColor(primaryColor)
        .fontSize(18)
        .text(`Amount: $${donation.amount.toFixed(2)}`, 70, doc.y - 35); // Revert font naturally assuming default Helvetica

      doc.moveDown(5); // Move past the box

      // 5. Footer Message
      doc
        .fillColor(primaryColor)
        .fontSize(14)
        .text('JazakAllahu Khairan for your generous contribution!', 50, doc.y, { align: 'center' })
        .moveDown()
        .fillColor('#777777')
        .fontSize(10)
        .text('Faizan E Madina Sunni Masjid | 123 Madina Street, City, State ZIP', { align: 'center' })
        .text('Email: info@faizanemadina.com | Phone: 555-0123', { align: 'center' });

      doc.end();

    } catch (error) {
      reject(error);
    }
  });
};

export const generateCertificate = (certificateData) => {
  // TODO: Implement certificate PDF generation
};

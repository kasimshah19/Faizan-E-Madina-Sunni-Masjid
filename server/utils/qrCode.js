import QRCode from 'qrcode';

/**
 * Generates a Data URI (base64 PNG) for a given text.
 * @param {string} text - The text/URL to encode.
 * @returns {Promise<string>} Base64 data URI
 */
export const generateVerificationQRCode = async (certificateNumber) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const certUrl = `${frontendUrl}/certificate/${certificateNumber}`;

    try {
        const qrDataUri = await QRCode.toDataURL(certUrl, {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            margin: 2,
            color: {
                dark: '#064E3B', // tailwind emerald-900 
                light: '#FFFFFF'
            }
        });
        return qrDataUri;
    } catch (err) {
        console.error("QR Code Generation Error:", err);
        throw new Error('Failed to generate QR Code');
    }
};

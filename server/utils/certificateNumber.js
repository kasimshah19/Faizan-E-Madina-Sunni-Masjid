import Certificate from '../models/Certificate.js';

/**
 * Maps the broad certificate type to a short 2-5 letter code.
 */
const getTypePrefix = (type) => {
    const map = {
        'Madrasa Course Completion': 'MAD',
        'Quran Course Completion': 'QUR',
        'Tajweed Course Completion': 'TAJ',
        'Hifz Program Completion': 'HIFZ',
        'Arabic Learning Completion': 'ARA',
        'Quran Competition Participation': 'COMP-P',
        'Quran Competition Achievement': 'COMP-A',
        'Islamic Education Program': 'EDU',
        'Event Participation': 'EVNT',
        'Volunteer Appreciation': 'VOL',
    };
    return map[type] || 'CERT';
};

/**
 * Generates a unique, collision-safe certificate number.
 * Format: FEM-YYYY-[TYPE]-XXXXXX
 */
export const generateCertificateNumber = async (certificateType) => {
    const year = new Date().getFullYear();
    const typeCode = getTypePrefix(certificateType);
    const prefix = `FEM-${year}-${typeCode}`;

    // Find the highest sequence number for this specific prefix in the current year
    // using regex to match FEM-YYYY-TYPE-*
    const lastCert = await Certificate.findOne({
        certificateNumber: new RegExp(`^${prefix}-`)
    }).sort({ createdAt: -1 });

    let sequence = 1;
    if (lastCert && lastCert.certificateNumber) {
        const parts = lastCert.certificateNumber.split('-');
        const lastSequenceStr = parts[parts.length - 1]; // XXXXXX
        const lastSequence = parseInt(lastSequenceStr, 10);
        if (!isNaN(lastSequence)) {
            sequence = lastSequence + 1;
        }
    }

    const paddedSequence = sequence.toString().padStart(6, '0'); // e.g. 000001
    return `${prefix}-${paddedSequence}`;
};

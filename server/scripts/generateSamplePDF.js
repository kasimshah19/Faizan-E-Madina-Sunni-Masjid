import 'dotenv/config';
import mongoose from 'mongoose';
import Donation from '../models/Donation.js';
import { generateReceipt } from '../services/pdfService.js';
import fs from 'fs';

const generateSample = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const donation = await Donation.findOne({ isAnonymous: false }).sort({ createdAt: -1 });

        if (donation) {
            const pdfBuffer = await generateReceipt(donation);
            fs.writeFileSync('C:\\Users\\kasim\\.gemini\\antigravity\\brain\\de1a81b8-0719-4c93-8e99-7fea70458242\\receipt-sample.pdf', pdfBuffer);
            console.log('Sample PDF saved!');
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
generateSample();

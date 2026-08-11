import 'dotenv/config';
import mongoose from 'mongoose';
import Donation from '../models/Donation.js';
import User from '../models/User.js';

const seedDonations = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully.');

        // Look for our test member user
        const memberUser = await User.findOne({ role: 'member', email: { $regex: 'testmember' } });

        // Clear out existing donations before inserting test ones (optional but keeps analytics clean)
        console.log('Clearing old dummy donations...');
        await Donation.deleteMany({});

        const donationsToInsert = [];
        const categories = ['general', 'ramadan', 'construction', 'water', 'electricity', 'madrasa'];
        const paymentMethods = ['cash', 'online', 'bank_transfer'];

        console.log('Generating dummy donations over the last 12 months...');

        // Create ~20 donations scattered over the last few months
        for (let i = 0; i < 20; i++) {
            const pastDate = new Date();
            // Scatter months backwards
            pastDate.setMonth(pastDate.getMonth() - Math.floor(Math.random() * 6));
            pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 28));

            const isAnon = Math.random() > 0.7; // 30% chance of being anonymous

            // 50% chance of assigning to our test member if it exists
            let assignedDonor = null;
            if (memberUser && !isAnon && Math.random() > 0.5) {
                assignedDonor = memberUser._id;
            }

            donationsToInsert.push({
                donor: assignedDonor,
                donorName: assignedDonor ? memberUser.fullName : (isAnon ? null : `Guest Donor ${i}`),
                donorEmail: assignedDonor ? memberUser.email : (isAnon ? null : `guest${i}@test.com`),
                amount: Math.floor(Math.random() * 500) + 10, // anywhere between $10 and $500
                category: categories[Math.floor(Math.random() * categories.length)],
                paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
                transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                status: 'completed',
                isAnonymous: isAnon,
                message: 'Keep up the good work',
                createdAt: pastDate, // Note: timestamps usually override this if default: Date.now isn't managed but Mongoose lets us insert historical dates manually during create if we set it right away.
                updatedAt: pastDate
            });
        }

        await Donation.insertMany(donationsToInsert);
        console.log(`Inserted ${donationsToInsert.length} dummy donations.`);

        console.log('Seed completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error(`Error with seed: ${error.message}`);
        process.exit(1);
    }
};

seedDonations();

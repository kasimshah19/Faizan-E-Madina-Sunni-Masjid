import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import { generateAccessToken } from './services/tokenService.js';

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ role: 'member' });
        if (user) {
            console.log("---------------");
            console.log(generateAccessToken(user._id, user.role));
            console.log("---------------");
        }
        process.exit(0);
    } catch (e) {
        process.exit(1);
    }
}
run();

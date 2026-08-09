import 'dotenv/config'; // Loads env vars before subsequent imports
import connectDB from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

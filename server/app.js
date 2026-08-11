import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { notFoundMiddleware } from './middleware/notFoundMiddleware.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));

// Body parsing
// Limit JSON bodies to 500kb to mitigate volumetric JSON bloat (uploads are handled separately by multer)
app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: true, limit: '500kb' }));
app.use(cookieParser());

// Sanitize data against NoSQL query injection
app.use((req, res, next) => {
    if (req.body) mongoSanitize.sanitize(req.body);
    if (req.query) mongoSanitize.sanitize(req.query);
    if (req.params) mongoSanitize.sanitize(req.params);
    next();
});

// Sanitize String properties against simple XSS payloads (HTML tag injection)
// This is a zero-dependency safe alternative to xss-clean for Express 5 compatibility
const sanitizeStrings = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].replace(/</g, "&lt;").replace(/>/g, "&gt;");
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            sanitizeStrings(obj[key]);
        }
    }
};

app.use((req, res, next) => {
    if (req.body) sanitizeStrings(req.body);
    if (req.query) sanitizeStrings(req.query);
    if (req.params) sanitizeStrings(req.params);
    next();
});

// Logging
app.use(morgan('dev'));

// API routes
app.use('/api', routes);

// Error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

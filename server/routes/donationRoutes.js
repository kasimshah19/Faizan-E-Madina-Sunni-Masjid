import express from 'express';
import {
    createDonation,
    getAllDonations,
    getMyDonations,
    getDonationById,
    getDonationReceipt,
    getDonationAnalytics
} from '../controllers/donationController.js';
import { createDonationRules, validateDonation } from '../validators/donationValidator.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

/**
 * Publicish (Conditionally require authentication based on guest logic)
 * We don't put `protect` middleware at the route level because it rejects Guests.
 * We will verify the token MANUALLY inside the route if one exists for the create endpoint,
 * but Express allows soft checking by writing a mini middleware here to skip protection if no token is presented.
 */
const softProtect = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Has a token, strictly protect it 
        return protect(req, res, next);
    }
    // Continues as guest if no token provided at all
    next();
};

// CREATE DONATION
router.post(
    '/',
    softProtect,
    createDonationRules,
    validateDonation,
    createDonation
);

// ADMIN: GET ANALYTICS
// (Needs to be above /:id to prevent routing clashes)
router.get(
    '/analytics',
    protect,
    authorize('admin', 'superadmin'),
    getDonationAnalytics
);

// ADMIN: GET ALL
router.get(
    '/all',
    protect,
    authorize('admin', 'superadmin'),
    getAllDonations
);

// MEMBER: GET MY DONATIONS
router.get(
    '/my',
    protect,
    getMyDonations
);

// MIXED: GET SPECIFIC DONATION DETAILS
router.get(
    '/:id',
    protect,
    getDonationById
);

// MIXED: GET RECEIPT PDF
router.get(
    '/:id/receipt',
    protect,
    getDonationReceipt
);

export default router;

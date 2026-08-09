import { Router } from 'express';
import {
    register,
    verifyOtp,
    resendOtp,
    login,
    logout,
    refreshTokenHandler,
    forgotPassword,
    resetPassword,
    getMe,
} from '../controllers/authController.js';
import {
    registerRules,
    loginRules,
    otpRules,
    resendOtpRules,
    forgotPasswordRules,
    resetPasswordRules,
} from '../validators/authValidator.js';
import { validate } from '../middleware/validateMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import { loginLimiter, otpResendLimiter, forgotPasswordLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/register', registerRules, validate, register);
router.post('/verify-otp', otpRules, validate, verifyOtp);
router.post('/resend-otp', otpResendLimiter, resendOtpRules, validate, resendOtp);
router.post('/login', loginLimiter, loginRules, validate, login);
router.post('/logout', logout);
router.post('/refresh-token', refreshTokenHandler);
router.post('/forgot-password', forgotPasswordLimiter, forgotPasswordRules, validate, forgotPassword);
router.post('/reset-password/:token', resetPasswordRules, validate, resetPassword);
router.get('/me', protect, getMe);

export default router;

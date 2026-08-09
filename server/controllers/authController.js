import crypto from 'crypto';
import User from '../models/User.js';
import Member from '../models/Member.js';
import { generateOtp } from '../services/otpService.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../services/tokenService.js';
import { sendOtpEmail, sendPasswordResetEmail, sendWelcomeEmail } from '../services/emailService.js';

// --- Cookie options for refresh token ---
const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
};

// ─── REGISTER ───────────────────────────────────────────────
export const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already registered' });
        }

        // Create user — role is always 'member' (never trust client)
        const user = await User.create({ fullName, email, password, role: 'member' });

        // Generate OTP and save
        const otp = generateOtp();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();

        // Create linked Member document
        await Member.create({ user: user._id });

        // Send OTP email (non-blocking — errors are logged)
        sendOtpEmail(user.email, otp);

        res.status(201).json({
            success: true,
            message: 'Registration successful. Please check your email for the verification code.',
        });
    } catch (error) {
        next(error);
    }
};

// ─── VERIFY OTP ─────────────────────────────────────────────
export const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user || !user.otp || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        // Mark verified, clear OTP fields
        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;

        // Generate tokens
        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id);
        user.refreshToken = refreshToken;
        user.lastLogin = new Date();
        await user.save();

        // Set refresh token cookie
        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

        // Send welcome email (non-blocking)
        sendWelcomeEmail(user.email, user.fullName);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            accessToken,
            user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
        });
    } catch (error) {
        next(error);
    }
};

// ─── RESEND OTP ─────────────────────────────────────────────
export const resendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal if email exists — but still return success-like message
            return res.status(200).json({ success: true, message: 'If this email is registered, a new OTP has been sent.' });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ success: false, message: 'Email is already verified' });
        }

        const otp = generateOtp();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        sendOtpEmail(user.email, otp);

        res.status(200).json({ success: true, message: 'A new OTP has been sent to your email.' });
    } catch (error) {
        next(error);
    }
};

// ─── LOGIN ──────────────────────────────────────────────────
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Explicitly select password (it's select: false on schema)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Check email verified
        if (!user.isEmailVerified) {
            return res.status(403).json({ success: false, message: 'Please verify your email before logging in' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id);
        user.refreshToken = refreshToken;
        user.lastLogin = new Date();
        await user.save();

        res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            accessToken,
            user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
        });
    } catch (error) {
        next(error);
    }
};

// ─── LOGOUT ─────────────────────────────────────────────────
export const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        if (refreshToken) {
            // Clear stored refresh token on the user
            await User.findOneAndUpdate(
                { refreshToken },
                { $unset: { refreshToken: 1 } }
            );
        }

        res.clearCookie('refreshToken', { ...REFRESH_COOKIE_OPTIONS, maxAge: 0 });
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};

// ─── REFRESH TOKEN ──────────────────────────────────────────
export const refreshTokenHandler = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ success: false, message: 'No refresh token provided' });
        }

        // Verify the refresh token
        let decoded;
        try {
            decoded = verifyRefreshToken(refreshToken);
        } catch {
            return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
        }

        // Find user and confirm token matches stored version
        const user = await User.findById(decoded.id).select('+refreshToken');
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, message: 'Invalid refresh token' });
        }

        // Issue new access token (and rotate refresh token)
        const newAccessToken = generateAccessToken(user._id, user.role);
        const newRefreshToken = generateRefreshToken(user._id);
        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie('refreshToken', newRefreshToken, REFRESH_COOKIE_OPTIONS);

        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });
    } catch (error) {
        next(error);
    }
};

// ─── FORGOT PASSWORD ────────────────────────────────────────
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        // Always return generic message (no user enumeration)
        if (!user) {
            return res.status(200).json({
                success: true,
                message: 'If this email is registered, a password reset link has been sent.',
            });
        }

        // Generate reset token
        const rawToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
        await user.save();

        // Send raw token in email, store hash in DB
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;
        sendPasswordResetEmail(user.email, resetLink);

        res.status(200).json({
            success: true,
            message: 'If this email is registered, a password reset link has been sent.',
        });
    } catch (error) {
        next(error);
    }
};

// ─── RESET PASSWORD ────────────────────────────────────────
export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Hash the incoming token to compare with stored hash
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
        }

        // Set new password (triggers pre-save hash hook)
        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        // Invalidate existing refresh tokens (force re-login)
        user.refreshToken = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successful. Please log in with your new password.' });
    } catch (error) {
        next(error);
    }
};

// ─── GET ME (protected) ─────────────────────────────────────
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                phone: user.phone,
                avatar: user.avatar,
                isEmailVerified: user.isEmailVerified,
                lastLogin: user.lastLogin,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

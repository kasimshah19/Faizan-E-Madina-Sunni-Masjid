import User from '../models/User.js';
import { verifyAccessToken } from '../services/tokenService.js';

/**
 * Protect middleware — verifies JWT access token and attaches user to req.user.
 * Fetches fresh user from DB to ensure current role/status.
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Read token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized — no token provided' });
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch {
      return res.status(401).json({ success: false, message: 'Not authorized — token is invalid or expired' });
    }

    // Fetch fresh user from DB (ensures role/active status is current)
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists' });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'Account has been deactivated' });
    }

    req.user = { id: user._id, role: user.role, email: user.email, fullName: user.fullName };
    next();
  } catch (error) {
    next(error);
  }
};

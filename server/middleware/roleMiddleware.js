/**
 * Role-based access control middleware.
 * Usage: authorize('admin', 'committee')
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden — you do not have permission to access this resource',
      });
    }
    next();
  };
};

import User from '../models/User.js';
import Member from '../models/Member.js';
import Volunteer from '../models/Volunteer.js';
import CommitteeMember from '../models/CommitteeMember.js';

// @desc    Get logged in user's profile
// @route   GET /api/user/me // note index.js mounts at /user not /users right now, but task says /api/users.
// I will mount correctly or follow existing routes
export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let roleData = null;
        if (user.role === 'member') {
            roleData = await Member.findOne({ user: user._id });
        } else if (user.role === 'volunteer') {
            roleData = await Volunteer.findOne({ user: user._id });
        } else if (user.role === 'committee') {
            roleData = await CommitteeMember.findOne({ user: user._id });
        }

        res.status(200).json({ success: true, data: { ...user.toObject(), roleProfile: roleData } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/user/me
export const updateMyProfile = async (req, res) => {
    try {
        const { fullName, phone, avatar } = req.body;
        // email, role, password blocked explicitly by extracting only what's allowed
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { fullName, phone, avatar },
            { new: true, runValidators: true }
        );
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all users (admin)
// @route   GET /api/user
export const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page - 1) * limit;

        const { search, role, isActive } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        if (role) query.role = role;
        if (isActive !== undefined) query.isActive = isActive === 'true';

        const total = await User.countDocuments(query);
        const users = await User.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });

        res.status(200).json({ success: true, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user by id (admin)
// @route   GET /api/user/:id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update user role & sync role documents
// @route   PUT /api/user/:id/role
export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        user.role = role;
        await user.save();

        // Create or update role specific profiles if missing
        if (role === 'member') {
            await Member.updateOne({ user: user._id }, { $setOnInsert: { user: user._id } }, { upsert: true });
        } else if (role === 'volunteer') {
            await Volunteer.updateOne(
                { user: user._id },
                { $setOnInsert: { user: user._id, status: 'approved', approvedBy: req.user.id, approvedAt: new Date() } },
                { upsert: true }
            );
        } else if (role === 'committee') { // Direct promotion requires dummy designation, better handled in committee
            await CommitteeMember.updateOne(
                { user: user._id },
                { $setOnInsert: { user: user._id, designation: 'Committee Member', assignedBy: req.user.id } },
                { upsert: true }
            );
        }

        // TODO AuditLog entry conceptually here
        res.status(200).json({ success: true, message: 'Role updated successfully', data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Toggle user status
// @route   PATCH /api/user/:id/toggle-active
export const toggleUserActive = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        user.isActive = !user.isActive;
        await user.save();
        res.status(200).json({ success: true, message: `User status changed to ${user.isActive ? 'active' : 'inactive'}`, data: { isActive: user.isActive } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/user/:id
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        // This is a hard delete for User.
        // Also cleanup role specific profiles
        await Member.deleteOne({ user: user._id });
        await Volunteer.deleteOne({ user: user._id });
        await CommitteeMember.deleteOne({ user: user._id });

        await user.deleteOne();

        // Note: Does not cascade delete historical Donation, Attendance or Grade files.
        res.status(200).json({ success: true, message: 'User deleted safely without affecting history.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

import Volunteer from '../models/Volunteer.js';
import User from '../models/User.js';

// @desc    Get my volunteer profile / status
// @route   GET /api/volunteer/me
export const getMyVolunteerProfile = async (req, res) => {
    try {
        const volunteer = await Volunteer.findOne({ user: req.user.id });
        if (!volunteer) {
            return res.status(404).json({ success: false, message: 'Volunteer profile not found' });
        }
        res.status(200).json({ success: true, data: volunteer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all volunteers
// @route   GET /api/volunteer
export const getAllVolunteers = async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};
        if (status) query.status = status;

        const volunteers = await Volunteer.find(query).populate('user', 'fullName email phone').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: volunteers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Approve volunteer request
// @route   PUT /api/volunteer/:id/approve
export const approveVolunteerRequest = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) return res.status(404).json({ success: false, message: 'Volunteer record not found' });

        volunteer.status = 'approved';
        volunteer.approvedBy = req.user.id;
        volunteer.approvedAt = new Date();
        await volunteer.save();

        // Sync role to user
        await User.findByIdAndUpdate(volunteer.user, { role: 'volunteer' });

        res.status(200).json({ success: true, message: 'Volunteer approved successfully', data: volunteer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Reject volunteer request
// @route   PUT /api/volunteer/:id/reject
export const rejectVolunteerRequest = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) return res.status(404).json({ success: false, message: 'Volunteer record not found' });

        volunteer.status = 'rejected';
        await volunteer.save();

        res.status(200).json({ success: true, message: 'Volunteer rejected successfully', data: volunteer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update volunteer skills
// @route   PUT /api/volunteer/me/skills
export const updateVolunteerSkills = async (req, res) => {
    try {
        const { skills, availability } = req.body;
        const volunteer = await Volunteer.findOneAndUpdate(
            { user: req.user.id },
            { skills, availability },
            { new: true, runValidators: true }
        );
        if (!volunteer) return res.status(404).json({ success: false, message: 'Volunteer profile not found' });
        res.status(200).json({ success: true, data: volunteer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

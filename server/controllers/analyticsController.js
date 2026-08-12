import User from '../models/User.js';
import Donation from '../models/Donation.js';
import Event from '../models/Event.js';
import Student from '../models/Student.js';

export const getDashboardStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalStudents,
            upcomingEvents,
            donationStats
        ] = await Promise.all([
            User.countDocuments({ isActive: true }),
            Student.countDocuments({ status: 'active' }),
            Event.countDocuments({ date: { $gte: new Date() }, status: { $ne: 'cancelled' } }),
            Donation.aggregate([
                { $match: { status: 'completed' } },
                { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
            ])
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalActiveUsers: totalUsers,
                totalActiveStudents: totalStudents,
                upcomingEvents: upcomingEvents,
                totalOnlineDonations: donationStats[0]?.totalAmount || 0,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error parsing dashboard stats', error: error.message });
    }
};

export const getFinancialChartData = async (req, res) => {
    try {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const monthlyDonations = await Donation.aggregate([
            {
                $match: {
                    status: 'completed',
                    createdAt: { $gte: oneYearAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        res.status(200).json({ success: true, data: monthlyDonations });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error parsing financial charts', error: error.message });
    }
};

export const getDemographicStats = async (req, res) => {
    try {
        const roleDistribution = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json({ success: true, data: { roles: roleDistribution } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error parsing demographics', error: error.message });
    }
};

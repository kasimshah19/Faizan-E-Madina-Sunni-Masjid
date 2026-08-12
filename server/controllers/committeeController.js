import CommitteeMember from '../models/CommitteeMember.js';
import User from '../models/User.js';
import { logAction } from '../services/auditLogService.js';

export const getMyCommitteeProfile = async (req, res) => {
    try {
        const committee = await CommitteeMember.findOne({ user: req.user.id });
        if (!committee) return res.status(404).json({ success: false, message: 'Committee profile not found' });
        res.status(200).json({ success: true, data: committee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllCommitteeMembers = async (req, res) => {
    try {
        const committees = await CommitteeMember.find().populate('user', 'fullName email phone designation');
        res.status(200).json({ success: true, data: committees });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const assignCommitteeMember = async (req, res) => {
    try {
        const { user: userId, designation, permissions } = req.body;

        let committee = await CommitteeMember.findOne({ user: userId });
        if (committee) {
            return res.status(400).json({ success: false, message: 'User is already a committee member' });
        }

        committee = await CommitteeMember.create({
            user: userId,
            designation,
            permissions: permissions || [],
            assignedBy: req.user.id
        });

        await User.findByIdAndUpdate(userId, { role: 'committee' });

        logAction({
            userId: req.user.id,
            action: 'COMMITTEE_MEMBER_ASSIGNED',
            module: 'Committee',
            targetId: userId,
            details: { designation, permissions: permissions || [] },
            req
        });

        res.status(201).json({ success: true, message: 'Committee member assigned', data: committee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateCommitteePermissions = async (req, res) => {
    try {
        const { permissions } = req.body;
        const committee = await CommitteeMember.findById(req.params.id);
        if (!committee) return res.status(404).json({ success: false, message: 'Committee member not found' });

        committee.permissions = permissions;
        await committee.save();

        logAction({
            userId: req.user.id,
            action: 'COMMITTEE_PERMISSIONS_UPDATED',
            module: 'Committee',
            targetId: committee.user,
            details: { newPermissions: permissions },
            req
        });

        res.status(200).json({ success: true, message: 'Permissions updated successfully', data: committee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeCommitteeMember = async (req, res) => {
    try {
        const committee = await CommitteeMember.findById(req.params.id);
        if (!committee) return res.status(404).json({ success: false, message: 'Committee member not found' });

        const userId = committee.user;
        await committee.deleteOne();

        await User.findByIdAndUpdate(userId, { role: 'member' });

        logAction({
            userId: req.user.id,
            action: 'COMMITTEE_MEMBER_REMOVED',
            module: 'Committee',
            targetId: userId,
            details: { designation: committee.designation },
            req
        });

        res.status(200).json({ success: true, message: 'Committee member removed successfully and reverted to member' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

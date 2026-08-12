import SystemSettings from '../models/SystemSettings.js';
import { logAction } from '../services/auditLogService.js';

export const getSettings = async (req, res) => {
    try {
        const settings = await SystemSettings.getSingleton();
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error fetching settings', error: error.message });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const settings = await SystemSettings.getSingleton();

        // Update fields dynamically based on request body
        const updates = req.body;
        for (const key of Object.keys(updates)) {
            if (key === 'socialLinks') {
                settings.socialLinks = { ...settings.socialLinks, ...updates.socialLinks };
            } else {
                settings[key] = updates[key];
            }
        }

        await settings.save();

        // Log the configuration change
        logAction({
            userId: req.user._id,
            action: 'SYSTEM_SETTINGS_UPDATED',
            module: 'System',
            targetId: settings._id,
            details: { updatedFields: Object.keys(updates) },
            req: req
        });

        res.status(200).json({ success: true, data: settings, message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error updating settings', error: error.message });
    }
};

import AuditLog from '../models/AuditLog.js';

/**
 * Reusable Audit Log Service
 * Caller should generally not await this (fire-and-forget) to avoid blocking the main execution.
 * 
 * @param {Object} params
 * @param {string} params.userId - The ID of the user performing the action (from req.user)
 * @param {string} params.action - Unified action name (e.g. 'USER_ROLE_CHANGED')
 * @param {string} params.module - The module relates to (e.g. 'Users', 'Events')
 * @param {string} [params.targetId] - ID of the record that was affected
 * @param {Object} [params.details] - Snapshot of changes or context
 * @param {Object} params.req - The Express request object to extract IP
 */
export const logAction = async ({ userId, action, module, targetId, details, req }) => {
    try {
        if (!userId || !action || !module) {
            console.warn('AuditLogService: Missing required fields (userId, action, module)');
            return;
        }

        const ipAddress = req?.ip || req?.headers?.['x-forwarded-for'] || null;

        await AuditLog.create({
            user: userId,
            action,
            module,
            targetId,
            details,
            ipAddress
        });
    } catch (error) {
        // Logging failures should NEVER break the main application flow
        console.error('AuditLogService Error: Failed to execute logAction', error);
    }
};

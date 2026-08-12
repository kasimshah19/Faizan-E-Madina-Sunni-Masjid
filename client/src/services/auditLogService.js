import axiosInstance from './axiosInstance';

const auditLogService = {
    getLogs: async (params) => {
        const response = await axiosInstance.get('/audit-logs', { params });
        return response.data;
    },
    getLogsForTarget: async (targetId) => {
        const response = await axiosInstance.get(`/audit-logs/target/${targetId}`);
        return response.data;
    },
    getLogById: async (id) => {
        const response = await axiosInstance.get(`/audit-logs/${id}`);
        return response.data;
    }
};

export default auditLogService;

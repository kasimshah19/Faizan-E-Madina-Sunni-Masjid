import axiosInstance from './axiosInstance';

const userService = {
    getAllUsers: async (params) => {
        const response = await axiosInstance.get('/users', { params });
        return response.data;
    },
    updateUserRole: async (userId, role) => {
        const response = await axiosInstance.put(`/users/${userId}/role`, { role });
        return response.data;
    },
    toggleUserStatus: async (userId) => {
        const response = await axiosInstance.patch(`/users/${userId}/toggle-active`);
        return response.data;
    },
    deleteUser: async (userId) => {
        const response = await axiosInstance.delete(`/users/${userId}`);
        return response.data;
    }
};

export default userService;


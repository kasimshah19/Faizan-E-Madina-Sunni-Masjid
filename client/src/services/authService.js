import axiosInstance from './axiosInstance';

const authService = {
    register: (data) => axiosInstance.post('/auth/register', data),
    verifyOtp: (data) => axiosInstance.post('/auth/verify-otp', data),
    resendOtp: (data) => axiosInstance.post('/auth/resend-otp', data),
    login: (data) => axiosInstance.post('/auth/login', data),
    logout: () => axiosInstance.post('/auth/logout'),
    refreshToken: () => axiosInstance.post('/auth/refresh-token'),
    forgotPassword: (data) => axiosInstance.post('/auth/forgot-password', data),
    resetPassword: (token, data) => axiosInstance.post(`/auth/reset-password/${token}`, data),
    getMe: () => axiosInstance.get('/auth/me'),
};

export default authService;

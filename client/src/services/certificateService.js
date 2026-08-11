import axiosInstance from './axiosInstance';

export const createCertificate = async (payload) => {
    const { data } = await axiosInstance.post('/certificate', payload);
    return data;
};

export const getCertificates = async () => {
    const { data } = await axiosInstance.get('/certificate');
    return data;
};

export const getMyCertificates = async () => {
    const { data } = await axiosInstance.get('/certificate/my');
    return data;
};

export const getCertificateById = async (id) => {
    const { data } = await axiosInstance.get(`/certificate/${id}`);
    return data;
};

export const verifyCertificate = async (certificateNumber) => {
    // Safe public endpoint
    const { data } = await axiosInstance.get(`/certificate/verify/${certificateNumber}`);
    return data; // contains valid, status, course, etc.
};

export const approveCertificate = async (id) => {
    const { data } = await axiosInstance.patch(`/certificate/${id}/approve`);
    return data;
};

export const issueCertificate = async (id) => {
    const { data } = await axiosInstance.patch(`/certificate/${id}/issue`);
    return data;
};

export const revokeCertificate = async (id) => {
    const { data } = await axiosInstance.patch(`/certificate/${id}/revoke`);
    return data;
};

// Returns a blob
export const downloadCertificatePdf = async (id) => {
    const response = await axiosInstance.get(`/certificate/${id}/download`, {
        responseType: 'blob'
    });
    return response.data;
};

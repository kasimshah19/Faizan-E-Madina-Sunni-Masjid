import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { getCertificates, approveCertificate, issueCertificate, revokeCertificate, downloadCertificatePdf } from '../../services/certificateService';
import toast from 'react-hot-toast';
import { HiOutlineCheckCircle, HiOutlineClock, HiOutlineDocumentDownload, HiOutlineXCircle } from 'react-icons/hi';

const CertificatesManage = () => {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCerts = async () => {
        try {
            const response = await getCertificates();
            setCerts(response.data);
        } catch (err) {
            toast.error('Failed to load certificates');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCerts();
    }, []);

    const handleAction = async (id, type) => {
        try {
            let promise;
            if (type === 'approve') promise = approveCertificate(id);
            if (type === 'issue') promise = issueCertificate(id);
            if (type === 'revoke') promise = revokeCertificate(id);

            await toast.promise(promise, {
                loading: 'Processing...',
                success: `Successfully updated certificate`,
                error: 'Action failed',
            });
            fetchCerts();
        } catch (e) {
            console.error(e);
        }
    };

    const handleDownload = async (id, number) => {
        try {
            toast.loading('Preparing PDF...', { id: 'pdf' });
            const blob = await downloadCertificatePdf(id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${number}.pdf`;
            a.click();
            toast.success('Downloaded!', { id: 'pdf' });
        } catch (e) {
            toast.error('Failed to download PDF', { id: 'pdf' });
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'issued': return <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs capitalize">{status}</span>;
            case 'pending': return <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-xs capitalize">{status}</span>;
            case 'approved': return <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-xs capitalize">{status}</span>;
            case 'revoked': return <span className="px-2 py-1 bg-red-500/10 text-red-500 rounded text-xs capitalize">{status}</span>;
            default: return null;
        }
    };

    return (
        <>
            <Helmet><title>Manage Certificates | Faizan E Madina</title></Helmet>

            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold font-heading text-primary-dark">Certificate Management</h1>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading records...</div>
                ) : (
                    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                                        <th className="p-4 font-semibold">Cert ID</th>
                                        <th className="p-4 font-semibold">Recipient</th>
                                        <th className="p-4 font-semibold">Type</th>
                                        <th className="p-4 font-semibold">Course</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {certs.length === 0 ? (
                                        <tr><td colSpan="6" className="text-center p-8 text-gray-400">No records found.</td></tr>
                                    ) : certs.map((cert) => (
                                        <tr key={cert._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-sm font-medium text-gray-900">{cert.certificateNumber}</td>
                                            <td className="p-4 text-sm text-gray-600">{cert.recipient?.fullName || cert.recipient?.name || 'Unknown'}</td>
                                            <td className="p-4 text-sm text-gray-600">{cert.certificateType}</td>
                                            <td className="p-4 text-sm text-gray-600">{cert.course?.name || '-'}</td>
                                            <td className="p-4 text-sm">{getStatusBadge(cert.status)}</td>
                                            <td className="p-4 flex gap-2 justify-end">

                                                {cert.status === 'pending' && (
                                                    <button onClick={() => handleAction(cert._id, 'approve')} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Approve">
                                                        <HiOutlineCheckCircle className="w-5 h-5" />
                                                    </button>
                                                )}

                                                {cert.status === 'approved' && (
                                                    <button onClick={() => handleAction(cert._id, 'issue')} className="p-2 text-green-600 hover:bg-green-50 rounded" title="Issue & Generate PDF">
                                                        <HiOutlineCheckCircle className="w-5 h-5" />
                                                    </button>
                                                )}

                                                {cert.status === 'issued' && (
                                                    <>
                                                        <button onClick={() => handleDownload(cert._id, cert.certificateNumber)} className="p-2 text-primary hover:bg-primary/10 rounded" title="Download PDF">
                                                            <HiOutlineDocumentDownload className="w-5 h-5" />
                                                        </button>
                                                        <button onClick={() => handleAction(cert._id, 'revoke')} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Revoke">
                                                            <HiOutlineXCircle className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                )}

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CertificatesManage;

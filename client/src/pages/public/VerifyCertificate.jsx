import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { verifyCertificate } from '../../services/certificateService';
import { HiCheckBadge, HiXCircle } from 'react-icons/hi2';

const VerifyCertificate = () => {
    const { certificateNumber } = useParams();
    const [loading, setLoading] = useState(true);
    const [certData, setCertData] = useState(null);
    const [errorStatus, setErrorStatus] = useState(null); // 'not_found' | 'revoked' | 'error'

    useEffect(() => {
        const fetchVerification = async () => {
            try {
                const response = await verifyCertificate(certificateNumber);
                if (response.success && response.data.valid) {
                    setCertData(response.data);
                } else {
                    setErrorStatus(response.data?.status === 'revoked' ? 'revoked' : 'error');
                }
            } catch (err) {
                if (err.response?.status === 404) {
                    setErrorStatus('not_found');
                } else if (err.response?.data?.data?.status === 'revoked') {
                    setErrorStatus('revoked');
                } else {
                    setErrorStatus('error');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchVerification();
    }, [certificateNumber]);

    return (
        <>
            <Helmet>
                <title>Verify Certificate | Faizan E Madina</title>
            </Helmet>

            <div className="min-h-[80vh] bg-bg-main relative py-20 px-4 flex items-center justify-center font-body">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-xl w-full bg-surface-dark border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl"
                >
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-4">
                            <div className="w-12 h-12 border-4 border-primary-light border-t-accent rounded-full animate-spin"></div>
                            <p className="text-[#F5F2E8]/60">Verifying authenticity...</p>
                        </div>
                    ) : certData ? (
                        <div className="text-center space-y-6">
                            <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                <HiCheckBadge className="w-12 h-12 text-green-500" />
                            </div>

                            <h1 className="text-3xl font-heading font-bold text-[#F5F2E8]">
                                Certificate Verified
                            </h1>
                            <p className="text-accent tracking-widest text-sm font-semibold uppercase">
                                Faizan E Madina Sunni Masjid
                            </p>

                            <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-left space-y-4 mt-6">
                                <div className="space-y-1">
                                    <span className="text-xs text-[#F5F2E8]/50 uppercase tracking-wider">Recipient Name</span>
                                    <p className="text-lg font-bold text-white">{certData.recipientName}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <span className="text-xs text-[#F5F2E8]/50 uppercase tracking-wider">Certificate Type</span>
                                        <p className="text-sm font-medium text-white">{certData.certificateType}</p>
                                    </div>
                                    {certData.courseName && (
                                        <div className="space-y-1">
                                            <span className="text-xs text-[#F5F2E8]/50 uppercase tracking-wider">Course/Program</span>
                                            <p className="text-sm font-medium text-white">{certData.courseName}</p>
                                        </div>
                                    )}
                                    <div className="space-y-1">
                                        <span className="text-xs text-[#F5F2E8]/50 uppercase tracking-wider">Issue Date</span>
                                        <p className="text-sm font-medium text-white">
                                            {new Date(certData.issuedDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-xs text-[#F5F2E8]/50 uppercase tracking-wider">Status</span>
                                        <div className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold capitalize">
                                            {certData.status}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <p className="text-xs text-[#F5F2E8]/40">Certificate ID: {certData.certificateNumber}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                                <HiXCircle className="w-12 h-12 text-red-500" />
                            </div>

                            <h1 className="text-3xl font-heading font-bold text-[#F5F2E8]">
                                {errorStatus === 'revoked' ? 'Certificate Revoked' : 'Certificate Not Found'}
                            </h1>

                            <p className="text-[#F5F2E8]/60 mt-4 text-sm leading-relaxed">
                                {errorStatus === 'revoked'
                                    ? 'This certificate has been officially revoked by the faizan E Madina administration and is no longer valid.'
                                    : 'We could not find a valid certificate matching this exact ID. Please ensure the QR code was scanned correctly or the URL is exact.'}
                            </p>

                            <div className="pt-8">
                                <Link to="/" className="inline-block px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-light text-white transition-colors duration-200">
                                    Return to Homepage
                                </Link>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export default VerifyCertificate;

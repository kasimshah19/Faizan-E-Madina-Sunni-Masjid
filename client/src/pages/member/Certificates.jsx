import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getMyCertificates, downloadCertificatePdf } from '../../services/certificateService';
import toast from 'react-hot-toast';
import { HiOutlineDocumentText, HiOutlineDownload } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCerts = async () => {
      try {
        const res = await getMyCertificates();
        setCerts(res.data);
      } catch (e) {
        toast.error('Failed to load certificates');
      } finally {
        setLoading(false);
      }
    };
    fetchMyCerts();
  }, []);

  const handleDownload = async (id, number) => {
    try {
      toast.loading('Preparing PDF...', { id: 'pdf-dl' });
      const blob = await downloadCertificatePdf(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${number}.pdf`;
      a.click();
      toast.success('Downloaded!', { id: 'pdf-dl' });
    } catch (e) {
      toast.error('Download blocked. Certificate might not be ready.', { id: 'pdf-dl' });
    }
  };

  return (
    <>
      <Helmet><title>My Certificates | Member Dashboard</title></Helmet>

      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary-dark">My Achievements</h1>
          <p className="text-gray-600 mt-2 text-sm">View and download your official Faizan E Madina certificates.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
        ) : certs.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-100 shadow-sm rounded-xl">
            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <HiOutlineDocumentText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No Certificates Found</h3>
            <p className="text-gray-500 mt-1">You haven't been issued any certificates yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certs.map(cert => (
              <motion.div
                whileHover={{ y: -4 }}
                key={cert._id}
                className="bg-white rounded-xl shadow-md border-l-4 border-l-primary overflow-hidden relative"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider">{cert.certificateType}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1">{cert.title}</h3>
                    </div>
                    {cert.status === 'issued' && (
                      <span className="inline-flex bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full text-xs font-medium capitalize">
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-6 text-sm text-gray-600">
                    <p><span className="font-medium text-gray-900">Course:</span> {cert.course?.name || '-'}</p>
                    <p><span className="font-medium text-gray-900">Completion:</span> {new Date(cert.completionDate).toLocaleDateString()}</p>
                    <p><span className="font-medium text-gray-900">Cert ID:</span> {cert.certificateNumber}</p>
                  </div>

                  {cert.status === 'issued' ? (
                    <button
                      onClick={() => handleDownload(cert._id, cert.certificateNumber)}
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-lg py-2.5 transition-colors font-medium text-sm"
                    >
                      <HiOutlineDownload className="w-5 h-5" /> Download PDF
                    </button>
                  ) : (
                    <button disabled className="w-full bg-gray-100 text-gray-400 cursor-not-allowed rounded-lg py-2.5 font-medium text-sm flex items-center justify-center gap-2">
                      Processing ({cert.status})
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Certificates;

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { verifyCertificate } from '../../services/certificateService';
import { HiCheckBadge, HiXCircle } from 'react-icons/hi2';
import { FiArrowLeft, FiCheckCircle, FiShield } from 'react-icons/fi';

const LOGO_SRC = '/faizan-logo.png';

const VerifyCertificate = () => {
  const { certificateNumber } = useParams();

  const [loading, setLoading] = useState(true);
  const [certData, setCertData] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVerification = async () => {
      try {
        const response = await verifyCertificate(certificateNumber);

        if (!isMounted) return;

        if (response.success && response.data.valid) {
          setCertData(response.data);
        } else {
          setErrorStatus(
            response.data?.status === 'revoked' ? 'revoked' : 'error',
          );
        }
      } catch (err) {
        if (!isMounted) return;

        if (err.response?.status === 404) {
          setErrorStatus('not_found');
        } else if (err.response?.data?.data?.status === 'revoked') {
          setErrorStatus('revoked');
        } else {
          setErrorStatus('error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchVerification();

    return () => {
      isMounted = false;
    };
  }, [certificateNumber]);

  const isRevoked = errorStatus === 'revoked';

  return (
    <>
      <Helmet>
        <title>Verify Certificate | Faizan E Madina</title>
        <meta
          name="description"
          content="Verify the authenticity of a Faizan E Madina Sunni Masjid certificate."
        />
      </Helmet>

      <main className="min-h-screen overflow-hidden bg-[#f7f8f4] text-[#163c31] dark:bg-slate-950 dark:text-white">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-950/25" />
          <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-950/15" />
        </div>

        <div className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            {/* Brand */}
            <div className="mb-7 text-center">
              <Link
                to="/"
                aria-label="Faizan E Madina Sunni Masjid home"
                className="inline-flex items-center justify-center"
              >
                <span className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-[22px] border border-[#dbe8e2] bg-white p-1.5 shadow-[0_14px_38px_rgba(13,106,77,0.12)] dark:border-slate-700 dark:bg-slate-900">
                  <img
                    src={LOGO_SRC}
                    alt="Faizan E Madina Sunni Masjid"
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-white bg-[#d7b557] dark:border-slate-900" />
                </span>
              </Link>

              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0d6a4d] dark:text-emerald-300">
                Certificate Verification
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#143e31] sm:text-3xl dark:text-white">
                Faizan E Madina Sunni Masjid
              </h1>

              <p className="mt-2 text-sm text-[#74827c] dark:text-slate-400">
                Verify the authenticity of an issued certificate.
              </p>
            </div>

            {/* Main Card */}
            <div className="overflow-hidden rounded-[30px] border border-[#dfe9e4] bg-white shadow-[0_24px_70px_rgba(15,81,50,0.09)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
              {loading ? (
                <div className="px-6 py-16 text-center sm:px-10">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#edf6f1] dark:bg-emerald-950/45">
                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#dce9e2] border-t-[#0d6a4d] dark:border-slate-700 dark:border-t-emerald-400" />
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-[#183e31] dark:text-white">
                    Verifying certificate
                  </h2>

                  <p className="mt-2 text-sm text-[#78847f] dark:text-slate-400">
                    Please wait while we verify the certificate details.
                  </p>
                </div>
              ) : certData ? (
                <div>
                  {/* Success Banner */}
                  <div className="bg-gradient-to-r from-[#0a4e3b] to-[#0d6a4d] px-6 py-8 text-center text-white sm:px-10">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                      <HiCheckBadge className="h-10 w-10 text-[#e0c264]" />
                    </div>

                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100">
                      Authentic Certificate
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                      Certificate Verified
                    </h2>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-emerald-50">
                      <FiShield className="text-[#e0c264]" />
                      Verified by Faizan E Madina
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-6 sm:p-8">
                    <div className="rounded-2xl border border-[#e3ebe6] bg-[#f8faf8] p-5 dark:border-slate-800 dark:bg-slate-950/60">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b8781] dark:text-slate-500">
                          Recipient Name
                        </span>

                        <p className="mt-2 text-xl font-bold text-[#173e31] sm:text-2xl dark:text-white">
                          {certData.recipientName}
                        </p>
                      </div>

                      <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b8781] dark:text-slate-500">
                            Certificate Type
                          </span>
                          <p className="mt-1.5 text-sm font-semibold text-[#344f45] dark:text-slate-200">
                            {certData.certificateType}
                          </p>
                        </div>

                        {certData.courseName && (
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b8781] dark:text-slate-500">
                              Course / Program
                            </span>
                            <p className="mt-1.5 text-sm font-semibold text-[#344f45] dark:text-slate-200">
                              {certData.courseName}
                            </p>
                          </div>
                        )}

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b8781] dark:text-slate-500">
                            Issue Date
                          </span>
                          <p className="mt-1.5 text-sm font-semibold text-[#344f45] dark:text-slate-200">
                            {new Date(certData.issuedDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b8781] dark:text-slate-500">
                            Status
                          </span>

                          <div className="mt-1.5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold capitalize text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                            <FiCheckCircle />
                            {certData.status}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 border-t border-[#e7ece9] pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b8781] dark:text-slate-500">
                          Certificate ID
                        </p>
                        <p className="mt-1 break-all text-xs font-semibold text-[#385348] dark:text-slate-300">
                          {certData.certificateNumber}
                        </p>
                      </div>

                      <Link
                        to="/"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#dce7e1] bg-white px-4 text-sm font-bold text-[#486057] transition hover:border-[#b8d6c8] hover:bg-[#f5faf7] hover:text-[#0d6a4d] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-900 dark:hover:text-emerald-300"
                      >
                        <FiArrowLeft />
                        Back to Homepage
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-12 text-center sm:px-10 sm:py-14">
                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                      isRevoked
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/35 dark:text-amber-300'
                        : 'bg-red-100 text-red-600 dark:bg-red-950/35 dark:text-red-300'
                    }`}
                  >
                    <HiXCircle className="h-10 w-10" />
                  </div>

                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7c8882] dark:text-slate-500">
                    Verification Result
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-[#183e31] sm:text-3xl dark:text-white">
                    {isRevoked ? 'Certificate Revoked' : 'Certificate Not Found'}
                  </h2>

                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#728079] dark:text-slate-400">
                    {isRevoked
                      ? 'This certificate has been officially revoked by the Faizan E Madina administration and is no longer valid.'
                      : 'We could not find a valid certificate matching this exact ID. Please ensure the QR code was scanned correctly or that the URL is exact.'}
                  </p>

                  <Link
                    to="/"
                    className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0d6a4d] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0a5a41] dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  >
                    <FiArrowLeft />
                    Return to Homepage
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default VerifyCertificate;
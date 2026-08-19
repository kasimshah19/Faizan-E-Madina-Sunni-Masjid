import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';

const ServerError = () => {
  return (
    <>
      <Helmet>
        <title>Server Error — Faizan E Madina Sunni Masjid</title>
      </Helmet>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f7f8f4] dark:bg-slate-950 px-4">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-danger-50 to-warning-50 blur-3xl dark:from-red-950/30 dark:to-orange-950/20" />
          <div className="absolute -bottom-20 -left-20 h-[340px] w-[340px] rounded-full bg-gradient-to-tr from-warning-50 to-primary-50 blur-3xl dark:from-orange-950/20 dark:to-primary-900/10" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md bg-[var(--color-surface)] p-8 sm:p-10 rounded-3xl shadow-lg border border-[var(--color-border)] text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-950/50 dark:to-red-950/50 rounded-2xl flex items-center justify-center text-orange-500 dark:text-orange-400 mb-6 shadow-sm"
          >
            <HiOutlineExclamationCircle size={40} />
          </motion.div>

          {/* Error code */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-sm font-semibold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-2"
          >
            Error 500
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-heading font-bold text-ink dark:text-white mb-3"
          >
            Internal Server Error
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-[var(--color-text-secondary)] font-body mb-8 leading-relaxed"
          >
            Something went wrong on our end. Our team has been notified and is working on a fix. Please try again in a few moments.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              Try Again
            </button>
            <Link to="/">
              <Button variant="secondary" className="w-full sm:w-auto">
                Return Home
              </Button>
            </Link>
          </motion.div>

          {/* Decorative mosque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <span className="text-4xl opacity-15 dark:opacity-10 select-none" aria-hidden="true">
              🕌
            </span>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ServerError;

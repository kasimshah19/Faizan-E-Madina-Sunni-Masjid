import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found — Faizan E Madina Sunni Masjid</title>
      </Helmet>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f7f8f4] dark:bg-slate-950 px-4">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0">
          {/* Gradient orb top-right */}
          <div className="absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-primary-200/40 to-accent-200/20 blur-3xl dark:from-primary-800/20 dark:to-accent-800/10" />
          {/* Gradient orb bottom-left */}
          <div className="absolute -bottom-28 -left-28 h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-accent-200/30 to-primary-100/20 blur-3xl dark:from-accent-900/15 dark:to-primary-900/10" />
          {/* Subtle geometric pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230D6A4D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-lg mx-auto">
          {/* Large 404 number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-heading text-[8rem] sm:text-[10rem] font-bold leading-none tracking-tighter bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent select-none">
              404
            </h1>
          </motion.div>

          {/* Divider accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
          />

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink dark:text-white mb-3">
              Page Not Found
            </h2>
            <p className="text-base text-muted dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              The page you are looking for might have been moved, renamed, or doesn't exist anymore.
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary-600/25 active:translate-y-0"
            >
              <FiHome className="text-base" />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold text-ink dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            >
              <FiArrowLeft className="text-base" />
              Go Back
            </button>
          </motion.div>

          {/* Mosque emoji as decorative element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <span className="text-5xl opacity-20 dark:opacity-10 select-none" aria-hidden="true">
              🕌
            </span>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

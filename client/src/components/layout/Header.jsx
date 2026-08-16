import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX, HiMoon, HiSun } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Prayer Times', path: '/prayer-times' },
  { name: 'Events', path: '/events' },
  { name: 'Education', path: '/education' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Donate', path: '/donate' },
  { name: 'Contact', path: '/contact' },
];

const LOGO_SRC = '/faizan-logo.png';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    if (isMobileMenuOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    [
      'relative inline-flex items-center justify-center rounded-full',
      'px-3.5 py-2.5 text-[13px] font-semibold',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d6a4d]/30',
      isActive
        ? 'bg-[#edf8f3] text-[#0d6a4d] after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:rounded-full after:bg-[#0d6a4d] dark:bg-emerald-950/60 dark:text-emerald-300 dark:after:bg-emerald-400'
        : 'text-[#586a63] hover:bg-[#f5f8f5] hover:text-[#0d6a4d] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-300',
    ].join(' ');

  const mobileNavLinkClass = ({ isActive }) =>
    [
      'flex min-h-12 items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold',
      'transition-colors duration-200',
      isActive
        ? 'bg-[#edf8f3] text-[#0d6a4d] dark:bg-emerald-950/60 dark:text-emerald-300'
        : 'text-[#455850] hover:bg-[#f5f8f5] dark:text-slate-200 dark:hover:bg-slate-800',
    ].join(' ');

  return (
    <>
      <header className="sticky top-0 z-[60] w-full border-b border-[#e6ebe7] bg-white/95 shadow-[0_4px_20px_rgba(15,61,46,0.05)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto w-full max-w-[1480px] px-3 sm:px-5 lg:px-8 xl:px-10">
          <div className="flex h-[68px] items-center justify-between gap-3 lg:h-[76px]">

            {/* BRAND */}
            <Link
              to="/"
              onClick={closeMenu}
              aria-label="Faizan E Madina Sunni Masjid home"
              className="group flex min-w-0 shrink-0 items-center gap-3 rounded-2xl px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d6a4d]/30"
            >
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(12,65,48,0.12)] ring-1 ring-[#dce7e1] dark:bg-slate-900 dark:ring-slate-700">
                <img
                  src={LOGO_SRC}
                  alt="Faizan E Madina Sunni Masjid"
                  className="h-full w-full object-contain p-0.5"
                />
              </span>

              <span className="min-w-0 leading-none">
                <span className="block truncate font-heading text-[15px] font-bold tracking-tight text-[#173d31] group-hover:text-[#0d6a4d] dark:text-white dark:group-hover:text-emerald-300">
                  Faizan E Madina
                </span>
                <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-[#7a8781] dark:text-slate-400">
                  Sunni Masjid
                </span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center">
              <div className="flex items-center gap-0.5 xl:gap-1">
                {NAV_LINKS.map((link) => (
                  <NavLink key={link.path} to={link.path} className={navLinkClass}>
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                aria-pressed={theme === 'dark'}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e7e3] bg-white text-[#334b42] shadow-sm transition hover:border-[#b8d6c8] hover:bg-[#f3f9f5] hover:text-[#0d6a4d] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
              >
                {theme === 'dark' ? <HiSun size={18} /> : <HiMoon size={18} />}
              </button>

              <Link
                to="/login"
                className="inline-flex h-10 items-center justify-center rounded-full border border-[#dfe7e2] bg-white px-4 text-[13px] font-semibold text-[#40544c] transition hover:border-[#b8d6c8] hover:bg-[#f5faf7] hover:text-[#0d6a4d] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#0d6a4d] px-4 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(13,106,77,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0a5941] dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                Register
              </Link>
            </div>

            {/* MOBILE ACTIONS */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                aria-pressed={theme === 'dark'}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e7e3] bg-white text-[#334b42] shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {theme === 'dark' ? <HiSun size={18} /> : <HiMoon size={18} />}
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e7e3] bg-white text-[#334b42] shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {isMobileMenuOpen ? <HiX size={21} /> : <HiMenu size={21} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] lg:hidden"
            />

            <motion.aside
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-x-3 top-[76px] z-50 overflow-hidden rounded-[26px] border border-[#e2e9e5] bg-white shadow-[0_24px_70px_rgba(15,61,46,0.18)] lg:hidden dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="max-h-[calc(100vh-94px)] overflow-y-auto p-3 sm:p-4">
                <div className="rounded-2xl border border-[#dce9e2] bg-gradient-to-br from-[#edf8f3] via-white to-[#fff9ea] p-4 dark:border-slate-800 dark:from-emerald-950/45 dark:via-slate-900 dark:to-amber-950/20">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 shadow-sm dark:bg-slate-900">
                      <img src={LOGO_SRC} alt="Faizan E Madina logo" className="h-full w-full object-contain" />
                    </span>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0d6a4d] dark:text-emerald-300">
                        Faizan E Madina
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#23483b] dark:text-white">
                        Sunni Masjid
                      </p>
                    </div>
                  </div>
                </div>

                <nav aria-label="Mobile navigation" className="mt-3 space-y-1.5">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={closeMenu}
                      className={mobileNavLinkClass}
                    >
                      <span>{link.name}</span>
                      <span aria-hidden="true">›</span>
                    </NavLink>
                  ))}
                </nav>

                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#e6ebe7] pt-3 dark:border-slate-800">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-[#dfe7e2] bg-white text-sm font-semibold text-[#52645d] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0d6a4d] text-sm font-bold text-white dark:bg-emerald-600"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
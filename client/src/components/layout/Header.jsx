import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX, HiMoon, HiSun } from 'react-icons/hi';
import { FaMosque } from 'react-icons/fa6';
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

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `relative text-sm transition-colors duration-200 hover:text-primary ${isActive
      ? 'text-[var(--color-text-primary)] font-semibold after:content-[""] after:absolute after:-bottom-[6px] after:left-0 after:w-full after:h-[2px] after:bg-primary'
      : 'text-[var(--color-text-secondary)] font-medium'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-md text-base font-medium transition-colors ${isActive
      ? 'bg-primary/10 text-primary font-semibold'
      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-surface)] shadow-sm border-b border-[var(--color-border)] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
        <div className="flex justify-between items-center h-[76px]">

          {/* 1. Logo block (far left) */}
          <Link to="/" className="flex items-center gap-[10px] flex-shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
              <FaMosque size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-[17px] leading-[1.2] text-[var(--color-text-primary)] group-hover:text-primary transition-colors">
                Faizan E Madina
              </span>
              <span className="font-body text-[12px] leading-tight text-[var(--color-text-secondary)] font-normal">
                Sunni Masjid
              </span>
            </div>
          </Link>

          {/* 2. Navigation links (center) */}
          <nav className="hidden lg:flex items-center gap-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.path} to={link.path} className={navLinkClass}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* 3. Right side controls (far right) */}
          <div className="hidden lg:flex items-center gap-x-[14px]">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-[var(--color-surface-hover)] transition-colors text-[var(--color-text-primary)] flex items-center justify-center w-10 h-10"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />}
            </button>

            <Link to="/login" className="flex items-center">
              <button className="rounded-full border border-gray-300 dark:border-gray-600 bg-transparent px-[20px] py-[9px] text-[14px] font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors flex items-center justify-center leading-none">
                Login
              </button>
            </Link>
            <Link to="/register" className="flex items-center">
              <button className="rounded-full bg-[var(--color-primary)] px-[20px] py-[9px] text-[14px] font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center leading-none">
                Register
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-[var(--color-surface-hover)] transition-colors text-[var(--color-text-primary)] flex items-center justify-center w-10 h-10"
            >
              {theme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 sm:px-6">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-4 pb-2 border-t border-[var(--color-border)] flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full rounded-full border border-gray-300 dark:border-gray-600 bg-transparent px-[20px] py-[10px] text-[14px] font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full rounded-full bg-[var(--color-primary)] px-[20px] py-[10px] text-[14px] font-bold text-white hover:opacity-90 transition-opacity">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

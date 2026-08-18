import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCalendar, FiClock, FiHeart } from 'react-icons/fi';
import {
  FaFacebookF,
  FaInstagram,
  FaMosque,
  FaYoutube,
} from 'react-icons/fa';

const LOGO_SRC = '/faizan-logo.png';

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Prayer Times', path: '/prayer-times' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

const IMPORTANT_LINKS = [
  { label: 'Donate Now', path: '/donate' },
  { label: 'Islamic Education', path: '/education' },
  { label: 'Volunteer', path: '/volunteer' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'FAQs', path: '/faq' },
];

const PRAYER_TIMES = [
  ['Fajr', '04:25 AM'],
  ['Zuhr', '12:45 PM'],
  ['Asr', '04:30 PM'],
  ['Maghrib', '07:05 PM'],
  ['Isha', '08:35 PM'],
  ['Jummah', '01:30 PM'],
];

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: <FaFacebookF />, href: '#' },
  { label: 'Instagram', icon: <FaInstagram />, href: '#' },
  { label: 'YouTube', icon: <FaYoutube />, href: '#' },
];

const Footer = () => {
  return (
    <footer className="bg-[#063428] text-white">
      <div className="mx-auto max-w-[1480px] px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_.9fr_1fr]">
          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label="Faizan E Madina Sunni Masjid home"
            >
              <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-lg">
                <img
                  src={LOGO_SRC}
                  alt="Faizan E Madina Sunni Masjid"
                  className="h-full w-full object-contain"
                />
              </span>

              <span>
                <span className="block text-base font-bold tracking-tight">
                  Faizan E Madina
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-100">
                  Sunni Masjid
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-emerald-100">
              A place of peace, knowledge, and community. Join us in worship,
              learn, and serve humanity.
            </p>

            <div className="mt-6 flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-emerald-100 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#063428]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Quick Links
            </h3>

            <div className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group flex items-center gap-1 text-sm text-emerald-100 transition hover:text-white"
                >
                  <span>{link.label}</span>
                  <FiArrowUpRight className="text-xs opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* IMPORTANT LINKS */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Important Links
            </h3>

            <div className="mt-4 space-y-2.5">
              {IMPORTANT_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group flex items-center gap-1 text-sm text-emerald-100 transition hover:text-white"
                >
                  <span>{link.label}</span>
                  <FiArrowUpRight className="text-xs opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* PRAYER TIMES */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Prayer Times
            </h3>

            <div className="mt-4 space-y-2.5">
              {PRAYER_TIMES.map(([name, time]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-4 text-sm text-emerald-100"
                >
                  <span>{name}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>

            <Link
              to="/prayer-times"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#e0bf57] hover:text-[#eed788]"
            >
              View full timetable
              <FiArrowUpRight />
            </Link>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
          <Link
            to="/donate"
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d7b557] text-[#173d31]">
                <FiHeart />
              </span>
              <div>
                <p className="text-sm font-bold">Support Our Masjid</p>
                <p className="mt-1 text-xs text-emerald-100">
                  Help us continue serving the community.
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/events"
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-emerald-100">
                <FiCalendar />
              </span>
              <div>
                <p className="text-sm font-bold">Join Community Events</p>
                <p className="mt-1 text-xs text-emerald-100">
                  Stay connected with upcoming programs.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs text-emerald-200 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Faizan E Madina Sunni Masjid. All rights reserved.</p>
          <p>
            Built with <span className="text-red-400">♥</span> for the community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
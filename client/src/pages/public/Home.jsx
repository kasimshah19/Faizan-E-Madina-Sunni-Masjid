import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiHeart,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMoon,
  FiPhone,
  FiPlayCircle,
  FiSend,
  FiShield,
  FiUsers,
  FiYoutube,
} from 'react-icons/fi';
import {
  FaFacebookF,
  FaHandsHelping,
  FaLightbulb,
  FaQuran,
  FaWater,
} from 'react-icons/fa';

import PrayerCountdown from '../../components/ui/PrayerCountdown';
import heroImage from '../../assets/images/Home.jpeg';

/*
 * Local media files used by the Home page.
 *
 * Put the files in:
 *   client/public/videos/
 *   client/public/images/events/
 *   client/public/images/gallery/
 *
 * Video:
 *   /videos/masjid-tour.mp4
 *
 * Event images:
 *   jummah-bayan.jpg
 *   eid-prayer.jpg
 *   quran-competition.jpg
 *   ramadan-iftar.jpg
 *   islamic-conference.jpg
 *
 * Gallery images:
 *   main-hall.jpg
 *   exterior.jpg
 *   minarets.jpg
 *   courtyard.jpg
 *   night-view.jpg
 *   interior.jpg
 */
const ABOUT_VIDEO_SRC = '/videos/masjid-tour.mp4';
const ABOUT_VIDEO_POSTER = heroImage;

const BRANDING_LOGO = '/faizan-logo.png';

const FEATURES = [
  {
    icon: <FiClock />,
    title: 'Prayer Times',
    desc: 'Daily salah timings',
    to: '/prayer-times',
  },
  {
    icon: <FiCalendar />,
    title: 'Community Events',
    desc: 'Gather, learn & connect',
    to: '/events',
  },
  {
    icon: <FiHeart />,
    title: 'Online Donations',
    desc: 'Support a good cause',
    to: '/donate',
  },
  {
    icon: <FiBookOpen />,
    title: 'Islamic Education',
    desc: 'Learn & grow in knowledge',
    to: '/education',
  },
  {
    icon: <FiUsers />,
    title: 'Volunteer',
    desc: 'Serve the community',
    to: '/volunteer',
  },
  {
    icon: <FiPhone />,
    title: 'Contact Us',
    desc: 'We are here to help',
    to: '/contact',
  },
];

const PRAYER_TIMES = [
  { name: 'Fajr', time: '04:25 AM', icon: <FiMoon /> },
  { name: 'Zuhr', time: '12:45 PM', active: true, icon: <FiMoon /> },
  { name: 'Asr', time: '04:30 PM', icon: <FiMoon /> },
  { name: 'Maghrib', time: '07:05 PM', icon: <FiMoon /> },
  { name: 'Isha', time: '08:35 PM', icon: <FiMoon /> },
  { name: 'Jummah', time: '01:30 PM', icon: <FiMoon /> },
];

const SUPPORT_CATEGORIES = [
  { icon: <FaQuran />, name: 'Zakat' },
  { icon: <FaHandsHelping />, name: 'Sadaqah' },
  { icon: <span className="font-bold">مسجد</span>, name: 'Construction' },
  { icon: <FaLightbulb />, name: 'Electricity' },
  { icon: <FaWater />, name: 'Water' },
  { icon: <FiBookOpen />, name: 'Madrasa' },
  { icon: <FiMoon />, name: 'Ramadan' },
  { icon: <FiHeart />, name: 'General' },
];

const EVENTS = [
  {
    title: 'Jummah Bayan',
    date: '31 May 2024',
    time: '12:00 PM',
    location: 'Main Hall',
    image: '/images/events/jummah-bayan.jpg',
  },
  {
    title: 'Eid Prayer',
    date: '10 June 2024',
    time: '06:30 AM',
    location: 'Masjid Ground',
    image: '/images/events/eid-prayer.jpg',
  },
  {
    title: 'Quran Competition',
    date: '15 June 2024',
    time: '10:00 AM',
    location: 'Community Hall',
    image: '/images/events/quran-competition.jpg',
  },
  {
    title: 'Ramadan Iftar',
    date: '20 March 2025',
    time: '06:30 PM',
    location: 'Masjid Ground',
    image: '/images/events/ramadan-iftar.jpg',
  },
  {
    title: 'Islamic Conference',
    date: '05 July 2024',
    time: '09:00 AM',
    location: 'Conference Hall',
    image: '/images/events/islamic-conference.jpg',
  },
];

const GALLERY_IMAGES = [
  { title: 'Main Hall', image: '/images/gallery/main-hall.jpg' },
  { title: 'Exterior', image: '/images/gallery/exterior.jpg' },
  { title: 'Minarets', image: '/images/gallery/minarets.jpg' },
  { title: 'Courtyard', image: '/images/gallery/courtyard.jpg' },
  { title: 'Night View', image: '/images/gallery/night-view.jpg' },
  { title: 'Interior', image: '/images/gallery/interior.jpg' },
];

const TESTIMONIALS = [
  {
    name: 'Ahmed Khan',
    role: 'Community Member',
    rating: 5,
    text: 'A beautiful masjid with a peaceful environment. The community here is very supportive and welcoming.',
    initials: 'AK',
  },
  {
    name: 'Fatima Shah',
    role: 'Student',
    rating: 5,
    text: 'Islamic lessons and events here have improved my understanding of Islam and brought our family closer together.',
    initials: 'FS',
  },
  {
    name: 'Usman Ansari',
    role: 'Volunteer',
    rating: 5,
    text: 'Excellent management and a transparent donation system. May Allah reward the entire committee for their efforts.',
    initials: 'UA',
  },
  {
    name: 'Yusuf Malik',
    role: 'Community Member',
    rating: 5,
    text: 'The Jummah khutbahs are always thoughtful and the volunteers make every visitor feel at home.',
    initials: 'YM',
  },
  {
    name: 'Ayesha Siddiqui',
    role: 'Parent',
    rating: 5,
    text: 'A safe and nurturing place for our children to learn the Quran. We are grateful for this masjid.',
    initials: 'AS',
  },
];

const STATS = [
  { value: '1,248+', label: 'Members', icon: <FiUsers /> },
  { value: '₹48,750+', label: 'Total Donations', icon: <FiHeart /> },
  { value: '24+', label: 'Events', icon: <FiCalendar /> },
  { value: '156+', label: 'Volunteers', icon: <FaHandsHelping /> },
  { value: '320+', label: 'Students', icon: <FiBookOpen /> },
  { value: '18+', label: 'Teachers', icon: <FiCheckCircle /> },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: <FaFacebookF />, href: '#' },
  { label: 'Instagram', icon: <FiInstagram />, href: '#' },
  { label: 'YouTube', icon: <FiYoutube />, href: '#' },
];

const CONTACT_INFO = {
  address: '123 Masjid Street, Your City',
  phone: '+123 456 7890',
  email: 'info@faizanemadina.org',
};

const containerClass = 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 xl:px-10';

const sectionTitle =
  'text-2xl font-bold tracking-tight text-[#123e30] sm:text-3xl lg:text-[2rem] dark:text-white';

const sectionDescription =
  'mt-3 max-w-2xl text-sm leading-7 text-[#6f7d77] sm:text-base dark:text-slate-400';

const cardClass =
  'rounded-[28px] border border-[#e4ebe7] bg-white shadow-[0_12px_40px_rgba(16,81,50,0.06)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(0,0,0,0.18)]';

const BrandMark = ({ size = 'md', showText = false, className = '' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={BRANDING_LOGO}
        alt="Faizan E Madina logo"
        className={`${sizes[size]} shrink-0 rounded-xl object-cover shadow-sm`}
      />
      {showText && (
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-[#123e30] dark:text-white sm:text-base">
            Faizan E Madina
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#718079] dark:text-slate-500">
            Sunni Masjid
          </p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const submitTimerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      if (submitTimerRef.current) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const countdownTarget = useMemo(
    () => Date.now() + 85 * 60 * 1000,
    [],
  );

  const visibleTestimonials = useMemo(
    () =>
      [0, 1, 2].map(
        (offset) =>
          TESTIMONIALS[(testimonialIndex + offset) % TESTIMONIALS.length],
      ),
    [testimonialIndex],
  );

  const nextTestimonial = () => {
    setTestimonialIndex(
      (previous) => (previous + 1) % TESTIMONIALS.length,
    );
  };

  const previousTestimonial = () => {
    setTestimonialIndex(
      (previous) =>
        (previous - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;

    setContactForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    submitTimerRef.current = window.setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8f4] text-[#163c31] dark:bg-slate-950 dark:text-white">
      {/* ========================= HERO ========================= */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fffdf7]/98 via-[#fffdf7]/88 to-[#fffdf7]/20 dark:from-slate-950/97 dark:via-slate-950/88 dark:to-slate-950/35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(255,255,255,0.65),transparent_29%)] dark:bg-[radial-gradient(circle_at_78%_45%,rgba(13,106,77,0.30),transparent_30%)]" />
        </div>

        <div className={`${containerClass} relative pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28`}>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] xl:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3">
                <BrandMark size="sm" />
                <span className="hidden text-[10px] font-bold uppercase tracking-[0.22em] text-[#527268] sm:block dark:text-emerald-300">
                  Welcome to Faizan E Madina
                </span>
              </div>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#d9e6df] bg-white/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1b6a50] shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-[#d5ad39]" />
                A place of peace, knowledge & community
              </div>

              <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,6.2rem)] font-bold leading-[0.94] tracking-tight text-[#07563f] dark:text-white">
                Faizan E Madina
                <span className="block">Sunni Masjid</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#53665f] sm:text-lg dark:text-slate-300">
                A welcoming place to worship, learn, connect and serve
                humanity through faith, education and community.
              </p>

              <div className="mt-7 max-w-2xl rounded-[26px] border border-[#e8d7a8] bg-white/65 p-5 shadow-sm backdrop-blur-md sm:p-6 dark:border-amber-900/50 dark:bg-slate-900/65">
                <p
                  dir="rtl"
                  className="font-arabic text-2xl font-bold leading-relaxed text-[#0c5a43] sm:text-3xl dark:text-emerald-300"
                >
                  وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ
                </p>

                <p className="mt-2 text-xs leading-5 text-[#61716b] sm:text-sm dark:text-slate-400">
                  “And who is better in speech than one who invites to Allah.”
                  <span className="font-semibold"> — Quran 41:33</span>
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/donate"
                  className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#0d6a4d] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(13,106,77,0.20)] transition hover:-translate-y-0.5 hover:bg-[#0a5a41]"
                >
                  <FiHeart />
                  Donate Now
                </Link>

                <Link
                  to="/prayer-times"
                  className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-[#9bb2a7] bg-white/85 px-5 py-3 text-sm font-bold text-[#174738] shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-600 dark:bg-slate-900/75 dark:text-white dark:hover:bg-slate-900"
                >
                  <FiClock />
                  View Prayer Times
                </Link>
              </div>

              <div className="mt-7 grid max-w-2xl grid-cols-1 gap-2 text-xs font-semibold text-[#587068] sm:grid-cols-3 dark:text-slate-300">
                {[
                  'Five daily prayers',
                  'Islamic education',
                  'Community service',
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 rounded-xl bg-white/55 px-3 py-2 backdrop-blur-sm dark:bg-slate-900/45"
                  >
                    <FiCheckCircle className="shrink-0 text-[#0d6a4d] dark:text-emerald-300" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="mx-auto w-full max-w-[440px]"
            >
              <div className="rounded-[32px] border border-white/80 bg-white/78 p-3 shadow-[0_30px_80px_rgba(9,70,52,0.18)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/82">
                <PrayerCountdown
                  prayerName="Zuhr"
                  targetTime={isMounted ? countdownTarget : Date.now()}
                  clockTime="12:45 PM"
                  gregorianDate="26 May 2024"
                  hijriDate="18 Dhu'l Qadah 1445"
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  ['Today', 'Sunday'],
                  ['Hijri', '18 Dhu’l Qadah'],
                  ['Prayer', 'Zuhr'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/70 bg-white/72 p-3 text-center shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/75"
                  >
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#7a8782] dark:text-slate-500">
                      {label}
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#173e31] dark:text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================= QUICK ACCESS ========================= */}
      <section className="relative z-10 -mt-7 px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className={`${containerClass} !px-0`}>
          <div className="grid overflow-hidden rounded-[26px] border border-[#e4ebe7] bg-white shadow-[0_18px_45px_rgba(22,71,55,0.08)] sm:grid-cols-2 lg:grid-cols-6 dark:border-slate-800 dark:bg-slate-900">
            {FEATURES.map((feature, index) => (
              <Link
                key={feature.title}
                to={feature.to}
                className={`group flex items-center gap-3 p-4 transition hover:bg-[#fbfcfa] sm:p-5 dark:hover:bg-slate-800/70 ${
                  index !== FEATURES.length - 1
                    ? 'lg:border-r lg:border-[#edf1ee] dark:lg:border-slate-800'
                    : ''
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf6f1] text-lg text-[#0d6a4d] transition group-hover:-translate-y-0.5 group-hover:bg-[#0d6a4d] group-hover:text-white dark:bg-emerald-950/45 dark:text-emerald-300 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                  {feature.icon}
                </span>

                <span className="min-w-0">
                  <span className="block text-xs font-bold text-[#23473a] dark:text-white">
                    {feature.title}
                  </span>
                  <span className="mt-1 block text-[10px] leading-4 text-[#79857f] dark:text-slate-400">
                    {feature.desc}
                  </span>
                </span>

                <FiArrowRight className="ml-auto hidden shrink-0 text-[#94a29c] transition group-hover:translate-x-0.5 group-hover:text-[#0d6a4d] sm:block dark:text-slate-600 dark:group-hover:text-emerald-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= PRAYER TIMES ========================= */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className={containerClass}>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#edf6f1] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0d6a4d] dark:bg-emerald-950/45 dark:text-emerald-300">
                <FiClock />
                Daily Schedule
              </span>

              <h2 className={`mt-3 ${sectionTitle}`}>Today’s Prayer Times</h2>

              <p className="mt-2 text-sm text-[#79857f] dark:text-slate-400">
                Sunday, 26 May 2024 · 18 Dhu&apos;l Qadah 1445
              </p>
            </div>

            <Link
              to="/prayer-times"
              className="inline-flex items-center gap-2 self-start text-sm font-bold text-[#0d6a4d] sm:self-auto dark:text-emerald-300"
            >
              View All Timings
              <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {PRAYER_TIMES.map((prayer) => (
              <div
                key={prayer.name}
                className={`relative rounded-[22px] border p-5 text-center transition duration-300 ${
                  prayer.active
                    ? 'border-[#0d6a4d] bg-[#0d6a4d] text-white shadow-[0_20px_36px_rgba(13,106,77,0.22)] lg:-translate-y-2'
                    : 'border-[#e3e9e5] bg-white shadow-sm hover:-translate-y-1 hover:border-[#b5d3c5] hover:shadow-md dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                {prayer.active && (
                  <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#e3c15a]" />
                )}

                <span
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl ${
                    prayer.active
                      ? 'bg-white/12 text-white'
                      : 'bg-[#f0f5f2] text-[#73827b] dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {prayer.icon}
                </span>

                <p
                  className={`mt-3 text-sm font-semibold ${
                    prayer.active
                      ? 'text-emerald-50'
                      : 'text-[#63736d] dark:text-slate-300'
                  }`}
                >
                  {prayer.name}
                </p>

                <p
                  className={`mt-2 text-xl font-bold ${
                    prayer.active
                      ? 'text-white'
                      : 'text-[#183e31] dark:text-white'
                  }`}
                >
                  {prayer.time}
                </p>

                {prayer.active && (
                  <span className="mt-2 inline-flex rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-50">
                    Next prayer
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= ABOUT + SUPPORT ========================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-slate-900">
        <div className={containerClass}>
          <div className="grid gap-6 xl:grid-cols-2">
            {/* ABOUT */}
            <article className={`${cardClass} overflow-hidden`}>
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-7 sm:p-9">
                  <span className="inline-flex rounded-full bg-[#edf6f1] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0d6a4d] dark:bg-emerald-950/45 dark:text-emerald-300">
                    About the Masjid
                  </span>

                  <h2 className={`mt-3 ${sectionTitle}`}>About Our Masjid</h2>

                  <p className={sectionDescription}>
                    Faizan E Madina Sunni Masjid is a center for faith,
                    knowledge and community service. Our mission is to spread
                    the teachings of Islam and serve humanity with love and
                    compassion.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {[
                      'Five daily prayers in congregation',
                      'Islamic education for all ages',
                      'Community welfare programs',
                      'Youth and sisters activities',
                      'Dawah and guidance',
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl bg-[#f6f9f6] px-3 py-2.5 dark:bg-slate-800"
                      >
                        <FiCheckCircle className="shrink-0 text-[#0d6a4d] dark:text-emerald-300" />
                        <span className="text-xs font-semibold text-[#53665f] dark:text-slate-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/about"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0d6a4d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0a5a41]"
                  >
                    Learn More About Us
                    <FiArrowRight />
                  </Link>
                </div>

                <div className="relative min-h-[300px] overflow-hidden bg-[#0b4736] lg:min-h-full">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={ABOUT_VIDEO_SRC}
                    poster={ABOUT_VIDEO_POSTER}
                    controls
                    playsInline
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#063b2d]/85 via-[#063b2d]/10 to-transparent" />

                  <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                    About Our Masjid
                  </div>

                  <div className="pointer-events-none absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/25 p-4 text-white backdrop-blur-md">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-100">
                      Our Community
                    </p>
                    <p className="mt-1 text-sm font-bold">
                      A place to worship, learn & serve.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* SUPPORT */}
            <article className={`${cardClass} p-7 sm:p-9`}>
              <span className="inline-flex rounded-full bg-[#fff7e6] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a57713] dark:bg-amber-950/35 dark:text-[#dfc15f]">
                Support & Donations
              </span>

              <h2 className={`mt-3 ${sectionTitle}`}>Support Our Masjid</h2>

              <p className={sectionDescription}>
                Your donations help maintain the masjid and support education,
                community services and essential facilities.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {SUPPORT_CATEGORIES.map((category) => (
                  <Link
                    key={category.name}
                    to="/donate"
                    className="group rounded-2xl border border-[#e8ece9] bg-[#fbfcfa] p-3 text-center transition hover:-translate-y-1 hover:border-[#e0cc91] hover:shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  >
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff6dc] text-lg text-[#bd8b1f] transition group-hover:scale-105 dark:bg-amber-950/30 dark:text-[#e2c466]">
                      {category.icon}
                    </span>

                    <span className="mt-2 block text-[10px] font-bold text-[#5e6e67] dark:text-slate-300">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-[#e4eae6] bg-[#f9fbf9] p-5 dark:border-slate-800 dark:bg-slate-800/70">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#173e31] dark:text-white">
                      Construction Fund
                    </p>
                    <p className="mt-1 text-xs text-[#7b8782] dark:text-slate-400">
                      ₹34,760 raised of ₹1,00,000
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-[#0d6a4d] dark:text-emerald-300">
                    34%
                  </span>
                </div>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#e3eae5] dark:bg-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '34%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-[#0d6a4d]"
                  />
                </div>

                <div className="mt-2 flex justify-between text-[10px] font-bold text-[#7a8781] dark:text-slate-500">
                  <span>Fundraising progress</span>
                  <span>Goal: ₹1,00,000</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========================= EVENTS ========================= */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className={containerClass}>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#edf6f1] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0d6a4d] dark:bg-emerald-950/45 dark:text-emerald-300">
                Community Calendar
              </span>

              <h2 className={`mt-3 ${sectionTitle}`}>Upcoming Events</h2>

              <p className="mt-2 text-sm text-[#79857f] dark:text-slate-400">
                Join our community programs and activities.
              </p>
            </div>

            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0d6a4d] dark:text-emerald-300"
            >
              View All Events
              <FiArrowRight />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {EVENTS.map((event, index) => (
              <motion.article
                key={event.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={`${cardClass} group overflow-hidden`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#063b2d]/70 via-transparent to-transparent" />

                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#18503d]">
                    Community Event
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="min-h-[42px] text-sm font-bold leading-5 text-[#183e31] transition group-hover:text-[#0d6a4d] dark:text-white dark:group-hover:text-emerald-300">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-2 text-[10px] font-semibold text-[#78847f] dark:text-slate-400">
                    <span className="flex items-center gap-2">
                      <FiCalendar className="text-[#0d6a4d]" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiClock className="text-[#0d6a4d]" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiMapPin className="text-[#0d6a4d]" />
                      {event.location}
                    </span>
                  </div>

                  <Link
                    to="/events"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d6a4d] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#0a5a41]"
                  >
                    View Event
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= STATS ========================= */}
      <section className="relative overflow-hidden bg-[#0a4e3b] py-12 text-white sm:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.08),transparent_25%),radial-gradient(circle_at_85%_90%,rgba(223,189,79,0.08),transparent_25%)]" />

        <div className={`${containerClass} relative`}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center px-3 py-4 text-center ${
                  index !== 0
                    ? 'sm:border-l sm:border-white/10'
                    : ''
                }`}
              >
                <span className="mb-3 text-2xl text-[#dfbd4f]">
                  {stat.icon}
                </span>

                <p className="text-2xl font-bold sm:text-3xl">{stat.value}</p>

                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-100 sm:text-[10px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= GALLERY ========================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-slate-900">
        <div className={containerClass}>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#fff7e6] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a57713] dark:bg-amber-950/35 dark:text-[#dfc15f]">
                Moments & Memories
              </span>

              <h2 className={`mt-3 ${sectionTitle}`}>Gallery</h2>

              <p className="mt-2 text-sm text-[#79857f] dark:text-slate-400">
                A glimpse into our masjid and community life.
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0d6a4d] dark:text-emerald-300"
            >
              View Full Gallery
              <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {GALLERY_IMAGES.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-[20px] shadow-sm sm:aspect-[5/4]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#063326]/80 via-[#063326]/10 to-transparent" />

                <span className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white sm:text-sm">
                  {item.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= TESTIMONIALS ========================= */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className={containerClass}>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full bg-[#edf6f1] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0d6a4d] dark:bg-emerald-950/45 dark:text-emerald-300">
                Community Feedback
              </span>

              <h2 className={`mt-3 ${sectionTitle}`}>
                What Our Community Says
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={previousTestimonial}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dce6e0] bg-white text-[#4f625b] transition hover:border-[#9fc3b3] hover:text-[#0d6a4d] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-900"
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dce6e0] bg-white text-[#4f625b] transition hover:border-[#9fc3b3] hover:text-[#0d6a4d] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-900"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {visibleTestimonials.map((item, index) => (
              <motion.article
                key={`${item.name}-${testimonialIndex}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={`${cardClass} p-6 ${
                  index === 1 ? 'hidden md:block' : ''
                } ${index === 2 ? 'hidden lg:block' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0d6a4d] text-xs font-bold text-white">
                      {item.initials}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#193e32] dark:text-white">
                        {item.name}
                      </p>

                      <p className="mt-0.5 text-[10px] font-semibold text-[#7b8781] dark:text-slate-500">
                        {item.role}
                      </p>

                      <div className="mt-1 flex gap-0.5 text-[#d2aa31]">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="text-3xl leading-none text-[#d9e7df] dark:text-slate-700">
                    “
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-[#65736e] dark:text-slate-300">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= CONTACT ========================= */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className={containerClass}>
          <div className="overflow-hidden rounded-[32px] bg-[#0a4e3b] text-white shadow-[0_25px_70px_rgba(10,78,59,0.18)]">
            <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
              <div className="p-7 sm:p-10">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-100">
                  Contact
                </span>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Get In Touch
                </h2>

                <p className="mt-4 max-w-md text-sm leading-7 text-emerald-100">
                  We are here to serve you. Feel free to reach out for
                  questions, suggestions or community support.
                </p>

                <div className="mt-7 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <FiMapPin />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                        Address
                      </p>
                      <p className="mt-1 text-sm text-white">
                        {CONTACT_INFO.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <FiPhone />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                        Phone
                      </p>
                      <p className="mt-1 text-sm text-white">
                        {CONTACT_INFO.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <FiMail />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                        Email
                      </p>
                      <p className="mt-1 text-sm text-white">
                        {CONTACT_INFO.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm transition hover:bg-white hover:text-[#0a4e3b]"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 bg-[#083e30] p-7 sm:p-10 lg:border-l lg:border-t-0">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">
                      Message Us
                    </p>
                    <h3 className="mt-1 text-2xl font-bold sm:text-3xl">
                      Send Us a Message
                    </h3>
                  </div>

                  <span className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-white/10 sm:flex">
                    <FiSend />
                  </span>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfbd4f] text-[#173c31]">
                      <FiCheckCircle size={28} />
                    </div>

                    <h4 className="mt-4 text-xl font-bold">
                      Message Sent Successfully
                    </h4>

                    <p className="mt-2 text-sm text-emerald-100">
                      Jazakallah Khair for contacting us. We will get back to
                      you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        name="name"
                        type="text"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        placeholder="Your Name"
                        required
                        autoComplete="name"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-emerald-100/60 focus:border-[#dfc35e] focus:ring-2 focus:ring-[#dfc35e]/15"
                      />

                      <input
                        name="email"
                        type="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        placeholder="Your Email"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-emerald-100/60 focus:border-[#dfc35e] focus:ring-2 focus:ring-[#dfc35e]/15"
                      />
                    </div>

                    <input
                      name="subject"
                      type="text"
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      placeholder="Subject"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-emerald-100/60 focus:border-[#dfc35e] focus:ring-2 focus:ring-[#dfc35e]/15"
                    />

                    <textarea
                      name="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Your Message"
                      required
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-emerald-100/60 focus:border-[#dfc35e] focus:ring-2 focus:ring-[#dfc35e]/15"
                    />

                    <button
                      type="submit"
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#dfbd4f] px-5 py-3 text-sm font-bold text-[#173c31] transition hover:-translate-y-0.5 hover:bg-[#e7ca6b]"
                    >
                      <FiSend />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer className="bg-[#063428] text-white">
        <div className={containerClass}>
          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.9fr_1fr]">
            <div>
              <BrandMark size="md" showText className="[&_*]:text-white" />

              <p className="mt-4 max-w-sm text-sm leading-7 text-emerald-100">
                A place of peace, knowledge and community. Join us in worship,
                learn, and serve humanity.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100">
                <FiShield className="text-[#dfbd4f]" />
                Faith · Knowledge · Service
              </div>
            </div>

            <div>
              <h3 className="font-bold">Quick Links</h3>
              <div className="mt-4 space-y-2.5 text-sm text-emerald-100">
                {[
                  ['Home', '/'],
                  ['About Us', '/about'],
                  ['Prayer Times', '/prayer-times'],
                  ['Events', '/events'],
                  ['Gallery', '/gallery'],
                  ['Contact', '/contact'],
                ].map(([label, to]) => (
                  <Link
                    key={label}
                    className="block transition hover:translate-x-0.5 hover:text-white"
                    to={to}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold">Important Links</h3>
              <div className="mt-4 space-y-2.5 text-sm text-emerald-100">
                {[
                  ['Donate Now', '/donate'],
                  ['Islamic Education', '/education'],
                  ['Volunteer', '/volunteer'],
                  ['Privacy Policy', '/privacy'],
                  ['Terms & Conditions', '/terms'],
                  ['FAQs', '/faq'],
                ].map(([label, to]) => (
                  <Link
                    key={label}
                    className="block transition hover:translate-x-0.5 hover:text-white"
                    to={to}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold">Prayer Times</h3>

              <div className="mt-4 space-y-2.5 text-sm text-emerald-100">
                {PRAYER_TIMES.map((prayer) => (
                  <div
                    key={prayer.name}
                    className="flex items-center justify-between gap-4"
                  >
                    <span>{prayer.name}</span>
                    <span className="font-semibold">{prayer.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-2">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs text-white outline-none placeholder:text-emerald-200/60"
                  />
                  <button
                    type="button"
                    className="rounded-lg bg-[#0d6a4d] px-3 py-2 text-xs font-bold transition hover:bg-[#0a5a41]"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 py-4">
            <div className="flex flex-col gap-2 text-xs text-emerald-100 sm:flex-row sm:items-center sm:justify-between">
              <span>© Faizan E Madina Sunni Masjid. All rights reserved.</span>
              <span>
                Built with <span className="text-red-400">♥</span> by Kasim
                Shah
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
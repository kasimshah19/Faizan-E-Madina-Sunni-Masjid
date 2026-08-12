import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiClock, FiCalendar, FiHeart, FiBookOpen, FiUsers, FiPhoneCall, 
  FiCheckCircle, FiMapPin, FiPlayCircle, FiChevronRight, FiMoon 
} from 'react-icons/fi';
import { FaKaaba, FaHandsHelping, FaMosque, FaLightbulb, FaWater, FaBook, FaMoon, FaGlobe } from 'react-icons/fa';

import PrayerCountdown from '../../components/ui/PrayerCountdown';
import Button from '../../components/common/Button';
import IconCircle from '../../components/common/IconCircle';
import Card from '../../components/common/Card';
import heroImage from '../../assets/images/Home.jpeg'; 

const FEATURES = [
  { icon: <FiClock />, title: "Daily Prayer Times", desc: "Accurate daily salah timings", variant: "primary" },
  { icon: <FiCalendar />, title: "Upcoming Events", desc: "Join our community events", variant: "accent" },
  { icon: <FiHeart />, title: "Online Donations", desc: "Support for a good cause", variant: "success" },
  { icon: <FiBookOpen />, title: "Islamic Education", desc: "Learn & grow in knowledge", variant: "info" },
  { icon: <FiUsers />, title: "Volunteer With Us", desc: "Serve the community together", variant: "primary" },
  { icon: <FiPhoneCall />, title: "Contact Us", desc: "We are here to help you", variant: "accent" },
];

const PRAYER_TIMES = [
  { name: "Fajr", time: "04:25 AM", active: false },
  { name: "Zuhr", time: "12:45 PM", active: true },
  { name: "Asr", time: "04:30 PM", active: false },
  { name: "Maghrib", time: "07:05 PM", active: false },
  { name: "Isha", time: "08:35 PM", active: false },
  { name: "Jummah", time: "01:30 PM", active: false },
];

const SUPPORT_CATEGORIES = [
  { icon: <FaKaaba className="text-orange-500 text-3xl" />, name: "Zakat" },
  { icon: <FaHandsHelping className="text-orange-500 text-3xl" />, name: "Sadaqah" },
  { icon: <FaMosque className="text-orange-500 text-3xl" />, name: "Masjid Construction" },
  { icon: <FaLightbulb className="text-orange-500 text-3xl" />, name: "Electricity" },
  { icon: <FaWater className="text-orange-500 text-3xl" />, name: "Water" },
  { icon: <FaBook className="text-orange-500 text-3xl" />, name: "Madrasa" },
  { icon: <FaMoon className="text-orange-500 text-3xl" />, name: "Ramadan" },
  { icon: <FaGlobe className="text-orange-500 text-3xl" />, name: "General" },
];

const EVENTS = [
  { title: "Jummah Bayan", date: "31 May 2024", time: "12:00 PM", location: "Main Hall", image: "https://placehold.co/400x300/10b981/ffffff?text=Bayan" },
  { title: "Eid Prayer", date: "10 June 2024", time: "06:30 AM", location: "Masjid Ground", image: "https://placehold.co/400x300/10b981/ffffff?text=Eid" },
  { title: "Quran Competition", date: "15 June 2024", time: "10:00 AM", location: "Community Hall", image: "https://placehold.co/400x300/10b981/ffffff?text=Quran" },
  { title: "Ramadan Iftar", date: "20 March 2025", time: "06:30 PM", location: "Masjid Ground", image: "https://placehold.co/400x300/10b981/ffffff?text=Iftar" },
  { title: "Islamic Conference", date: "05 July 2024", time: "09:00 AM", location: "Conference Hall", image: "https://placehold.co/400x300/10b981/ffffff?text=Conference" },
];

const Home = () => {
  const dummyTargetTime = Date.now() + (1 * 60 * 60 * 1000) + (25 * 60 * 1000);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          {/* Using Kasim's custom overlay class if available, else a standard gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30 dark:from-gray-900/95 dark:via-gray-900/80 dark:to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[55%] flex flex-col gap-6 text-center lg:text-left pt-10 lg:pt-0"
          >
            <span className="text-emerald-700 dark:text-emerald-400 text-sm font-bold tracking-wider uppercase">
              Welcome to
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-emerald-900 dark:text-white leading-tight">
              Faizan E Madina<br className="hidden sm:block" /> Sunni Masjid
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-body max-w-[500px] mx-auto lg:mx-0">
              A place of peace, knowledge, and community. Join us in worship, learn, and serve humanity.
            </p>

            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md border border-emerald-100 dark:border-gray-700 rounded-xl p-5 mt-4 max-w-[600px] mx-auto lg:mx-0 shadow-sm">
              <p className="font-arabic text-2xl sm:text-3xl text-emerald-900 dark:text-emerald-400 mb-3 text-right font-bold" dir="rtl">
                وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ
              </p>
              <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base italic font-medium">
                "And who is better in speech than one who invites to Allah." (Quran 41:33)
              </p>
            </div>

            {/* Fixed Buttons: Using Kasim's variants directly without overriding padding */}
            <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
              <Link to="/donate">
                <Button variant="success" size="lg" className="flex items-center gap-2">
                  <FiHeart /> Donate Now
                </Button>
              </Link>
              <Link to="/prayer-times">
                <Button variant="outline" size="lg" className="flex items-center">
                  [ View Prayer Times ]
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Countdown - Removed Extra Outer Div & Extra Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full sm:w-96 lg:w-[40%] flex-shrink-0 mx-auto lg:mx-0 drop-shadow-2xl"
          >
            <PrayerCountdown
              prayerName="Zuhr"
              targetTime={dummyTargetTime}
              clockTime="12:45 PM"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES STRIP ================= */}
      <section className="bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700 py-8 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-4 md:grid-cols-3 divide-x divide-gray-100 dark:divide-gray-700">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 px-2 sm:px-4 ${idx === 0 ? 'pl-0' : ''}`}
              >
                <IconCircle icon={feature.icon} variant={feature.variant} size="md" className="flex-shrink-0 mb-2 sm:mb-0" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-snug">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRAYER TIMES SECTION ================= */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Today's Prayer Times</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sunday, 26 May 2024 | 18 Dhu'l Qadah 1445</p>
            </div>
            <Link to="/prayer-times" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 text-sm font-semibold flex items-center gap-1 mt-4 md:mt-0">
              View All Timings <FiChevronRight />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PRAYER_TIMES.map((prayer, idx) => (
              <div key={idx} className={`p-5 rounded-xl flex flex-col items-center justify-center border transition-all ${prayer.active ? 'bg-emerald-700 text-white shadow-lg border-emerald-700 scale-105' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}>
                <span className="text-sm font-medium mb-2 flex items-center gap-2">
                  <FiMoon className={prayer.active ? 'text-white' : 'text-gray-400'} /> {prayer.name}
                </span>
                <span className={`text-xl font-bold ${prayer.active ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{prayer.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT & SUPPORT MASJID ================= */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: About */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Our Masjid</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Faizan E Madina Sunni Masjid is a center for faith, knowledge, and community service. Our mission is to spread the teachings of Islam and serve humanity with love and compassion.
            </p>
            
            <ul className="space-y-3 mb-8">
              {["Five daily prayers in congregation", "Islamic education for all ages", "Community welfare programs", "Youth and sisters activities", "Dawah and guidance"].map((item, i) => (
                <li key={i} className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                  <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 mr-3 text-lg" /> {item}
                </li>
              ))}
            </ul>
            
            {/* Fixed Button Component */}
            <Button variant="primary">Learn More About Us</Button>
            
            {/* Video Placeholder using solid color instead of broken image */}
            <div className="mt-8 relative rounded-xl overflow-hidden shadow-md group cursor-pointer h-64 bg-emerald-900 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <FiPlayCircle className="text-white text-6xl opacity-90 group-hover:scale-110 transition-transform z-10" />
            </div>
          </div>

          {/* Right: Support */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Support Our Masjid</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Your donations help us maintain the masjid and support various community services.
            </p>

            <div className="grid grid-cols-4 gap-6 mb-10">
              {SUPPORT_CATEGORIES.map((cat, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-3 group cursor-pointer">
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 group-hover:shadow-md group-hover:border-orange-200 transition-all">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">{cat.name}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-100 dark:border-gray-600">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Construction Fund</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">$34,760 / $100,000</p>
                </div>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold text-lg">34%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '34%' }}></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= UPCOMING EVENTS ================= */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming Events</h2>
            <Link to="/events" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 text-sm font-semibold flex items-center gap-1">
              View All Events <FiChevronRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {EVENTS.map((event, idx) => (
              <Card key={idx} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-row lg:flex-col items-center lg:items-start p-3 gap-4 lg:gap-2">
                {/* Fixed Images using placeholders so they don't break */}
                <img src={event.image} alt={event.title} className="w-24 h-24 lg:w-full lg:h-32 object-cover rounded-lg" />
                <div className="flex-1 lg:mt-2 w-full">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm lg:text-base line-clamp-1">{event.title}</h4>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1 mb-3">
                    <p className="flex items-center gap-1"><FiCalendar className="text-emerald-600 dark:text-emerald-400"/> {event.date}</p>
                    <p className="flex items-center gap-1"><FiClock className="text-emerald-600 dark:text-emerald-400"/> {event.time}</p>
                    <p className="flex items-center gap-1"><FiMapPin className="text-emerald-600 dark:text-emerald-400"/> {event.location}</p>
                  </div>
                  {/* Fixed Button Component */}
                  <Button variant="primary" className="w-full justify-center">
                    Register Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS COUNTER ================= */}
      <section className="py-12 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center divide-x divide-emerald-800/50">
            <div>
              <FiUsers className="text-3xl text-emerald-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold mb-1">1,248+</h3>
              <p className="text-emerald-200 text-xs sm:text-sm uppercase tracking-wider">Members</p>
            </div>
            <div>
              <FiHeart className="text-3xl text-emerald-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold mb-1">$48,750+</h3>
              <p className="text-emerald-200 text-xs sm:text-sm uppercase tracking-wider">Total Donations</p>
            </div>
            <div>
              <FiCalendar className="text-3xl text-emerald-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold mb-1">24+</h3>
              <p className="text-emerald-200 text-xs sm:text-sm uppercase tracking-wider">Events</p>
            </div>
            <div>
              <FaHandsHelping className="text-3xl text-emerald-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold mb-1">156+</h3>
              <p className="text-emerald-200 text-xs sm:text-sm uppercase tracking-wider">Volunteers</p>
            </div>
            <div>
              <FaBook className="text-3xl text-emerald-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold mb-1">320+</h3>
              <p className="text-emerald-200 text-xs sm:text-sm uppercase tracking-wider">Students</p>
            </div>
            <div>
              <FiCheckCircle className="text-3xl text-emerald-400 mx-auto mb-3" />
              <h3 className="text-3xl font-bold mb-1">18+</h3>
              <p className="text-emerald-200 text-xs sm:text-sm uppercase tracking-wider">Teachers</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
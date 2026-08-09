import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiCalendar, FiHeart, FiBookOpen, FiUsers, FiPhoneCall } from 'react-icons/fi';
import PrayerCountdown from '../../components/ui/PrayerCountdown';
import Button from '../../components/common/Button';
import IconCircle from '../../components/common/IconCircle';
import heroImage from '../../assets/images/Home.jpeg';

const FEATURES = [
  { icon: <FiClock />, title: "Daily Prayer Times", desc: "Accurate daily salah timings", variant: "primary" },
  { icon: <FiCalendar />, title: "Upcoming Events", desc: "Join our community events", variant: "accent" },
  { icon: <FiHeart />, title: "Online Donations", desc: "Support for a good cause", variant: "success" },
  { icon: <FiBookOpen />, title: "Islamic Education", desc: "Learn & grow in knowledge", variant: "info" },
  { icon: <FiUsers />, title: "Volunteer With Us", desc: "Serve the community together", variant: "primary" },
  { icon: <FiPhoneCall />, title: "Contact Us", desc: "We are here to help you", variant: "accent" },
];

const Home = () => {
  // Dummy target time for the countdown (e.g. 1 hour and 25 minutes from now)
  const dummyTargetTime = Date.now() + (1 * 60 * 60 * 1000) + (25 * 60 * 1000);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 hero-overlay" style={{ position: 'absolute' }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* Left Side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[55%] flex flex-col gap-6 text-center lg:text-left pt-10 lg:pt-0"
          >
            <span className="text-white text-sm font-medium tracking-wider uppercase">
              Welcome to
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight drop-shadow-md">
              Faizan E Madina<br className="hidden sm:block" /> Sunni Masjid
            </h1>
            <p className="text-white text-base sm:text-lg font-body max-w-[500px] mx-auto lg:mx-0 drop-shadow-sm">
              A place of peace, knowledge, and community. Join us in worship, learn, and serve humanity.
            </p>

            {/* Quote Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 mt-4 max-w-[600px] mx-auto lg:mx-0">
              <p className="font-arabic text-2xl sm:text-3xl text-white mb-3 text-right" dir="rtl">
                وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ
              </p>
              <p className="text-white text-sm sm:text-base italic">
                "And who is better in speech than one who invites to Allah." (Quran 41:33)
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
              <Link to="/donate">
                <Button variant="accent" size="lg" className="shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 min-w-[200px] justify-center">
                  <FiHeart /> Donate Now
                </Button>
              </Link>
              <Link to="/prayer-times">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10 min-w-[200px] justify-center flex items-center">
                  [ View Prayer Times ]
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Countdown Card */}
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

      {/* Feature Strip */}
      <section className="bg-surface/80 border-b border-border py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-4 md:grid-cols-3">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4"
              >
                <IconCircle icon={feature.icon} variant={feature.variant} size="md" className="flex-shrink-0 mb-2 sm:mb-0" />
                <div>
                  <h3 className="font-heading font-semibold text-text-primary text-sm sm:text-base leading-tight mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm leading-snug">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

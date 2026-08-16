import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiMessageSquare } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "Regular Community Member",
    content: "A beautiful masjid with a peaceful environment. The community is very supportive, and the weekly Jummah bayans have been life-changing for me and my family.",
    rating: 5,
    image: "https://placehold.co/100x100/10b981/ffffff?text=AK"
  },
  {
    id: 2,
    name: "Fatima Shah",
    role: "Madrasa Parent",
    content: "Islamic lessons and events here have significantly improved my children's understanding of Islam. The teachers are very caring, patient, and knowledgeable.",
    rating: 5,
    image: "https://placehold.co/100x100/047857/ffffff?text=FS"
  },
  {
    id: 3,
    name: "Usman Ansari",
    role: "Donor & Volunteer",
    content: "Excellent management and transparent donation system. Seeing the construction progress firsthand fills my heart with joy. May Allah reward them.",
    rating: 5,
    image: "https://placehold.co/100x100/065f46/ffffff?text=UA"
  },
  {
    id: 4,
    name: "Zubair Siddiqui",
    role: "Youth Program Participant",
    content: "The youth seminars and counseling sessions helped me stay grounded in my faith while managing my university studies. Truly a second home!",
    rating: 5,
    image: "https://placehold.co/100x100/10b981/ffffff?text=ZS"
  },
  {
    id: 5,
    name: "Ayesha Siddiqua",
    role: "Sisters Circle Member",
    content: "The sisters' weekend workshops are extremely educational. It's a wonderful platform to learn our Deen and connect with righteous company.",
    rating: 5,
    image: "https://placehold.co/100x100/047857/ffffff?text=AS"
  },
  {
    id: 6,
    name: "Mohammad Farooq",
    role: "Neighbor",
    content: "Even as a neighbor living close by, I deeply admire the discipline, peacefulness, and cleanliness maintained by the masjid management.",
    rating: 5,
    image: "https://placehold.co/100x100/065f46/ffffff?text=MF"
  }
];

const Testimonials = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* ================= PAGE HEADER ================= */}
      <section className="bg-emerald-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FiMessageSquare className="text-5xl md:text-6xl text-emerald-400 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Community Testimonials</h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              Read what our members, parents, and volunteers have to say about their experiences at Faizan E Madina.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= TESTIMONIALS GRID ================= */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="p-8 h-full flex flex-col justify-between bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                {/* Decorative quote icon in background */}
                <FaQuoteLeft className="absolute top-4 right-4 text-emerald-100 dark:text-emerald-900/30 text-6xl pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  {/* Star Ratings */}
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <FiStar key={i} className="fill-current text-sm" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base mb-6 relative z-10 italic">
                    "{item.content}"
                  </p>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{item.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SHARE YOUR EXPERIENCE CTA ================= */}
      <section className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Have an experience to share?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            We would love to hear how our masjid has impacted your spiritual journey or community life.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg" className="shadow-md">
              Send Your Feedback
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Testimonials;
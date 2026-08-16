import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiBookOpen, FiClock, FiUsers, FiAward, FiCheckCircle, FiChevronRight 
} from 'react-icons/fi';
import { FaQuran, FaChild, FaGraduationCap } from 'react-icons/fa';

import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import IconCircle from '../../components/common/IconCircle';

const PROGRAMS = [
  {
    id: 1,
    title: "Nazira (Quran Reading)",
    age: "5 - 12 Years",
    schedule: "Mon - Thu (05:00 PM - 07:00 PM)",
    icon: <FiBookOpen />,
    description: "Fundamental course focusing on teaching children how to read the Holy Quran with proper Tajweed rules and basic Islamic etiquette.",
    variant: "primary"
  },
  {
    id: 2,
    title: "Hifz-ul-Quran",
    age: "8+ Years",
    schedule: "Mon - Fri (04:00 PM - 07:30 PM)",
    icon: <FaQuran />,
    description: "Intensive memorization program for dedicated students. Includes regular revision, Tajweed correction, and Tarbiyah.",
    variant: "success"
  },
  {
    id: 3,
    title: "Islamic Studies (Tarbiyah)",
    age: "10 - 15 Years",
    schedule: "Weekends (10:00 AM - 01:00 PM)",
    icon: <FaChild />,
    description: "Comprehensive curriculum covering basic Fiqh, Seerah of Prophet Muhammad (PBUH), Duas, and Islamic morals.",
    variant: "accent"
  },
  {
    id: 4,
    title: "Adult Tajweed & Tafseer",
    age: "18+ Years",
    schedule: "Saturdays (after Maghrib)",
    icon: <FaGraduationCap />,
    description: "Specially designed for adults who want to improve their Quranic recitation and understand the meaning of the Holy Quran.",
    variant: "info"
  }
];

const FEATURES = [
  "Certified & Experienced Teachers",
  "Safe & Nurturing Environment",
  "Focus on Character Building (Tarbiyah)",
  "Small Class Sizes for Individual Attention",
  "Interactive Learning Methods",
  "Regular Progress Reports for Parents"
];

const IslamicEducation = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Islamic Education</h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              "Seeking knowledge is an obligation upon every Muslim." (Ibn Majah) <br/>
              Empowering our next generation with the light of the Quran and Sunnah.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= INTRODUCTION SECTION ================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-sm font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 mb-2">Our Madrasa</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Nurturing minds and purifying souls.
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Our Madrasa system is dedicated to providing high-quality Islamic education in a modern, engaging, and loving environment. We believe that learning the Deen should be a joyful experience that instills a lifelong love for Allah and His Messenger (PBUH).
            </p>
            <div className="flex items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex -space-x-4">
                <img className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800" src="https://placehold.co/100x100/10b981/ffffff?text=S1" alt="Student" />
                <img className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800" src="https://placehold.co/100x100/047857/ffffff?text=S2" alt="Student" />
                <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-emerald-700 dark:text-emerald-400">320+</div>
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Active Students</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enrolled across all programs</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <FiCheckCircle className="text-emerald-500 text-xl flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= PROGRAMS/COURSES GRID ================= */}
      <section className="py-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Programs</h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mt-4"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              We offer a variety of courses tailored to different age groups and proficiency levels. Find the right program for yourself or your child.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROGRAMS.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="p-8 h-full flex flex-col hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start gap-4 mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                    <IconCircle icon={program.icon} variant={program.variant} size="lg" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{program.title}</h3>
                      <div className="flex flex-wrap gap-3 text-xs font-semibold">
                        <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full flex items-center gap-1">
                          <FiUsers /> {program.age}
                        </span>
                        <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full flex items-center gap-1">
                          <FiClock /> {program.schedule}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow text-sm md:text-base">
                    {program.description}
                  </p>
                  <Button variant="outline" className="w-full flex justify-center items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700">
                    Syllabus & Details <FiChevronRight />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION (ENROLL) ================= */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <FiAward className="text-6xl mx-auto mb-6 text-emerald-300 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Admissions are Open!</h2>
              <p className="text-emerald-100 max-w-2xl mx-auto mb-8 text-lg">
                Secure a spot for your child in our upcoming session. Limited seats available per class to ensure quality education.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <Button variant="accent" size="lg" className="bg-white text-emerald-900 hover:bg-gray-100 shadow-lg px-8 py-3 rounded-full font-bold w-full sm:w-auto">
                    Enroll Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10 px-8 py-3 rounded-full font-bold w-full sm:w-auto">
                    Contact Admin
                  </Button>
                </Link>
              </div>
            </div>
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default IslamicEducation;
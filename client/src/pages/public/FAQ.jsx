import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiMessageCircle, FiHelpCircle, FiPhoneCall } from 'react-icons/fi';

import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

// Dummy FAQ Data grouped by categories
const FAQ_DATA = [
  {
    category: "General Information",
    faqs: [
      { 
        q: "What are the opening hours of the Masjid?", 
        a: "The Masjid is open every day from Fajr prayer until 30 minutes after Isha prayer. The main hall is accessible for individual prayers throughout the day." 
      },
      { 
        q: "Is there a dedicated prayer area for sisters?", 
        a: "Yes, Alhamdulillah. We have a fully equipped, spacious, and soundproof prayer hall specifically for sisters on the first floor, accessible via a private entrance." 
      },
      { 
        q: "Is parking available at the Masjid?", 
        a: "Yes, we have a dedicated parking lot. However, during Jummah and Eid prayers, it fills up very quickly, so we strongly advise carpooling or arriving early." 
      }
    ]
  },
  {
    category: "Donations & Zakat",
    faqs: [
      { 
        q: "Are my donations tax-deductible?", 
        a: "Yes, Faizan E Madina is a registered non-profit organization. All your generous donations are tax-deductible. A receipt will be sent to your email automatically upon payment." 
      },
      { 
        q: "Can I specify where my donation goes?", 
        a: "Absolutely! On our Donation page, you can select specific funds such as Zakat, Sadaqah, Construction Fund, or Madrasa Fund. We ensure 100% of your money goes to the intended cause." 
      }
    ]
  },
  {
    category: "Madrasa & Education",
    faqs: [
      { 
        q: "How can I enroll my child in the Madrasa?", 
        a: "You can visit our 'Islamic Education' page and click on 'Enroll Now', or visit the admin office in person between Asr and Maghrib prayers (Monday to Thursday)." 
      },
      { 
        q: "What age groups do you teach?", 
        a: "Our programs cater to a wide range of ages. Nazira is for 5-12 years, Hifz for 8+ years, and we also have special Tajweed & Tafseer classes for adults." 
      }
    ]
  }
];

// Accordion Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 text-left focus:outline-none group"
      >
        <span className={`font-bold text-lg pr-4 transition-colors ${isOpen ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 p-2 rounded-full transition-colors ${isOpen ? 'bg-emerald-600 text-white' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-800/50'}`}
        >
          <FiChevronDown />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
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
            <FiHelpCircle className="text-5xl md:text-6xl text-emerald-400 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              Find answers to the most common questions about our Masjid's services, timings, and operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FAQ ACCORDIONS ================= */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="space-y-12">
          {FAQ_DATA.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                {section.category}
              </h2>
              <Card className="px-6 sm:px-8 bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
                {section.faqs.map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= STILL HAVE QUESTIONS CTA ================= */}
      <section className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-6">
            <FiMessageCircle className="text-3xl" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            If you couldn't find the answer to your question in our FAQ section, please don't hesitate to reach out to our administration team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                Contact Us
              </Button>
            </Link>
            <a href="tel:+12345678900">
              <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                <FiPhoneCall /> Call Admin
              </Button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FAQ;
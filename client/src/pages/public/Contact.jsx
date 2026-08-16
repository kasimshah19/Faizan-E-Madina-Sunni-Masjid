import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
} from 'react-icons/fi';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from 'react-icons/fa';

import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import IconCircle from '../../components/common/IconCircle';

const CONTACT_INFO = [
  {
    id: 1,
    icon: <FiMapPin />,
    title: 'Our Address',
    details: ['123 Masjid Street, Your City', 'State, Country 12345'],
    variant: 'primary',
  },
  {
    id: 2,
    icon: <FiPhone />,
    title: 'Phone Number',
    details: ['+1 234 567 8900', '+1 234 567 8901'],
    variant: 'success',
  },
  {
    id: 3,
    icon: <FiMail />,
    title: 'Email Address',
    details: ['info@faizanemadina.org', 'support@faizanemadina.org'],
    variant: 'accent',
  },
  {
    id: 4,
    icon: <FiClock />,
    title: 'Office Hours',
    details: ['Monday - Saturday', '09:00 AM - 05:00 PM'],
    variant: 'info',
  },
];

const SOCIALS = [
  { label: 'Facebook', icon: <FaFacebookF />, href: '#' },
  { label: 'Twitter', icon: <FaTwitter />, href: '#' },
  { label: 'Instagram', icon: <FaInstagram />, href: '#' },
  { label: 'YouTube', icon: <FaYoutube />, href: '#' },
];

const MAP_QUERY =
  '123 Masjid Street, Your City, State, Country 12345';

const Contact = () => {
  const resetTimerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Keep this ready for the backend/API integration later.
    console.log('Form Data Submitted:', formData);

    setIsSubmitted(true);

    resetTimerRef.current = window.setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8f4] text-[#163c31] dark:bg-slate-950 dark:text-white">
      {/* PAGE HERO */}
      <section className="relative overflow-hidden bg-[#083f30]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(223,189,79,0.18),transparent_25%)]" />
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#0d6a4d]/50 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-[#052c22]/70 blur-3xl" />

        <div className="relative mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#dfbd4f]" />
              Contact Faizan E Madina
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              We are here to serve you.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-100 sm:text-base">
              Feel free to reach out for any queries, suggestions, or
              assistance regarding our community and services.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-semibold text-white backdrop-blur-md">
              <FiMessageCircle className="text-[#dfbd4f]" />
              We would love to hear from you.
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1320px] gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CONTACT_INFO.map((info, index) => (
            <motion.div
              key={info.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <Card
                hover
                className="h-full border-[#e5ebe7] bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start gap-4">
                  <IconCircle
                    icon={info.icon}
                    variant={info.variant}
                    size="md"
                  />

                  <div className="min-w-0">
                    <h2 className="text-sm font-bold text-[#173e32] dark:text-white">
                      {info.title}
                    </h2>

                    <div className="mt-2 space-y-1">
                      {info.details.map((line) => (
                        <p
                          key={line}
                          className="text-xs leading-5 text-[#6f7d77] dark:text-slate-400"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_.92fr]">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <Card className="h-full border-[#e5ebe7] bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-7">
                  <div className="mb-3 inline-flex rounded-full bg-[#edf6f1] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#0d6a4d] dark:bg-emerald-950/45 dark:text-emerald-300">
                    Send a Message
                  </div>

                  <h2 className="text-2xl font-bold text-[#163d31] sm:text-3xl dark:text-white">
                    How can we help you?
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#75817c] dark:text-slate-400">
                    Fill out the form below and our team will get back to you
                    as soon as possible.
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950/35"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-300">
                      <FiCheckCircle size={28} />
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-emerald-800 dark:text-emerald-300">
                      Message Sent!
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-emerald-700 dark:text-emerald-400">
                      Jazakallah Khair for reaching out. We will contact you
                      soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-2 block text-xs font-bold text-[#4d625a] dark:text-slate-300"
                        >
                          Your Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          autoComplete="name"
                          className="w-full rounded-xl border border-[#dfe7e2] bg-[#fbfcfa] px-4 py-3.5 text-sm text-[#173d31] outline-none transition placeholder:text-[#a1aca7] focus:border-[#0d6a4d] focus:ring-2 focus:ring-[#0d6a4d]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="mb-2 block text-xs font-bold text-[#4d625a] dark:text-slate-300"
                        >
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          autoComplete="email"
                          className="w-full rounded-xl border border-[#dfe7e2] bg-[#fbfcfa] px-4 py-3.5 text-sm text-[#173d31] outline-none transition placeholder:text-[#a1aca7] focus:border-[#0d6a4d] focus:ring-2 focus:ring-[#0d6a4d]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="mb-2 block text-xs font-bold text-[#4d625a] dark:text-slate-300"
                      >
                        Subject *
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className="w-full rounded-xl border border-[#dfe7e2] bg-[#fbfcfa] px-4 py-3.5 text-sm text-[#173d31] outline-none transition placeholder:text-[#a1aca7] focus:border-[#0d6a4d] focus:ring-2 focus:ring-[#0d6a4d]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-2 block text-xs font-bold text-[#4d625a] dark:text-slate-300"
                      >
                        Your Message *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Write your message here..."
                        className="w-full resize-none rounded-xl border border-[#dfe7e2] bg-[#fbfcfa] px-4 py-3.5 text-sm text-[#173d31] outline-none transition placeholder:text-[#a1aca7] focus:border-[#0d6a4d] focus:ring-2 focus:ring-[#0d6a4d]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      icon={<FiSend />}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>

            {/* MAP + SOCIAL */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="space-y-5"
            >
              <Card className="overflow-hidden border-[#e5ebe7] bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-2 flex items-center justify-between gap-3 px-3 pt-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0d6a4d] dark:text-emerald-300">
                      Find Us
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-[#193e32] dark:text-white">
                      Masjid Location
                    </h3>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf6f1] text-[#0d6a4d] dark:bg-emerald-950/45 dark:text-emerald-300">
                    <FiMapPin />
                  </span>
                </div>

                <div className="relative overflow-hidden rounded-2xl">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      MAP_QUERY,
                    )}&output=embed`}
                    width="100%"
                    height="360"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Masjid Location Map"
                    className="block min-h-[300px] w-full sm:min-h-[360px]"
                  />
                </div>

                <div className="flex items-start gap-3 px-3 pb-2 pt-4">
                  <FiMapPin className="mt-0.5 shrink-0 text-[#0d6a4d] dark:text-emerald-300" />
                  <p className="text-xs leading-5 text-[#6f7d77] dark:text-slate-400">
                    123 Masjid Street, Your City, State, Country 12345
                  </p>
                </div>
              </Card>

              <Card className="border-[#e5ebe7] bg-[#edf6f1] p-6 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0d6a4d] dark:text-emerald-300">
                    Stay Connected
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-[#183d31] dark:text-white">
                    Connect With Us Online
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#6d7c76] dark:text-slate-400">
                    Follow our social channels for updates, events, and
                    community announcements.
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white text-[#0d6a4d] shadow-sm transition hover:-translate-y-1 hover:bg-[#0d6a4d] hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-emerald-600 dark:hover:text-white"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#e5ebe7] bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <FiPhone className="text-[#0d6a4d] dark:text-emerald-300" />
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#7a8782] dark:text-slate-500">
                    Call Us
                  </p>
                  <p className="mt-1 text-xs font-bold text-[#183d31] dark:text-white">
                    +1 234 567 8900
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e7dfc8] bg-[#fffdf7] p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                  <FiClock className="text-[#b1831e] dark:text-[#e2c66a]" />
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#8b7a52] dark:text-amber-200/60">
                    Office Hours
                  </p>
                  <p className="mt-1 text-xs font-bold text-[#6f5b22] dark:text-[#ead89b]">
                    09 AM - 05 PM
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
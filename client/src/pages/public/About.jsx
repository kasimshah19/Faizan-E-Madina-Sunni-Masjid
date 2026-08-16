import React from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiHeart,
  FiTarget,
  FiUsers,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Card from '../../components/common/Card';
import IconCircle from '../../components/common/IconCircle';
import Button from '../../components/common/Button';
import heroImage from '../../assets/images/Home.jpeg';

const VALUES = [
  {
    id: 1,
    title: 'Our Mission',
    icon: <FiTarget />,
    desc: 'To provide a welcoming environment for worship, Islamic education, and community service based on the teachings of the Quran and Sunnah.',
    variant: 'primary',
  },
  {
    id: 2,
    title: 'Our Vision',
    icon: <FiBookOpen />,
    desc: 'To be a model Muslim community that positively contributes to society while preserving our core Islamic identity and moral values.',
    variant: 'accent',
  },
  {
    id: 3,
    title: 'Core Values',
    icon: <FiHeart />,
    desc: 'Compassion, integrity, mutual respect, and the continuous pursuit of knowledge are the fundamental pillars of our congregation.',
    variant: 'success',
  },
];

const TEAM = [
  {
    id: 1,
    name: 'Imam Ahmad Raza',
    role: 'Head Imam & Scholar',
    imagePosition: '50% center',
  },
  {
    id: 2,
    name: 'Tariq Mahmood',
    role: 'Committee President',
    imagePosition: '42% center',
  },
  {
    id: 3,
    name: 'Dr. Salman Khan',
    role: 'Head of Education',
    imagePosition: '58% center',
  },
  {
    id: 4,
    name: 'Zainab Ali',
    role: "Women's Coordinator",
    imagePosition: '65% center',
  },
];

const HISTORY_POINTS = [
  'Daily prayers and Jumu’ah services',
  'Madrasa and Islamic education',
  'Community outreach and support',
  'A welcoming place for families and neighbors',
];

const sectionTitle =
  'text-2xl font-bold tracking-tight text-[#133d31] sm:text-3xl dark:text-white';

const About = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8f4] text-[#163c31] dark:bg-slate-950 dark:text-white">
      {/* PAGE HERO */}
      <section className="relative overflow-hidden bg-[#083f30]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Faizan E Madina Sunni Masjid"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#063b2d]/95 via-[#063b2d]/88 to-[#063b2d]/62" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(214,184,79,0.20),transparent_24%)]" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#dfbd4f]" />
              About Our Masjid
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              A spiritual home built on faith, knowledge & community.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-100 sm:text-base">
              Learn about our history, our purpose, and the people dedicated to
              serving the Faizan E Madina Sunni Masjid community.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#dfbd4f] px-5 py-3 text-sm font-bold text-[#153b30] transition hover:bg-[#e7cb70]"
              >
                Contact Management
                <FiArrowRight />
              </Link>

              <Link
                to="/donate"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Support Our Masjid
                <FiHeart />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STORY / HISTORY */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[28px] border border-[#e4ebe6] bg-white shadow-[0_20px_55px_rgba(15,81,50,0.10)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_20px_55px_rgba(0,0,0,0.22)]">
                <img
                  src={heroImage}
                  alt="Faizan E Madina Sunni Masjid"
                  className="h-[360px] w-full object-cover sm:h-[430px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063b2d]/75 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/20 p-4 text-white backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                    Our History
                  </p>
                  <p className="mt-1 text-sm font-bold sm:text-base">
                    Building a spiritual home for generations to come.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-5 right-4 hidden rounded-2xl border border-[#e7dfc9] bg-[#fffdf7] p-4 shadow-[0_18px_45px_rgba(13,70,52,0.14)] sm:block md:right-6 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <IconCircle icon={<FiAward />} variant="accent" size="sm" />
                  <div>
                    <p className="text-lg font-bold text-[#173d31] dark:text-white">
                      15+ Years
                    </p>
                    <p className="text-[11px] font-semibold text-[#7a8782] dark:text-slate-400">
                      Of Community Service
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-3 inline-flex rounded-full bg-[#edf6f1] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#0d6a4d] dark:bg-emerald-950/45 dark:text-emerald-300">
                Our Story
              </div>

              <h2 className={sectionTitle}>
                Growing from a small gathering into a vibrant community hub.
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-[#65736d] dark:text-slate-300">
                <p>
                  Founded in 2009, Faizan E Madina Sunni Masjid started as a
                  small gathering of dedicated families who wanted to establish
                  a place of worship and Islamic education for their children.
                  Over the years, by the grace of Allah, our congregation has
                  grown exponentially.
                </p>

                <p>
                  Today, we serve hundreds of community members every week
                  through our daily prayers, Jumu&apos;ah services, Madrasa
                  classes, and community outreach programs. We are more than
                  just a place to pray; we are a vibrant hub for social
                  connection, learning, and mutual support.
                </p>

                <p>
                  Our doors are open to everyone. Whether you are a lifelong
                  Muslim, someone interested in learning about Islam, or a
                  neighbor looking to connect, you will find a welcoming family
                  here.
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {HISTORY_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl border border-[#e6ece8] bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <FiCheckCircle className="mt-0.5 shrink-0 text-[#0d6a4d] dark:text-emerald-300" />
                    <span className="text-xs font-semibold leading-5 text-[#4e635b] dark:text-slate-300">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="bg-white py-16 sm:py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mb-3 inline-flex rounded-full bg-[#fff7e6] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#a57713]">
              Our Purpose
            </div>
            <h2 className={sectionTitle}>What guides our community</h2>
            <p className="mt-3 text-sm leading-6 text-[#738079] dark:text-slate-400">
              Faith, education, service, and compassion shape everything we do
              at Faizan E Madina.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Card
                  hover
                  className="h-full border-[#e7ece8] p-6 text-center dark:border-slate-800"
                >
                  <IconCircle
                    icon={value.icon}
                    variant={value.variant}
                    size="lg"
                    className="mx-auto mb-5"
                  />

                  <h3 className="text-lg font-bold text-[#193e32] dark:text-white">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#697771] dark:text-slate-400">
                    {value.desc}
                  </p>

                  <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-[#dfbd4f]" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 flex flex-col gap-4 border-b border-[#e4eae6] pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
            <div>
              <div className="mb-3 inline-flex rounded-full bg-[#edf6f1] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#0d6a4d] dark:bg-emerald-950/45 dark:text-emerald-300">
                Leadership
              </div>
              <h2 className={sectionTitle}>Meet Our Team</h2>
              <p className="mt-2 max-w-xl text-sm text-[#78847f] dark:text-slate-400">
                The dedicated individuals serving our community.
              </p>
            </div>

            <Link to="/contact">
              <Button
                variant="outline"
                size="sm"
                iconRight={<FiArrowRight />}
              >
                Contact Management
              </Button>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member, index) => (
              <motion.article
                key={member.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group overflow-hidden rounded-[24px] border border-[#e5ebe7] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="relative h-56 overflow-hidden bg-[#edf6f1] dark:bg-emerald-950/30">
                  <img
                    src={heroImage}
                    alt={member.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    style={{ objectPosition: member.imagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#063b2d]/70 via-transparent to-transparent" />

                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-[#184638]">
                    Community Leadership
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-[#193e32] dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[#0d6a4d] dark:text-emerald-300">
                    {member.role}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Volunteer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mt-12 overflow-hidden rounded-[28px] bg-[#0a4e3b] p-7 text-center text-white shadow-[0_20px_55px_rgba(10,78,59,0.18)] sm:p-10"
          >
            <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#0d6a4d] opacity-40 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[#063428] opacity-50 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl text-[#dfbd4f]">
                <FiUsers />
              </div>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Want to make a difference?
              </h2>

              <p className="mt-3 text-sm leading-7 text-emerald-100">
                We are always looking for passionate volunteers to help with
                events, Madrasa, and community outreach programs.
              </p>

              <Link to="/contact" className="mt-6 inline-flex">
                <Button
                  variant="accent"
                  size="lg"
                  icon={<FiUsers />}
                >
                  Become a Volunteer
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
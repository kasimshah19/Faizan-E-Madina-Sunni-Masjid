import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiInfo,
  FiMapPin,
  FiSearch,
} from 'react-icons/fi';

import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import heroImage from '../../assets/images/Home.jpeg';

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Weekly Jummah Bayan',
    date: '31 May 2024',
    time: '12:00 PM - 01:00 PM',
    location: 'Main Prayer Hall',
    description:
      'Join us for the weekly inspiring Jummah sermon delivered by our resident Imam, focusing on community building and spiritual growth.',
    category: 'Sermon',
    imagePosition: 'center',
  },
  {
    id: 2,
    title: 'Eid-ul-Adha Prayer & Gathering',
    date: '17 June 2024',
    time: '06:30 AM - 09:00 AM',
    location: 'Masjid Open Ground',
    description:
      "Celebrate Eid-ul-Adha with the community. Two jama'ats will be held. Please bring your own prayer mats.",
    category: 'Festival',
    imagePosition: '45% center',
  },
  {
    id: 3,
    title: 'Annual Quran Recitation Competition',
    date: '15 July 2024',
    time: '10:00 AM - 02:00 PM',
    location: 'Community Hall',
    description:
      'Encouraging the youth to connect with the Quran. Categories are available for different age groups with prizes for top reciters.',
    category: 'Education',
    imagePosition: '60% center',
  },
  {
    id: 4,
    title: "Sisters' Islamic Workshop",
    date: '25 July 2024',
    time: '02:00 PM - 04:30 PM',
    location: "Women's Section (1st Floor)",
    description:
      'An exclusive workshop for sisters covering Fiqh issues, family life in Islam, and interactive Q&A sessions.',
    category: 'Workshop',
    imagePosition: '70% center',
  },
];

const PAST_EVENTS = [
  {
    id: 5,
    title: 'Ramadan Community Iftar',
    date: '20 March 2024',
    time: '06:30 PM',
    location: 'Masjid Ground',
    description:
      'Over 500 community members joined us for a blessed evening of breaking the fast together.',
    category: 'Community',
    imagePosition: '30% center',
  },
  {
    id: 6,
    title: 'Youth Career Counseling Seminar',
    date: '10 February 2024',
    time: '11:00 AM',
    location: 'Seminar Room',
    description:
      'Professionals from various fields guided our youth on navigating career choices while maintaining Islamic values.',
    category: 'Education',
    imagePosition: '78% center',
  },
];

const CATEGORY_FILTERS = [
  'All',
  'Sermon',
  'Festival',
  'Education',
  'Workshop',
  'Community',
];

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleEvents = activeTab === 'upcoming' ? UPCOMING_EVENTS : PAST_EVENTS;

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return visibleEvents.filter((event) => {
      const categoryMatches =
        activeCategory === 'All' || event.category === activeCategory;

      const queryMatches =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query);

      return categoryMatches && queryMatches;
    });
  }, [activeCategory, searchQuery, visibleEvents]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8f4] text-[#163c31] dark:bg-slate-950 dark:text-white">
      {/* PAGE HERO */}
      <section className="relative overflow-hidden bg-[#083f30]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#063b2d]/95 via-[#063b2d]/88 to-[#063b2d]/60" />
        </div>

        <div className="relative mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#dfbd4f]" />
              Community Calendar
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Community Events
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-100 sm:text-base">
              Join us in our upcoming gatherings, workshops, and festivals.
              Strengthen your faith and build lasting bonds within the
              community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1320px] rounded-[24px] border border-[#e5ebe7] bg-white p-3 shadow-[0_18px_45px_rgba(15,81,50,0.08)] dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <button
                type="button"
                onClick={() => setActiveTab('upcoming')}
                className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                  activeTab === 'upcoming'
                    ? 'bg-[#0d6a4d] text-white shadow-md shadow-[#0d6a4d]/15'
                    : 'bg-[#f4f7f4] text-[#63736c] hover:bg-[#edf4ef] dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                Upcoming Events
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('past')}
                className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                  activeTab === 'past'
                    ? 'bg-[#0d6a4d] text-white shadow-md shadow-[#0d6a4d]/15'
                    : 'bg-[#f4f7f4] text-[#63736c] hover:bg-[#edf4ef] dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                Past Events
              </button>
            </div>

            <div className="relative w-full lg:max-w-xs">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8b9892] dark:text-slate-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search events..."
                aria-label="Search events"
                className="w-full rounded-xl border border-[#dfe7e2] bg-[#fbfcfa] py-3 pl-10 pr-4 text-sm text-[#173d31] outline-none transition placeholder:text-[#a0aaa5] focus:border-[#0d6a4d] focus:ring-2 focus:ring-[#0d6a4d]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {CATEGORY_FILTERS.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold transition ${
                    active
                      ? 'bg-[#fff7e6] text-[#9b7618] ring-1 ring-[#e7d6a0] dark:bg-amber-950/35 dark:text-[#e0c765] dark:ring-amber-900/40'
                      : 'bg-[#f5f7f5] text-[#6d7b75] hover:bg-[#edf2ee] dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          {filteredEvents.length > 0 ? (
            <motion.div
              key={`${activeTab}-${activeCategory}-${searchQuery}`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.07 },
                },
              }}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {filteredEvents.map((event) => (
                <motion.article
                  key={event.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45 },
                    },
                  }}
                >
                  <Card
                    hover
                    padding="p-0"
                    className="group flex h-full flex-col overflow-hidden border-[#e5ebe7] bg-white dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="relative h-52 overflow-hidden bg-[#edf6f1] sm:h-56">
                      <img
                        src={heroImage}
                        alt={event.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        style={{ objectPosition: event.imagePosition }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#063b2d]/70 via-transparent to-transparent" />

                      <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#16503d] backdrop-blur-sm dark:bg-slate-900/85 dark:text-emerald-300">
                        {event.category}
                      </span>

                      {activeTab === 'past' && (
                        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-sm">
                          <FiCheckCircle />
                          Completed
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h2 className="min-h-[52px] text-lg font-bold leading-6 text-[#193e32] transition group-hover:text-[#0d6a4d] dark:text-white dark:group-hover:text-emerald-300">
                        {event.title}
                      </h2>

                      <div className="mt-4 space-y-2.5">
                        <div className="flex items-start gap-3 text-xs text-[#6c7a74] dark:text-slate-400">
                          <FiCalendar className="mt-0.5 shrink-0 text-[#0d6a4d] dark:text-emerald-300" />
                          <span>{event.date}</span>
                        </div>

                        <div className="flex items-start gap-3 text-xs text-[#6c7a74] dark:text-slate-400">
                          <FiClock className="mt-0.5 shrink-0 text-[#0d6a4d] dark:text-emerald-300" />
                          <span>{event.time}</span>
                        </div>

                        <div className="flex items-start gap-3 text-xs text-[#6c7a74] dark:text-slate-400">
                          <FiMapPin className="mt-0.5 shrink-0 text-[#0d6a4d] dark:text-emerald-300" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="mt-4 flex-1 text-sm leading-6 text-[#738079] dark:text-slate-400">
                        {event.description}
                      </p>

                      <div className="mt-6 flex gap-2">
                        {activeTab === 'upcoming' ? (
                          <>
                            <Button
                              variant="primary"
                              size="sm"
                              fullWidth
                              icon={<FiCalendar />}
                            >
                              Register / RSVP
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            fullWidth
                            icon={<FiCheckCircle />}
                          >
                            View Gallery
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="mx-auto max-w-xl rounded-[28px] border border-[#e5ebe7] bg-white px-6 py-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf6f1] text-2xl text-[#0d6a4d] dark:bg-emerald-950/45 dark:text-emerald-300">
                <FiInfo />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#193e32] dark:text-white">
                No events found
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#78847f] dark:text-slate-400">
                Try changing the category or search term to find another event.
              </p>

              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="mt-5 text-sm font-bold text-[#0d6a4d] hover:underline dark:text-emerald-300"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* INFO STRIP */}
          {activeTab === 'upcoming' && (
            <div className="mt-10 rounded-2xl border border-[#e7dfc8] bg-[#fffdf7] p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
              <div className="flex items-start gap-3">
                <FiInfo className="mt-0.5 shrink-0 text-[#b1831e] dark:text-[#e2c66a]" />

                <div>
                  <h3 className="text-sm font-bold text-[#6f5b22] dark:text-[#ead89b]">
                    Event information
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#7c6d40] dark:text-amber-200/65">
                    Event dates and timings are based on the current community
                    calendar. Please check the event details before attending.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
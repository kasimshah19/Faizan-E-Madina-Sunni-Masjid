import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiCreditCard,
  FiDollarSign,
  FiHeart,
  FiInfo,
  FiShield,
} from 'react-icons/fi';
import { FaBook, FaBuilding, FaHandsHelping, FaMosque } from 'react-icons/fa';

import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import IconCircle from '../../components/common/IconCircle';

const FUNDS = [
  {
    id: 'general',
    name: 'General Fund',
    icon: <FaMosque />,
    desc: 'Daily masjid operations and maintenance.',
    variant: 'primary',
  },
  {
    id: 'construction',
    name: 'Construction Fund',
    icon: <FaBuilding />,
    desc: 'Building expansion and new facilities.',
    variant: 'accent',
  },
  {
    id: 'zakat',
    name: 'Zakat (Alms)',
    icon: <FaHandsHelping />,
    desc: 'Mandatory charity for eligible recipients.',
    variant: 'success',
  },
  {
    id: 'madrasa',
    name: 'Madrasa Fund',
    icon: <FaBook />,
    desc: 'Support Islamic education for children.',
    variant: 'info',
  },
];

const PRESET_AMOUNTS = [20, 50, 100, 250, 500];

const Donate = () => {
  const [selectedFund, setSelectedFund] = useState('general');
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const activeFund = useMemo(
    () => FUNDS.find((fund) => fund.id === selectedFund) || FUNDS[0],
    [selectedFund],
  );

  const handleAmountClick = (value) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (event) => {
    const value = event.target.value.replace(/[^\d.]/g, '');

    setCustomAmount(value);

    if (value && Number(value) > 0) {
      setAmount(Number(value));
    }
  };

  const formattedAmount = Number(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8f4] text-[#163c31] dark:bg-slate-950 dark:text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#083f30]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(223,189,79,0.18),transparent_24%)]" />
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#0d6a4d]/45 blur-3xl" />
        <div className="absolute -bottom-36 -right-16 h-72 w-72 rounded-full bg-[#052c22]/70 blur-3xl" />

        <div className="relative mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#dfbd4f]" />
              Support Faizan E Madina
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Every contribution helps us serve the community.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-emerald-100 sm:text-base">
              “Those who spend their wealth in the way of Allah is like a seed
              of grain that sprouts seven ears; in every ear is a hundred
              grains.” <span className="font-semibold">(Quran 2:261)</span>
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-semibold text-white backdrop-blur-md">
                <FiHeart className="text-[#dfbd4f]" />
                Give with sincerity
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-semibold text-white backdrop-blur-md">
                <FiShield className="text-[#dfbd4f]" />
                Secure payment flow
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN */}
      <section className="relative z-10 -mt-8 pb-16 pt-4 sm:pb-20">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-7 lg:grid-cols-[1.05fr_.95fr]">
            {/* DONATION FORM */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <Card className="border-[#e5ebe7] bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <div className="mb-8">
                  <div className="mb-3 inline-flex rounded-full bg-[#edf6f1] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#0d6a4d] dark:bg-emerald-950/45 dark:text-emerald-300">
                    Donation
                  </div>

                  <h2 className="text-2xl font-bold text-[#173d31] sm:text-3xl dark:text-white">
                    Make a Donation
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#75817b] dark:text-slate-400">
                    Choose where your contribution should be used and select
                    the amount that feels right for you.
                  </p>
                </div>

                <form
                  className="space-y-8"
                  onSubmit={(event) => event.preventDefault()}
                >
                  {/* FUND */}
                  <div>
                    <div className="mb-3 flex items-end justify-between gap-3">
                      <label className="block text-sm font-bold text-[#40534b] dark:text-slate-300">
                        Select a Fund
                      </label>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#84908b] dark:text-slate-500">
                        Required
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {FUNDS.map((fund) => {
                        const selected = selectedFund === fund.id;

                        return (
                          <button
                            key={fund.id}
                            type="button"
                            onClick={() => setSelectedFund(fund.id)}
                            aria-pressed={selected}
                            className={`group rounded-2xl border p-4 text-left transition-all duration-200 ${
                              selected
                                ? 'border-[#0d6a4d] bg-[#edf6f1] shadow-sm dark:border-emerald-500 dark:bg-emerald-950/35'
                                : 'border-[#e4eae6] bg-[#fbfcfa] hover:-translate-y-0.5 hover:border-[#b8d4c8] hover:shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:hover:border-emerald-900'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <IconCircle
                                icon={fund.icon}
                                variant={selected ? fund.variant : 'neutral'}
                                size="sm"
                              />

                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <h3
                                    className={`text-sm font-bold ${
                                      selected
                                        ? 'text-[#124f3c] dark:text-emerald-200'
                                        : 'text-[#334a42] dark:text-white'
                                    }`}
                                  >
                                    {fund.name}
                                  </h3>

                                  {selected && (
                                    <FiCheckCircle
                                      className="mt-0.5 shrink-0 text-[#0d6a4d] dark:text-emerald-300"
                                      aria-hidden="true"
                                    />
                                  )}
                                </div>

                                <p className="mt-1 text-[11px] leading-5 text-[#79867f] dark:text-slate-400">
                                  {fund.desc}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* AMOUNT */}
                  <div>
                    <div className="mb-3 flex items-end justify-between gap-3">
                      <label className="block text-sm font-bold text-[#40534b] dark:text-slate-300">
                        Choose Amount
                      </label>
                      <span className="text-xs font-bold text-[#0d6a4d] dark:text-emerald-300">
                        Selected: {activeFund.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                      {PRESET_AMOUNTS.map((value) => {
                        const selected = amount === value && !customAmount;

                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => handleAmountClick(value)}
                            aria-pressed={selected}
                            className={`rounded-xl border-2 px-3 py-3 text-sm font-bold transition-all sm:text-base ${
                              selected
                                ? 'border-[#0d6a4d] bg-[#0d6a4d] text-white shadow-md shadow-[#0d6a4d]/15'
                                : 'border-[#e1e8e3] bg-white text-[#52645d] hover:border-[#9fc3b3] hover:bg-[#f7faf7] dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-emerald-900'
                            }`}
                          >
                            ${value}
                          </button>
                        );
                      })}
                    </div>

                    <div className="relative mt-3">
                      <FiDollarSign
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#89958f] dark:text-slate-500"
                        aria-hidden="true"
                      />

                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        inputMode="decimal"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        aria-label="Custom donation amount"
                        className="w-full rounded-xl border border-[#dfe7e2] bg-[#fbfcfa] py-3.5 pl-10 pr-4 text-lg font-bold text-[#173d31] outline-none transition placeholder:text-sm placeholder:font-medium placeholder:text-[#a0aba6] focus:border-[#0d6a4d] focus:ring-2 focus:ring-[#0d6a4d]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10"
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f7faf7] px-4 py-3 dark:bg-slate-800">
                      <span className="text-xs font-semibold text-[#718079] dark:text-slate-400">
                        Donation amount
                      </span>
                      <span className="text-lg font-bold text-[#0d6a4d] dark:text-emerald-300">
                        ${formattedAmount}
                      </span>
                    </div>
                  </div>

                  {/* DONOR DETAILS */}
                  <div>
                    <div className="mb-3 flex items-end justify-between">
                      <label className="block text-sm font-bold text-[#40534b] dark:text-slate-300">
                        Your Details
                      </label>
                    </div>

                    {!isAnonymous && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          type="text"
                          placeholder="Full Name"
                          autoComplete="name"
                          className="w-full rounded-xl border border-[#dfe7e2] bg-[#fbfcfa] px-4 py-3.5 text-sm text-[#173d31] outline-none transition placeholder:text-[#a0aba6] focus:border-[#0d6a4d] focus:ring-2 focus:ring-[#0d6a4d]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          autoComplete="email"
                          className="w-full rounded-xl border border-[#dfe7e2] bg-[#fbfcfa] px-4 py-3.5 text-sm text-[#173d31] outline-none transition placeholder:text-[#a0aba6] focus:border-[#0d6a4d] focus:ring-2 focus:ring-[#0d6a4d]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10"
                        />
                      </div>
                    )}

                    <label className="mt-4 flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={() => setIsAnonymous((current) => !current)}
                        className="h-4 w-4 rounded border-gray-300 text-[#0d6a4d] focus:ring-[#0d6a4d] dark:border-slate-700 dark:bg-slate-900"
                      />

                      <span className="text-sm font-semibold text-[#5f7069] dark:text-slate-400">
                        Donate Anonymously
                      </span>
                    </label>
                  </div>

                  <div className="rounded-2xl border border-[#e7dfc8] bg-[#fffdf7] p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                    <div className="flex items-start gap-3">
                      <FiHeart className="mt-0.5 shrink-0 text-[#b1831e] dark:text-[#e2c66a]" />
                      <div>
                        <p className="text-sm font-bold text-[#6f5b22] dark:text-[#ead89b]">
                          Your selected donation
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#81734d] dark:text-amber-200/65">
                          ${formattedAmount} will be directed to {activeFund.name}.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    fullWidth
                    icon={<FiCreditCard />}
                  >
                    Proceed to Pay ${formattedAmount}
                  </Button>

                  <p className="flex items-center justify-center gap-2 text-center text-[11px] font-medium text-[#8a958f] dark:text-slate-500">
                    <FiCheckCircle className="text-[#0d6a4d] dark:text-emerald-400" />
                    Secure and encrypted payment gateway.
                  </p>
                </form>
              </Card>
            </motion.div>

            {/* INFORMATION */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5"
            >
              {/* FUND PROGRESS */}
              <Card className="border-[#e5ebe7] bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <div className="flex items-start gap-3">
                  <IconCircle icon={<FaBuilding />} variant="accent" size="sm" />

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a57713] dark:text-[#d8bd62]">
                      Community Project
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-[#193e32] dark:text-white">
                      Construction Fund Target
                    </h3>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-[#68766f] dark:text-slate-400">
                  We are currently expanding our community hall. Help us reach
                  our target and complete this project before Ramadan.
                </p>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-bold text-[#0d6a4d] dark:text-emerald-300">
                      $34,760
                    </p>
                    <p className="mt-1 text-xs text-[#7c8983] dark:text-slate-500">
                      raised so far
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-[#6f7c76] dark:text-slate-400">
                    of $100,000
                  </p>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#e7ede9] dark:bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '34%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="relative h-full rounded-full bg-[#0d6a4d]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </motion.div>
                </div>

                <div className="mt-2 flex justify-between text-[10px] font-bold text-[#738078] dark:text-slate-500">
                  <span>34% funded</span>
                  <span>Goal: $100,000</span>
                </div>
              </Card>

              {/* BANK DETAILS */}
              <Card className="border-[#cfe5da] bg-[#edf6f1] p-6 dark:border-emerald-900/50 dark:bg-emerald-950/30 sm:p-7">
                <div className="mb-4 flex items-center gap-3">
                  <IconCircle icon={<FaMosque />} variant="primary" size="sm" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0d6a4d] dark:text-emerald-300">
                      Alternative Donation
                    </p>
                    <h3 className="text-lg font-bold text-[#183d31] dark:text-white">
                      Direct Bank Transfer
                    </h3>
                  </div>
                </div>

                <p className="text-sm leading-6 text-[#587069] dark:text-slate-400">
                  You can also donate directly to our bank account. Please
                  mention the fund name in the payment reference.
                </p>

                <div className="mt-5 divide-y divide-[#cfe2d8] rounded-2xl border border-white/80 bg-white/65 px-4 dark:divide-emerald-900/50 dark:border-slate-800 dark:bg-slate-950/40">
                  {[
                    ['Bank Name', 'Islamic Bank'],
                    ['Account Title', 'Faizan E Madina Trust'],
                    ['Account No', '1002 3456 7890'],
                    ['Routing / BSB', '12345678'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span className="text-xs text-[#718079] dark:text-slate-500">
                        {label}
                      </span>
                      <span className="break-all text-sm font-bold text-[#23473a] sm:text-right dark:text-white">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* NOTE */}
              <div className="rounded-2xl border border-[#ead8a6] bg-[#fff8e8] p-5 dark:border-amber-900/45 dark:bg-amber-950/20">
                <div className="flex items-start gap-3">
                  <FiInfo className="mt-0.5 shrink-0 text-[#c08f20] dark:text-[#e2c66a]" />

                  <div>
                    <p className="text-sm font-bold text-[#745c1d] dark:text-[#ead89b]">
                      Important donation note
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#826f3e] dark:text-amber-200/65">
                      Donations made to Faizan E Madina Sunni Masjid are
                      processed according to the payment provider’s terms. A
                      receipt can be emailed after a successful payment.
                    </p>
                  </div>
                </div>
              </div>

              {/* TRUST */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#e5ebe7] bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <FiShield className="text-[#0d6a4d] dark:text-emerald-300" />
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#7d8984] dark:text-slate-500">
                    Secure
                  </p>
                  <p className="mt-1 text-xs font-bold text-[#193e32] dark:text-white">
                    Protected Payment
                  </p>
                </div>

                <div className="rounded-2xl border border-[#e7dfc8] bg-[#fffdf7] p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                  <FiHeart className="text-[#b1831e] dark:text-[#e2c66a]" />
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#8b7a52] dark:text-amber-200/60">
                    Purpose
                  </p>
                  <p className="mt-1 text-xs font-bold text-[#6f5b22] dark:text-[#ead89b]">
                    Community Support
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

export default Donate;
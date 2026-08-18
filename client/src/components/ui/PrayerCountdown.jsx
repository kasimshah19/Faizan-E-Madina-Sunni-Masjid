import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiMoon } from 'react-icons/fi';

const pad = (value) => String(Math.max(0, value)).padStart(2, '0');

const getTargetTimestamp = (targetTime) => {
  if (typeof targetTime === 'number') return targetTime;

  const timestamp = new Date(targetTime).getTime();
  return Number.isFinite(timestamp) ? timestamp : Date.now();
};

const PrayerCountdown = ({
  prayerName = 'Zuhr',
  targetTime,
  clockTime = '12:45 PM',
  gregorianDate = '26 May 2024',
  hijriDate = "18 Dhu'l Qadah 1445",
}) => {
  const targetTimestamp = useMemo(
    () => getTargetTimestamp(targetTime),
    [targetTime],
  );

  const calculateRemaining = () => {
    const difference = Math.max(0, targetTimestamp - Date.now());

    return {
      hours: Math.floor(difference / 3600000),
      minutes: Math.floor((difference % 3600000) / 60000),
      seconds: Math.floor((difference % 60000) / 1000),
    };
  };

  const [remaining, setRemaining] = useState(calculateRemaining);

  useEffect(() => {
    setRemaining(calculateRemaining());

    const intervalId = window.setInterval(() => {
      setRemaining(calculateRemaining());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [targetTimestamp]);

  const timerUnits = [
    ['hours', 'Hours'],
    ['minutes', 'Minutes'],
    ['seconds', 'Seconds'],
  ];

  return (
    <div className="w-full overflow-hidden rounded-[26px] border border-[#e6e0cf] bg-[#fffdf7] text-[#173d31] shadow-[0_18px_55px_rgba(11,78,59,0.13)] dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:shadow-[0_18px_55px_rgba(0,0,0,0.32)]">
      <div className="border-b border-[#ece6d5] bg-gradient-to-r from-[#fffdf7] to-[#f8fbf6] px-5 py-5 text-center dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf6f1] text-[#0d6a4d] dark:bg-emerald-950/50 dark:text-emerald-300">
          <FiMoon size={20} />
        </div>

        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#75837d] dark:text-slate-400">
          Next Prayer
        </p>

        <h3 className="mt-1 text-2xl font-bold text-[#0d6a4d] sm:text-3xl dark:text-emerald-300">
          {prayerName}
        </h3>
      </div>

      <div className="px-4 py-5 sm:px-6 sm:py-6">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-1 sm:gap-3">
          {timerUnits.map(([key, label], index) => (
            <div key={key} className="contents">
              <div className="flex min-w-0 flex-col items-center text-center">
                <span className="text-[clamp(2rem,7vw,3.3rem)] font-bold leading-none tabular-nums tracking-tight text-[#0d6a4d] dark:text-emerald-300">
                  {pad(remaining[key])}
                </span>
                <span className="mt-2 text-[9px] font-bold uppercase tracking-[0.13em] text-[#7a8781] dark:text-slate-500">
                  {label}
                </span>
              </div>

              {index < timerUnits.length - 1 && (
                <span className="pt-0 text-[clamp(1.9rem,6vw,3.1rem)] font-bold leading-none text-[#a7b4ad] dark:text-slate-600">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto my-5 h-px w-4/5 bg-[#e8ece8] dark:bg-slate-700" />

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-[#f7faf7] px-2 py-3 text-center dark:bg-slate-800">
            <FiClock className="mx-auto text-[#0d6a4d] dark:text-emerald-300" />
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#74817b] dark:text-slate-500">
              Time
            </p>
            <p className="mt-1 text-xs font-bold text-[#183e31] sm:text-sm dark:text-white">
              {clockTime}
            </p>
          </div>

          <div className="rounded-xl bg-[#f7faf7] px-2 py-3 text-center dark:bg-slate-800">
            <FiCalendar className="mx-auto text-[#0d6a4d] dark:text-emerald-300" />
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#74817b] dark:text-slate-500">
              Date
            </p>
            <p className="mt-1 text-xs font-bold text-[#183e31] sm:text-sm dark:text-white">
              {gregorianDate}
            </p>
          </div>

          <div className="rounded-xl bg-[#fff8e8] px-2 py-3 text-center dark:bg-amber-950/25">
            <span className="mx-auto block text-sm font-bold text-[#b1831e] dark:text-[#e2c66a]">
              هـ
            </span>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#8b7a52] dark:text-amber-200/60">
              Hijri
            </p>
            <p className="mt-1 text-xs font-bold text-[#6f5b22] dark:text-[#ead89b]">
              {hijriDate}
            </p>
          </div>
        </div>

        <Link
          to="/prayer-times"
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0d6a4d] px-4 py-3 text-sm font-bold text-white shadow-md shadow-[#0d6a4d]/15 transition hover:-translate-y-0.5 hover:bg-[#0a5a41] dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          <FiCalendar size={17} />
          View All Timings
        </Link>
      </div>
    </div>
  );
};

export default PrayerCountdown;
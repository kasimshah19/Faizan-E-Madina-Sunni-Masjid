import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';

const pad = (n) => String(n).padStart(2, '0');

const PrayerCountdown = ({
    prayerName = 'Zuhr',
    targetTime,
    clockTime = '12:45 PM',
    gregorianDate = '26 May 2024',
    hijriDate = '18 Dhu\'l Qadah 1445',
}) => {
    const [remaining, setRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calcRemaining = () => {
            const now = Date.now();
            const target = typeof targetTime === 'number' ? targetTime : new Date(targetTime).getTime();
            const diff = Math.max(0, target - now);

            return {
                hours: Math.floor(diff / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            };
        };

        setRemaining(calcRemaining());

        const interval = setInterval(() => {
            setRemaining(calcRemaining());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime]);

    return (
        <div className="w-full bg-[#FAF7F0] rounded-[2rem] p-6 sm:p-8 flex flex-col items-center justify-center shadow-lg border border-black/5">
            {/* Title */}
            <p className="text-sm font-semibold text-gray-900 tracking-wide">
                Next Prayer
            </p>

            {/* Prayer Name */}
            <h3 className="text-3xl sm:text-4xl font-heading font-bold text-primary mt-1 mb-6">
                {prayerName}
            </h3>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
                {/* Hours */}
                <div className="flex flex-col items-center">
                    <span className="text-4xl sm:text-5xl font-bold text-primary tabular-nums tracking-tight">
                        {pad(remaining.hours)}
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-600 mt-2">
                        Hours
                    </span>
                </div>

                {/* Colon */}
                <span className="text-4xl sm:text-5xl font-bold text-primary mb-5">
                    :
                </span>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                    <span className="text-4xl sm:text-5xl font-bold text-primary tabular-nums tracking-tight">
                        {pad(remaining.minutes)}
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-600 mt-2">
                        Minutes
                    </span>
                </div>

                {/* Colon */}
                <span className="text-4xl sm:text-5xl font-bold text-primary mb-5">
                    :
                </span>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                    <span className="text-4xl sm:text-5xl font-bold text-primary tabular-nums tracking-tight">
                        {pad(remaining.seconds)}
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-600 mt-2">
                        Seconds
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full max-w-[200px] h-[1px] bg-black/10 my-6"></div>

            {/* Date and Time Info */}
            <div className="flex flex-col items-center gap-1.5 mb-6 text-center">
                <p className="text-[15px] sm:text-base font-semibold text-gray-900">
                    {clockTime}
                </p>
                <p className="text-[15px] sm:text-base font-medium text-gray-800">
                    {gregorianDate}
                </p>
                <p className="text-[15px] sm:text-base font-medium text-gray-800">
                    {hijriDate}
                </p>
            </div>

            {/* Action Button */}
            <Link to="/prayer-times" className="w-full">
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition-all w-full text-[15px] sm:text-base shadow-md">
                    <FiCalendar size={18} />
                    View All Timings
                </button>
            </Link>
        </div>
    );
};

export default PrayerCountdown;

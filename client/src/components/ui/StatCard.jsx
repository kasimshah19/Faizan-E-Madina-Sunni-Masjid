import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2';

const StatCard = ({
    icon,
    value,
    label,
    trend,
    className = '',
}) => {
    return (
        <div
            className={`flex items-center gap-4 rounded-2xl p-5 shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
            style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
            }}
        >
            {/* Icon Circle */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 dark:bg-primary/20 shrink-0">
                <span className="text-xl text-primary dark:text-primary-light">{icon}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p
                    className="text-2xl font-heading font-bold leading-tight"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    {value}
                </p>
                <p
                    className="text-sm font-body mt-0.5"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    {label}
                </p>
            </div>

            {/* Trend Badge */}
            {trend && (
                <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold ${trend.direction === 'up'
                            ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                            : 'bg-red-500/10 text-red-600 dark:text-red-400'
                        }`}
                >
                    {trend.direction === 'up' ? (
                        <HiArrowTrendingUp className="w-3.5 h-3.5" />
                    ) : (
                        <HiArrowTrendingDown className="w-3.5 h-3.5" />
                    )}
                    {trend.value}
                </div>
            )}
        </div>
    );
};

export default StatCard;

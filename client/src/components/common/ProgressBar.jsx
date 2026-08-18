import React from 'react';

const variantStyles = {
    gold: 'bg-amber-500',
    green: 'bg-[#0F5132] dark:bg-emerald-500',
    emerald: 'bg-emerald-500',
};

const ProgressBar = ({
    value = 0,
    max = 100,
    label,
    variant = 'green',
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className="w-full">
            {label && (
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-body font-medium text-gray-900 dark:text-white">
                        {label}
                    </span>
                    <span className="text-sm font-body font-semibold text-gray-500 dark:text-gray-400">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
            <div className="w-full h-3 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700 shadow-inner">
                <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${variantStyles[variant]}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
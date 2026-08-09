const variantStyles = {
    gold: 'bg-accent',
    green: 'bg-primary',
};

const ProgressBar = ({
    value = 0,
    max = 100,
    label,
    variant = 'gold',
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className="w-full">
            {label && (
                <div className="flex items-center justify-between mb-2">
                    <span
                        className="text-sm font-body font-medium"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        {label}
                    </span>
                    <span
                        className="text-sm font-body font-semibold"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
            <div
                className="w-full h-2.5 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--color-surface-alt)' }}
            >
                <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${variantStyles[variant]}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;

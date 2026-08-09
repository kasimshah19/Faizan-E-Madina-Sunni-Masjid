const variantStyles = {
    primary: {
        bg: 'rgba(15, 81, 50, 0.12)',
        bgDark: 'rgba(27, 122, 77, 0.2)',
        text: 'text-primary dark:text-primary-light',
    },
    accent: {
        bg: 'rgba(201, 162, 39, 0.12)',
        bgDark: 'rgba(217, 184, 74, 0.2)',
        text: 'text-accent',
    },
    success: {
        bg: 'rgba(34, 197, 94, 0.12)',
        bgDark: 'rgba(34, 197, 94, 0.2)',
        text: 'text-green-600 dark:text-green-400',
    },
    error: {
        bg: 'rgba(239, 68, 68, 0.12)',
        bgDark: 'rgba(239, 68, 68, 0.2)',
        text: 'text-red-600 dark:text-red-400',
    },
    info: {
        bg: 'rgba(59, 130, 246, 0.12)',
        bgDark: 'rgba(59, 130, 246, 0.2)',
        text: 'text-blue-600 dark:text-blue-400',
    },
};

const sizeMap = {
    sm: { container: 'w-10 h-10', icon: 'text-lg' },
    md: { container: 'w-14 h-14', icon: 'text-2xl' },
    lg: { container: 'w-20 h-20', icon: 'text-3xl' },
};

const IconCircle = ({
    icon,
    variant = 'primary',
    size = 'md',
    className = '',
}) => {
    const v = variantStyles[variant] || variantStyles.primary;
    const s = sizeMap[size] || sizeMap.md;

    return (
        <div
            className={`${s.container} rounded-full flex items-center justify-center ${className}`}
            style={{ backgroundColor: v.bg }}
        >
            <span className={`${s.icon} ${v.text}`}>{icon}</span>
        </div>
    );
};

export default IconCircle;

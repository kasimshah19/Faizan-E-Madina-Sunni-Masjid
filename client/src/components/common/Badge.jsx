const variantStyles = {
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    gold: 'bg-accent/20 text-accent dark:bg-accent/10 dark:text-accent-light',
};

const Badge = ({
    children,
    variant = 'info',
    className = '',
    dot = false,
    ...props
}) => {
    return (
        <span
            className={`
        inline-flex items-center gap-1.5 px-3 py-1
        text-xs font-semibold font-body rounded-full
        ${variantStyles[variant]}
        ${className}
      `}
            {...props}
        >
            {dot && (
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
            )}
            {children}
        </span>
    );
};

export default Badge;

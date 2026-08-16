const variantStyles = {
  primary: {
    lightBg: 'bg-[#edf6f1]',
    darkBg: 'dark:bg-emerald-950/45',
    text: 'text-[#0d6a4d] dark:text-emerald-300',
    ring: 'ring-[#cfe5da] dark:ring-emerald-900',
  },
  accent: {
    lightBg: 'bg-[#fff7e6]',
    darkBg: 'dark:bg-amber-950/35',
    text: 'text-[#a57713] dark:text-[#e3c768]',
    ring: 'ring-[#ead8a6] dark:ring-amber-900',
  },
  success: {
    lightBg: 'bg-[#eef9f1]',
    darkBg: 'dark:bg-green-950/40',
    text: 'text-green-700 dark:text-green-300',
    ring: 'ring-green-200 dark:ring-green-900',
  },
  error: {
    lightBg: 'bg-red-50',
    darkBg: 'dark:bg-red-950/35',
    text: 'text-red-600 dark:text-red-300',
    ring: 'ring-red-200 dark:ring-red-900',
  },
  info: {
    lightBg: 'bg-blue-50',
    darkBg: 'dark:bg-blue-950/35',
    text: 'text-blue-600 dark:text-blue-300',
    ring: 'ring-blue-200 dark:ring-blue-900',
  },
  neutral: {
    lightBg: 'bg-gray-100',
    darkBg: 'dark:bg-slate-800',
    text: 'text-gray-700 dark:text-slate-200',
    ring: 'ring-gray-200 dark:ring-slate-700',
  },
};

const sizeMap = {
  xs: {
    container: 'h-8 w-8',
    icon: 'text-sm',
    radius: 'rounded-lg',
  },
  sm: {
    container: 'h-10 w-10',
    icon: 'text-lg',
    radius: 'rounded-xl',
  },
  md: {
    container: 'h-12 w-12 sm:h-14 sm:w-14',
    icon: 'text-xl sm:text-2xl',
    radius: 'rounded-2xl',
  },
  lg: {
    container: 'h-16 w-16 sm:h-20 sm:w-20',
    icon: 'text-2xl sm:text-3xl',
    radius: 'rounded-2xl',
  },
};

const IconCircle = ({
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  hover = false,
  bordered = false,
  onClick,
  title,
}) => {
  const variantStyle = variantStyles[variant] || variantStyles.primary;
  const sizeStyle = sizeMap[size] || sizeMap.md;
  const interactive = Boolean(onClick || hover);

  const classes = [
    'flex shrink-0 items-center justify-center',
    'transition-all duration-200 ease-out',
    sizeStyle.container,
    sizeStyle.radius,
    variantStyle.lightBg,
    variantStyle.darkBg,
    variantStyle.text,
    bordered ? 'ring-1 ring-inset' : '',
    bordered ? variantStyle.ring : '',
    interactive
      ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:translate-y-0'
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      title={title}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick(event);
              }
            }
          : undefined
      }
    >
      <span className={`${sizeStyle.icon} leading-none`}>
        {icon}
      </span>
    </div>
  );
};

export default IconCircle;
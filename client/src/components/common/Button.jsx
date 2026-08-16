import { motion } from 'framer-motion';

const BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-heading font-semibold ' +
  'outline-none select-none transition-all duration-200 ease-out ' +
  'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0d6a4d] ' +
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50';

const variants = {
  primary:
    'bg-[#0d6a4d] text-white shadow-md shadow-[#0d6a4d]/15 hover:-translate-y-0.5 hover:bg-[#0a5a41] hover:shadow-lg hover:shadow-[#0d6a4d]/20 active:translate-y-0',
  success:
    'bg-[#0d6a4d] text-white shadow-md shadow-[#0d6a4d]/15 hover:-translate-y-0.5 hover:bg-[#0a5a41] hover:shadow-lg active:translate-y-0',
  secondary:
    'border border-[#d5b353] bg-[#fffaf0] text-[#8b6715] hover:-translate-y-0.5 hover:bg-[#fff5dc] hover:shadow-md active:translate-y-0 dark:border-[#8f762f] dark:bg-[#241f10] dark:text-[#e3c768] dark:hover:bg-[#302813]',
  accent:
    'bg-[#d7b557] text-[#173c31] shadow-sm hover:-translate-y-0.5 hover:bg-[#e3c56f] hover:shadow-md active:translate-y-0',
  outline:
    'border border-[#0d6a4d]/40 bg-transparent text-[#0d6a4d] hover:-translate-y-0.5 hover:bg-[#0d6a4d]/5 hover:border-[#0d6a4d] active:translate-y-0 dark:border-emerald-400/40 dark:text-emerald-300 dark:hover:bg-emerald-400/10 dark:hover:border-emerald-300',
  ghost:
    'bg-transparent text-[#0d6a4d] hover:bg-[#0d6a4d]/8 dark:text-emerald-300 dark:hover:bg-emerald-300/10',
  light:
    'border border-gray-200 bg-white text-gray-800 shadow-sm hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800',
  danger:
    'bg-red-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md active:translate-y-0',
  warning:
    'bg-amber-500 text-[#26351f] shadow-sm hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-md active:translate-y-0',
};

const sizes = {
  xs: 'min-h-8 px-2.5 py-1.5 text-xs rounded-lg',
  sm: 'min-h-9 px-3.5 py-2 text-sm rounded-lg',
  md: 'min-h-10 px-5 py-2.5 text-sm sm:text-base rounded-xl',
  lg: 'min-h-12 px-6 py-3 text-base sm:text-lg rounded-2xl',
  icon: 'h-10 w-10 p-0 rounded-full',
};

const Spinner = ({ size = 'md' }) => (
  <svg
    className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} animate-spin`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-80"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconRight,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
  ...props
}) => {
  const safeVariant = variants[variant] ? variant : 'primary';
  const safeSize = sizes[size] ? size : 'md';
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      whileHover={{ y: isDisabled ? 0 : -1 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      className={[
        BASE,
        variants[safeVariant],
        sizes[safeSize],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? (
        <Spinner size={safeSize === 'xs' || safeSize === 'sm' ? 'sm' : 'md'} />
      ) : (
        icon
      )}

      <span className={loading ? 'opacity-80' : ''}>{children}</span>

      {!loading && iconRight}
    </motion.button>
  );
};

export default Button;
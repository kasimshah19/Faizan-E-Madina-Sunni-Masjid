import { motion } from 'framer-motion';

const BASE =
  'relative rounded-2xl border border-[#e7ece9] bg-white text-[#193e32] ' +
  'shadow-[0_10px_30px_rgba(15,81,50,0.06)] transition-all duration-300 ' +
  'dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:shadow-[0_12px_35px_rgba(0,0,0,0.18)]';

const Card = ({
  children,
  hover = false,
  className = '',
  padding = 'p-6',
  onClick,
  as = 'div',
  ...props
}) => {
  const Component = hover ? motion[as] || motion.div : as;

  const interactiveProps = hover
    ? {
        whileHover: {
          y: -4,
          transition: { duration: 0.2, ease: 'easeOut' },
        },
        whileTap: onClick
          ? {
              scale: 0.995,
            }
          : undefined,
      }
    : {};

  return (
    <Component
      onClick={onClick}
      className={[
        BASE,
        hover
          ? 'cursor-pointer hover:border-[#b9d6c9] hover:shadow-[0_18px_45px_rgba(15,81,50,0.10)] dark:hover:border-emerald-900 dark:hover:shadow-[0_18px_45px_rgba(0,0,0,0.24)]'
          : '',
        padding,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...interactiveProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
import { motion } from 'framer-motion';

const Card = ({
    children,
    hover = false,
    className = '',
    padding = 'p-6',
    onClick,
    ...props
}) => {
    const Component = hover ? motion.div : 'div';
    const motionProps = hover
        ? { whileHover: { y: -4, transition: { duration: 0.2 } } }
        : {};

    return (
        <Component
            onClick={onClick}
            className={`
        rounded-2xl shadow-md
        bg-[var(--color-surface)] border border-[var(--color-border)]
        ${hover ? 'hover:shadow-lg cursor-pointer' : ''}
        transition-all duration-200
        ${padding}
        ${className}
      `}
            {...motionProps}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Card;

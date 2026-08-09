import { FaStar, FaRegStar } from 'react-icons/fa';

const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

const StarRating = ({ rating = 0, size = 'md' }) => {
    const starSize = sizeMap[size] || sizeMap.md;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(rating)) {
            stars.push(
                <FaStar key={i} className={`${starSize} text-accent`} />
            );
        } else {
            stars.push(
                <FaRegStar
                    key={i}
                    className={starSize}
                    style={{ color: 'var(--color-border)' }}
                />
            );
        }
    }

    return <div className="inline-flex items-center gap-0.5">{stars}</div>;
};

export default StarRating;

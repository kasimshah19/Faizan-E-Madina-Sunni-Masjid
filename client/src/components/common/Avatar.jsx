import React from 'react';

const sizeMap = {
    sm: { container: 'w-8 h-8', text: 'text-xs', dot: 'w-2.5 h-2.5' },
    md: { container: 'w-10 h-10', text: 'text-sm', dot: 'w-3 h-3' },
    lg: { container: 'w-14 h-14', text: 'text-base', dot: 'w-3.5 h-3.5' },
};

const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400 dark:bg-gray-500',
};

const getInitials = (name) => {
    if (!name) return '?';
    return name
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
};

const Avatar = ({
    src,
    name = '',
    size = 'md',
    status,
    className = '',
}) => {
    const s = sizeMap[size] || sizeMap.md;

    return (
        <div className={`relative inline-flex shrink-0 ${className}`}>
            {src ? (
                <img
                    src={src}
                    alt={name}
                    className={`${s.container} rounded-full object-cover`}
                />
            ) : (
                <div
                    className={`${s.container} rounded-full flex items-center justify-center bg-emerald-700 dark:bg-emerald-600 text-white ${s.text} font-bold`}
                >
                    {getInitials(name)}
                </div>
            )}

            {status && (
                <span
                    className={`absolute bottom-0 right-0 ${s.dot} ${statusColors[status] || statusColors.offline} rounded-full ring-2 ring-white dark:ring-slate-800`}
                />
            )}
        </div>
    );
};

export default Avatar;
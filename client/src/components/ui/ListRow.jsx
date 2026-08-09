import Avatar from '../common/Avatar';

const ListRow = ({
    avatar,
    title,
    subtitle,
    value,
    meta,
    icon,
    className = '',
}) => {
    return (
        <div
            className={`flex items-center gap-4 px-4 py-3.5 transition-colors duration-150 hover:bg-[var(--color-surface-alt)] ${className}`}
            style={{ borderBottom: '1px solid var(--color-border)' }}
        >
            {/* Left: Avatar or Icon */}
            {avatar ? (
                <Avatar src={avatar.src} name={avatar.name} size="sm" />
            ) : icon ? (
                <span className="text-lg text-primary shrink-0">{icon}</span>
            ) : null}

            {/* Middle: Title + Subtitle */}
            <div className="flex-1 min-w-0">
                <p
                    className="text-sm font-body font-medium truncate"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    {title}
                </p>
                {subtitle && (
                    <p
                        className="text-xs font-body truncate"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Right: Value + Meta */}
            <div className="text-right shrink-0">
                {value && (
                    <p
                        className="text-sm font-heading font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        {value}
                    </p>
                )}
                {meta && (
                    <p
                        className="text-xs font-body"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {meta}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ListRow;

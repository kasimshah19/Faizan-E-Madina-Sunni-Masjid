const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  className = '',
  icon,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium font-body"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {icon}
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`
            w-full rounded-lg px-4 py-2.5 font-body text-base
            outline-none transition-all duration-200
            border
            focus:ring-2 focus:ring-primary/30 focus:border-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-400 focus:ring-red-300/30 focus:border-red-400' : ''}
          `}
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            borderColor: error ? undefined : 'var(--color-border)',
          }}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 font-body">{error}</p>
      )}
    </div>
  );
};

export default Input;

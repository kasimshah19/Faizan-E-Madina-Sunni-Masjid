import React from 'react';

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
          className="text-sm font-medium font-body text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg">
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
            w-full rounded-xl px-5 py-3.5 font-body text-base
            outline-none transition-all duration-200
            border bg-white dark:bg-slate-800/50
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            border-gray-200 dark:border-slate-700
            focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 dark:focus:border-emerald-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-11' : ''}
            ${error ? 'border-red-400 focus:ring-red-300/30 focus:border-red-400 dark:border-red-500' : ''}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 font-body mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
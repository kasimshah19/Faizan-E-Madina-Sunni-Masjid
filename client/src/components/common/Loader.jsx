const Loader = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          rounded-full animate-spin
          border-primary/30 border-t-primary
          ${sizeClasses[size]}
        `}
      />
    </div>
  );
};

export default Loader;

const Skeleton = ({
  width = '100%',
  height = '20px',
  rounded = 'rounded-lg',
  className = '',
  count = 1,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse ${rounded} ${className}`}
          style={{
            width,
            height,
            backgroundColor: 'var(--color-surface-alt)',
          }}
        />
      ))}
    </>
  );
};

export default Skeleton;

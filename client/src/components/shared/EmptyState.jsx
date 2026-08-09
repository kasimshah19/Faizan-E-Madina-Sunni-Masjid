import { HiOutlineInboxStack } from 'react-icons/hi2';
import Button from '../common/Button';

const EmptyState = ({
  icon: Icon = HiOutlineInboxStack,
  title = 'No data found',
  message = 'There are no items to display at the moment.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--color-surface-alt)' }}
      >
        <Icon
          className="w-8 h-8"
          style={{ color: 'var(--color-text-secondary)' }}
        />
      </div>

      <h3
        className="text-lg font-heading font-semibold mb-1"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h3>

      <p
        className="text-sm font-body max-w-sm mb-6"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {message}
      </p>

      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

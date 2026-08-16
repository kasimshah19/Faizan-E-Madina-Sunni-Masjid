import toast from 'react-hot-toast';
import {
  HiCheckCircle,
  HiXCircle,
  HiExclamationTriangle,
  HiInformationCircle,
  HiXMark,
} from 'react-icons/hi2';

const TYPE_CONFIG = {
  success: { Icon: HiCheckCircle, iconClass: 'text-green-500', barClass: 'bg-green-500' },
  error: { Icon: HiXCircle, iconClass: 'text-red-500', barClass: 'bg-red-500' },
  warning: { Icon: HiExclamationTriangle, iconClass: 'text-amber-500', barClass: 'bg-amber-500' },
  info: { Icon: HiInformationCircle, iconClass: 'text-blue-500', barClass: 'bg-blue-500' },
};

/**
 * Branded toast body rendered inside react-hot-toast's <Toaster />.
 * Don't render this directly on a page — trigger it via the
 * `showToast` helpers below, which call toast.custom() for you.
 */
const Toast = ({ t, type = 'info', message, description }) => {
  const { Icon, iconClass, barClass } = TYPE_CONFIG[type] || TYPE_CONFIG.info;

  return (
    <div
      role="status"
      className={`
        relative w-full max-w-sm overflow-hidden rounded-xl border shadow-lg
        pointer-events-auto flex items-start
        transition-all duration-300 ease-out
        ${t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
      `}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className={`absolute left-0 top-0 h-full w-1 ${barClass}`} />

      <div className="flex items-start gap-3 p-4 pl-5 flex-1 min-w-0">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconClass}`} />

        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold font-body leading-snug"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {message}
          </p>
          {description && (
            <p
              className="text-xs mt-1 font-body leading-snug"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {description}
            </p>
          )}
        </div>

        <button
          onClick={() => toast.dismiss(t.id)}
          aria-label="Dismiss notification"
          className="flex-shrink-0 p-1 -mr-1 -mt-1 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <HiXMark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/**
 * Drop-in, on-brand replacement for calling `toast.success(...)` /
 * `toast.error(...)` directly from 'react-hot-toast'.
 *
 * Usage:
 *   import { showToast } from '../../components/common/Toast';
 *   showToast.success('Saved!', 'Your changes have been updated.');
 *   showToast.error('Something went wrong', err.message);
 */
export const showToast = {
  success: (message, description) =>
    toast.custom((t) => <Toast t={t} type="success" message={message} description={description} />),
  error: (message, description) =>
    toast.custom((t) => <Toast t={t} type="error" message={message} description={description} />),
  warning: (message, description) =>
    toast.custom((t) => <Toast t={t} type="warning" message={message} description={description} />),
  info: (message, description) =>
    toast.custom((t) => <Toast t={t} type="info" message={message} description={description} />),
  dismiss: (id) => toast.dismiss(id),
};

export default Toast;
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { verifyOtp } from '../../redux/slices/authSlice';
import authService from '../../services/authService';
import Button from '../../components/common/Button';

const OTP_LENGTH = 6;
const COOLDOWN_SECONDS = 60;

const getRoleRedirect = (role) => {
  switch (role) {
    case 'admin': return '/admin/dashboard';
    case 'committee': return '/admin/dashboard';
    case 'volunteer': return '/volunteer/dashboard';
    default: return '/member/dashboard';
  }
};

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const email = location.state?.email || '';

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  // Redirect if no email
  useEffect(() => {
    if (!email) navigate('/register', { replace: true });
  }, [email, navigate]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split('').forEach((ch, i) => { newOtp[i] = ch; });
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== OTP_LENGTH) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    const result = await dispatch(verifyOtp({ email, otp: code }));
    if (verifyOtp.fulfilled.match(result)) {
      toast.success('Email verified! Welcome!');
      navigate(getRoleRedirect(result.payload.user.role), { replace: true });
    } else {
      toast.error(result.payload?.message || 'Invalid OTP');
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await authService.resendOtp({ email });
      toast.success('New OTP sent!');
      setCooldown(COOLDOWN_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } catch {
      toast.error('Failed to resend OTP. Try again later.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <span className="text-3xl">✉️</span>
          </div>
          <h1 className="text-2xl font-heading font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Verify Your Email
          </h1>
          <p className="mt-1 text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
            We sent a 6-digit code to <strong>{email}</strong>
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6 sm:p-8 shadow-lg border"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-11 h-13 sm:w-13 sm:h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    borderColor: digit ? 'var(--color-primary, #0F5132)' : 'var(--color-border)',
                  }}
                />
              ))}
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Verify Email
            </Button>
          </form>

          {/* Resend */}
          <div className="text-center mt-5">
            {cooldown > 0 ? (
              <p className="text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
                Resend code in <span className="font-semibold text-primary">{cooldown}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-sm font-semibold text-primary hover:underline cursor-pointer disabled:opacity-50"
              >
                {resending ? 'Sending...' : "Didn't receive the code? Resend"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;

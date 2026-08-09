import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { resetPassword } from '../../redux/slices/authSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const schema = yup.object({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'At least 8 characters')
    .matches(/\d/, 'Must contain at least one number'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const result = await dispatch(resetPassword({ token, newPassword: data.newPassword }));
    if (resetPassword.fulfilled.match(result)) {
      toast.success('Password reset successful! Please log in.');
      navigate('/login', { replace: true });
    } else {
      toast.error(result.payload?.message || 'Reset failed. The link may be expired.');
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
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-2xl font-heading font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Set New Password
          </h1>
          <p className="mt-1 text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
            Create a strong new password for your account
          </p>
        </div>

        <div
          className="rounded-2xl p-6 sm:p-8 shadow-lg border"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <Input
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters, 1 number"
                icon={<HiOutlineLockClosed size={18} />}
                error={errors.newPassword?.message}
                {...register('newPassword')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer"
                style={{ color: 'var(--color-text-secondary)' }}
                tabIndex={-1}
              >
                {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter your new password"
                icon={<HiOutlineLockClosed size={18} />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-9 cursor-pointer"
                style={{ color: 'var(--color-text-secondary)' }}
                tabIndex={-1}
              >
                {showConfirm ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
              </button>
            </div>

            <Button type="submit" loading={loading} className="w-full mt-2" size="lg">
              Reset Password
            </Button>
          </form>

          <p className="text-center text-sm mt-5 font-body" style={{ color: 'var(--color-text-secondary)' }}>
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Back to Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

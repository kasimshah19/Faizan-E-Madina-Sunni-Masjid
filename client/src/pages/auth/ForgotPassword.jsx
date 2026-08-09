import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineMail } from 'react-icons/hi';
import { forgotPassword } from '../../redux/slices/authSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useState } from 'react';

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email address'),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const result = await dispatch(forgotPassword(data));
    if (forgotPassword.fulfilled.match(result)) {
      setSent(true);
      toast.success('If this email exists, a reset link has been sent.');
    } else {
      toast.error(result.payload?.message || 'Something went wrong');
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
            <span className="text-3xl">🔑</span>
          </div>
          <h1 className="text-2xl font-heading font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Forgot Password
          </h1>
          <p className="mt-1 text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
            Enter your email and we&#39;ll send a reset link
          </p>
        </div>

        <div
          className="rounded-2xl p-6 sm:p-8 shadow-lg border"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {sent ? (
            <div className="text-center py-4 space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 text-2xl mb-2">
                ✅
              </div>
              <h3 className="text-lg font-heading font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Check Your Email
              </h3>
              <p className="text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
                If this email is registered, you will receive a password reset link shortly.
              </p>
              <Link to="/login" className="inline-block text-sm font-semibold text-primary hover:underline mt-2">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  icon={<HiOutlineMail size={18} />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Button type="submit" loading={loading} className="w-full" size="lg">
                  Send Reset Link
                </Button>
              </form>

              <p className="text-center text-sm mt-5 font-body" style={{ color: 'var(--color-text-secondary)' }}>
                Remember your password?{' '}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

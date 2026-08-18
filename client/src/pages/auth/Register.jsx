import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi';

import { registerUser } from '../../redux/slices/authSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const LOGO_SRC = '/faizan-logo.png';

const schema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'At least 2 characters'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'At least 8 characters')
    .matches(/\d/, 'Must contain at least one number'),

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const result = await dispatch(
      registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      }),
    );

    if (registerUser.fulfilled.match(result)) {
      toast.success('OTP sent! Check your email.');

      navigate('/verify-otp', {
        state: { email: data.email },
      });
    } else {
      toast.error(result.payload?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8f4] px-4 py-8 text-[#163c31] transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-lg items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* Brand */}
          <div className="mb-7 text-center sm:mb-8">
            <Link
              to="/"
              aria-label="Faizan E Madina Sunni Masjid home"
              className="inline-flex flex-col items-center"
            >
              <span className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-[22px] border border-[#dce7e1] bg-white p-1.5 shadow-[0_12px_35px_rgba(13,106,77,0.12)] dark:border-slate-700 dark:bg-slate-900">
                <img
                  src={LOGO_SRC}
                  alt="Faizan E Madina Sunni Masjid"
                  className="h-full w-full object-contain"
                />
                <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-white bg-[#d7b557] dark:border-slate-900" />
              </span>
            </Link>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#123d30] dark:text-white">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-[#708079] dark:text-slate-400">
              Join Faizan E Madina Sunni Masjid
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-[28px] border border-[#e0e9e4] bg-white p-6 shadow-[0_20px_60px_rgba(16,81,50,0.08)] dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                icon={<HiOutlineUser size={18} />}
                error={errors.fullName?.message}
                {...register('fullName')}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<HiOutlineMail size={18} />}
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters, 1 number"
                  icon={<HiOutlineLockClosed size={18} />}
                  error={errors.password?.message}
                  {...register('password')}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                  className="absolute right-3 top-9 flex h-9 w-9 items-center justify-center rounded-lg text-[#74827b] transition hover:bg-[#f2f6f3] hover:text-[#0d6a4d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d6a4d]/20 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-300"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff size={18} />
                  ) : (
                    <HiOutlineEye size={18} />
                  )}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  icon={<HiOutlineLockClosed size={18} />}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm((current) => !current)}
                  aria-label={
                    showConfirm
                      ? 'Hide confirm password'
                      : 'Show confirm password'
                  }
                  className="absolute right-3 top-9 flex h-9 w-9 items-center justify-center rounded-lg text-[#74827b] transition hover:bg-[#f2f6f3] hover:text-[#0d6a4d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d6a4d]/20 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-300"
                >
                  {showConfirm ? (
                    <HiOutlineEyeOff size={18} />
                  ) : (
                    <HiOutlineEye size={18} />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
                className="mt-2"
              >
                Create Account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-[#708079] dark:text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-[#0d6a4d] hover:underline dark:text-emerald-300"
              >
                Sign In
              </Link>
            </p>
          </div>

          <p className="mt-5 text-center text-[11px] font-medium text-[#8b9792] dark:text-slate-500">
            Faizan E Madina Sunni Masjid
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
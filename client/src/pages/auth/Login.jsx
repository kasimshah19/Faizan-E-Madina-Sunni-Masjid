import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi';

import { loginUser, setAccessToken } from '../../redux/slices/authSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const LOGO_SRC = '/faizan-logo.png';

const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup.string().required('Password is required'),
});

const getRoleRedirect = (role) => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'committee':
      return '/admin/dashboard';
    case 'volunteer':
      return '/volunteer/dashboard';
    default:
      return '/member/dashboard';
  }
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      toast.success('Login successful!');

      const from =
        location.state?.from?.pathname ||
        getRoleRedirect(result.payload.user.role);

      navigate(from, { replace: true });
    } else {
      const msg = result.payload?.message || 'Login failed';

      toast.error(msg);

      if (msg.toLowerCase().includes('verify')) {
        toast('Redirecting to verification...', {
          icon: '📧',
          duration: 2000,
        });

        setTimeout(() => {
          navigate('/verify-otp', {
            state: { email: data.email },
          });
        }, 2000);
      }
    }
  };

  // ── Dev-only quick login ──
  const handleDevLogin = (role) => {
    const mockUsers = {
      admin: { id: 'dev-admin-001', fullName: 'Dev Admin', email: 'admin@dev.local', role: 'admin' },
      member: { id: 'dev-member-001', fullName: 'Dev Member', email: 'member@dev.local', role: 'member' },
      volunteer: { id: 'dev-volunteer-001', fullName: 'Dev Volunteer', email: 'volunteer@dev.local', role: 'volunteer' },
    };

    // Dispatch directly to Redux store — bypasses API entirely
    dispatch({
      type: 'auth/login/fulfilled',
      payload: {
        accessToken: 'dev-mock-token-' + role,
        user: mockUsers[role],
      },
    });

    toast.success(`Dev login as ${role}`);
    navigate(getRoleRedirect(role), { replace: true });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f8f4] px-4 py-8 text-[#163c31] transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
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
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-[#708079] dark:text-slate-400">
              Sign in to your account
            </p>
          </div>

          {/* Card */}
          <div className="rounded-[28px] border border-[#e0e9e4] bg-white p-6 shadow-[0_20px_60px_rgba(16,81,50,0.08)] dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  placeholder="Enter your password"
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

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-[#0d6a4d] hover:underline dark:text-emerald-300"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
              >
                Sign In
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-[#708079] dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-[#0d6a4d] hover:underline dark:text-emerald-300"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* ── Dev Quick Login (only in development) ── */}
          {import.meta.env.DEV && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 rounded-2xl border border-dashed border-amber-300 bg-amber-50/60 p-4 dark:border-amber-700 dark:bg-amber-950/30"
            >
              <p className="mb-3 text-center text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                ⚡ Dev Quick Login
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDevLogin('admin')}
                  className="flex-1 rounded-xl bg-primary px-3 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Admin
                </button>
                <button
                  onClick={() => handleDevLogin('member')}
                  className="flex-1 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Member
                </button>
                <button
                  onClick={() => handleDevLogin('volunteer')}
                  className="flex-1 rounded-xl bg-violet-600 px-3 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Volunteer
                </button>
              </div>
            </motion.div>
          )}

          <p className="mt-5 text-center text-[11px] font-medium text-[#8b9792] dark:text-slate-500">
            Faizan E Madina Sunni Masjid
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
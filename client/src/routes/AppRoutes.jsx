import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Public pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import Donate from '../pages/public/Donate';
import Events from '../pages/public/Events';
import FAQ from '../pages/public/FAQ';
import Gallery from '../pages/public/Gallery';
import IslamicEducation from '../pages/public/IslamicEducation';
import PrayerTimings from '../pages/public/PrayerTimings';
import Testimonials from '../pages/public/Testimonials';
import VerifyCertificate from '../pages/public/VerifyCertificate';

import PublicLayout from '../layouts/PublicLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import VerifyOtp from '../pages/auth/VerifyOtp';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import StyleGuide from '../pages/StyleGuide';

import Unauthorized from '../pages/errors/Unauthorized';
import NotFound from '../pages/errors/NotFound';
import ServerError from '../pages/errors/ServerError';

// Route chunks
import AdminRoutes from './AdminRoutes';
import MemberRoutes from './MemberRoutes';
import VolunteerRoutes from './VolunteerRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public Auth Routes ── */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* ── Public Pages (with Header + Footer) ── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/events" element={<Events />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/education" element={<IslamicEducation />} />
        <Route path="/prayer-times" element={<PrayerTimings />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/verify/:certificateNumber" element={<VerifyCertificate />} />
        <Route path="/style-guide" element={<StyleGuide />} />
      </Route>

      {/* ── Protected Route Groups ── */}

      {/* Admin / Committee / Developer */}
      <Route element={<ProtectedRoute allowedRoles={['admin', 'committee']} />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>

      {/* Member */}
      <Route element={<ProtectedRoute allowedRoles={['member', 'admin', 'committee']} />}>
        <Route path="/member/*" element={<MemberRoutes />} />
      </Route>

      {/* Volunteer */}
      <Route element={<ProtectedRoute allowedRoles={['volunteer', 'admin', 'committee']} />}>
        <Route path="/volunteer/*" element={<VolunteerRoutes />} />
      </Route>

      {/* ── Error Pages ── */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;


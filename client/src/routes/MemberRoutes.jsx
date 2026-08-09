import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from '../pages/member/Dashboard';
import Profile from '../pages/member/Profile';
import Settings from '../pages/member/Settings';
import DonationHistory from '../pages/member/DonationHistory';
import Receipts from '../pages/member/Receipts';
import EventRegistration from '../pages/member/EventRegistration';
import Certificates from '../pages/member/Certificates';
import VolunteerRequest from '../pages/member/VolunteerRequest';
import Notifications from '../pages/member/Notifications';

const MemberRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="donations" element={<DonationHistory />} />
      <Route path="receipts" element={<Receipts />} />
      <Route path="events" element={<EventRegistration />} />
      <Route path="certificates" element={<Certificates />} />
      <Route path="volunteer" element={<VolunteerRequest />} />
      <Route path="notifications" element={<Notifications />} />

      {/* Redirect /member to /member/dashboard */}
      <Route path="" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default MemberRoutes;

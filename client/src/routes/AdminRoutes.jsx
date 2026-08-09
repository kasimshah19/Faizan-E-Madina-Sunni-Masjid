import { Routes, Route, Navigate } from 'react-router-dom';

// Placeholder imports for Admin pages
import Dashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import Members from '../pages/admin/Members';
import Volunteers from '../pages/admin/Volunteers';
import CommitteeMembers from '../pages/admin/CommitteeMembers';
import Donations from '../pages/admin/Donations';
import FinancialReports from '../pages/admin/FinancialReports';
import EventsManage from '../pages/admin/EventsManage';
import PrayerTimingsManage from '../pages/admin/PrayerTimingsManage';
import GalleryManage from '../pages/admin/GalleryManage';
import Announcements from '../pages/admin/Announcements';
import ContactMessages from '../pages/admin/ContactMessages';
import Madrasa from '../pages/admin/Madrasa';
import Analytics from '../pages/admin/Analytics';
import AuditLogs from '../pages/admin/AuditLogs';
import WebsiteSettings from '../pages/admin/WebsiteSettings';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="members" element={<Members />} />
      <Route path="volunteers" element={<Volunteers />} />
      <Route path="committee" element={<CommitteeMembers />} />
      <Route path="donations" element={<Donations />} />
      <Route path="donations/reports" element={<FinancialReports />} />
      <Route path="events" element={<EventsManage />} />
      <Route path="prayers" element={<PrayerTimingsManage />} />
      <Route path="gallery" element={<GalleryManage />} />
      <Route path="announcements" element={<Announcements />} />
      <Route path="messages" element={<ContactMessages />} />
      <Route path="madrasa" element={<Madrasa />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="audit" element={<AuditLogs />} />
      <Route path="settings" element={<WebsiteSettings />} />

      {/* Redirect /admin to /admin/dashboard */}
      <Route path="" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;

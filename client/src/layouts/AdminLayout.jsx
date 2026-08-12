import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import {
  HiOutlineHome, // Represents Dashboard
  HiOutlineUsers, // Users/Permissions
  HiOutlineCalendar, // Events
  HiOutlineSpeakerphone, // Announcements
  HiOutlineAcademicCap, // Madrasa
  HiOutlineCurrencyDollar, // Donations
  HiOutlineBriefcase, // Committee/Volunteers
  HiOutlineShieldCheck, // Audit Logs
} from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { clearCredentials } from '../redux/slices/authSlice';

const adminNavItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: <HiOutlineHome /> },
  { path: '/admin/users', label: 'Users & Roles', icon: <HiOutlineUsers /> },
  { path: '/admin/events', label: 'Events', icon: <HiOutlineCalendar /> },
  { path: '/admin/announcements', label: 'Announcements', icon: <HiOutlineSpeakerphone /> },
  { path: '/admin/madrasa', label: 'Madrasa', icon: <HiOutlineAcademicCap /> },
  { path: '/admin/donations', label: 'Donations', icon: <HiOutlineCurrencyDollar /> },
  { path: '/admin/committee', label: 'Committee', icon: <HiOutlineBriefcase /> },
  { path: '/admin/audit', label: 'Audit Logs', icon: <HiOutlineShieldCheck /> },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  // Safe extraction matching Redux state structure typical in Phase 1
  const user = useSelector((state) => state.auth?.user || { name: 'Admin', role: 'admin' });

  const handleLogout = () => {
    dispatch(clearCredentials());
    // Optionally redirect via useNavigate, but typical Redux auth router handles it
  };

  return (
    <div className="flex h-screen bg-bg-main overflow-hidden font-body">
      {/* 
        Using the pre-existing Sidebar Component exactly as-is.
        It handles its own Desktop, Tablet, and Mobile drawer states securely.
      */}
      <Sidebar
        items={adminNavItems}
        activeItem="/admin/dashboard" // Default active item for demo/layout wrapper
        user={user}
        onLogout={handleLogout}
        logo={<span className="text-2xl">🕌</span>}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

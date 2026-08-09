import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from '../pages/volunteer/Dashboard';
import AssignedTasks from '../pages/volunteer/AssignedTasks';
import DutySchedule from '../pages/volunteer/DutySchedule';
import Attendance from '../pages/volunteer/Attendance';
import CompletedTasks from '../pages/volunteer/CompletedTasks';

const VolunteerRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="tasks" element={<AssignedTasks />} />
      <Route path="schedule" element={<DutySchedule />} />
      <Route path="attendance" element={<Attendance />} />
      <Route path="history" element={<CompletedTasks />} />

      {/* Redirect /volunteer to /volunteer/dashboard */}
      <Route path="" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default VolunteerRoutes;

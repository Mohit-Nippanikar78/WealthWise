import React from 'react';
import Sidebar from './Sidebar';
import DashboardTour from './DashboardTour';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <DashboardTour>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="ml-64">
          {children}
        </div>
      </div>
    </DashboardTour>
  );
};

export default DashboardLayout; 
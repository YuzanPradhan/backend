import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "./DashboardLayout.css";

export const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Set default to true for desktop

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="dashboard-main">
        <main className="dashboard-content">
          <div className="dashboard-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

import {
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
  X,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../stores/AuthContext";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Employees", href: "/employees", icon: Users, roles: ["Admin"] },
    { name: "Reviews", href: "/reviews", icon: ClipboardList },
    { name: "Settings", href: "/settings", icon: Settings },
  ].filter(
    (item) => !item.roles || item.roles?.includes(user?.role?.role_name || "")
  );

  console.log("Current user role:", user?.role?.role_name);

  const handleLinkClick = () => {
    // Only close sidebar on mobile
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      <aside className={`sidebar ${!isOpen && "sidebar-closed"}`}>
        <div className="sidebar-header">
          <Link to="/" className="flex items-center" onClick={handleLinkClick}>
            <img
              src="/fuse.png"
              alt="Fuse"
              className="h-8 w-auto brightness-0"
            />
          </Link>
          <button
            onClick={onClose}
            className="sidebar-close-button"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {user && (
          <div className="sidebar-user">
            <div className="sidebar-user-info">
              <img
                src={
                  user.avatar || `https://ui-avatars.com/api/?name=${user.name}`
                }
                alt={user.name}
                className="sidebar-avatar"
              />
              <div className="sidebar-user-details">
                <div className="sidebar-user-name">{user.name}</div>
                <div className="sidebar-user-email">{user.email}</div>
              </div>
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleLinkClick}
                className={`sidebar-nav-link ${
                  isActive
                    ? "sidebar-nav-link-active"
                    : "sidebar-nav-link-inactive"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="sidebar-nav-icon" aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay - only shown on mobile */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
          role="presentation"
        />
      )}
    </>
  );
};

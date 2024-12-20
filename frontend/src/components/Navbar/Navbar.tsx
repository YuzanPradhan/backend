import { Bell, Menu, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import "./Navbar.css";
import { useNavbar } from "./hooks/useNavbar";

interface NavbarProps {
  onMenuClick: () => void;
  isMobileMenuOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onMenuClick,
  isMobileMenuOpen: propsMobileMenuOpen,
}) => {
  const {
    navbarRef,
    handleKeyPress,
    handleMobileMenuClick,
    isMobileMenuOpen,
    user,
    profileButtonRef,
    handleProfileClick,
    isProfileOpen,
    setIsProfileOpen,
    handleLogout,
  } = useNavbar({ onMenuClick, propsMobileMenuOpen });

  return (
    <nav
      className="navbar"
      ref={navbarRef}
      onKeyDown={handleKeyPress}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <div className="flex items-center gap-4">
              <button
                onClick={handleMobileMenuClick}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>

              <Link to="/" className="lg:hidden" aria-label="Home">
                <img
                  src="/fuse.png"
                  alt="Fuse Logo"
                  className="h-8 w-auto brightness-0"
                />
              </Link>
            </div>
          </div>

          <div className="navbar-desktop">
            {user && (
              <>
                <div className="navbar-notification">
                  <button
                    className="navbar-icon-button"
                    aria-label="View notifications"
                    aria-haspopup="true"
                  >
                    <Bell className="h-5 w-5" />
                    <span
                      className="notification-badge"
                      aria-label="2 unread notifications"
                    >
                      2
                    </span>
                  </button>
                </div>

                <div className="navbar-profile">
                  <button
                    ref={profileButtonRef}
                    onClick={handleProfileClick}
                    className="navbar-profile-button"
                    aria-expanded={isProfileOpen}
                    aria-haspopup="true"
                    aria-label="User menu"
                  >
                    <img
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name
                        )}`
                      }
                      alt={`${user.name}'s avatar`}
                      className="navbar-avatar"
                    />
                  </button>
                  {isProfileOpen && (
                    <div
                      className="navbar-dropdown"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div className="navbar-dropdown-header">
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="navbar-dropdown-item"
                          role="menuitem"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Your Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="navbar-dropdown-item"
                          role="menuitem"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="navbar-dropdown-item w-full text-left text-red-600 hover:text-red-700 hover:bg-red-50"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {!user && (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Sign in
                </Button>
              </Link>
            )}
          </div>

          <div className="navbar-mobile">
            {user && (
              <div className="flex items-center space-x-4">
                <button
                  className="navbar-icon-button"
                  aria-label="View notifications"
                  aria-haspopup="true"
                >
                  <Bell className="h-5 w-5" />
                  <span
                    className="notification-badge"
                    aria-label="2 unread notifications"
                  >
                    2
                  </span>
                </button>
                <button
                  onClick={handleProfileClick}
                  className="navbar-profile-button"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name
                      )}`
                    }
                    alt={`${user.name}'s avatar`}
                    className="navbar-avatar"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isProfileOpen && (
        <div
          className="navbar-mobile-dropdown"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-mobile"
        >
          <div className="navbar-dropdown-header">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <div className="py-1">
            <Link
              to="/profile"
              className="navbar-dropdown-item"
              role="menuitem"
              onClick={() => setIsProfileOpen(false)}
            >
              Your Profile
            </Link>
            <Link
              to="/settings"
              className="navbar-dropdown-item"
              role="menuitem"
              onClick={() => setIsProfileOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="navbar-dropdown-item w-full text-left text-red-600 hover:text-red-700 hover:bg-red-50"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

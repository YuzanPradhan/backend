import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/stores/AuthContext";
export const useNavbar = ({
  onMenuClick,
  propsMobileMenuOpen,
}: {
  onMenuClick: () => void;
  propsMobileMenuOpen?: boolean;
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(
    propsMobileMenuOpen ?? false
  );
  const navbarRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMobileMenuOpen(propsMobileMenuOpen ?? false);
  }, [propsMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node) &&
        !profileButtonRef.current?.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleMobileMenuClick = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    onMenuClick();
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      setIsProfileOpen(false);
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsProfileOpen(false);
    }
  };

  return {
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
  };
};

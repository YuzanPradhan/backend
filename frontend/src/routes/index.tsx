import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import { Employees } from "@/pages/Employees";
import { Login } from "@/pages/Login/Login";
import { Reviews } from "@/pages/Reviews";
import { ReviewDetail } from "@/pages/Reviews/ReviewDetail/ReviewDetail";
import { useAuth } from "@/stores/AuthContext";
import React from "react";
import { Navigate, Route, Routes } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const MainRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="reviews">
          <Route index element={<Reviews />} />
          <Route path=":employeeId" element={<ReviewDetail />} />
        </Route>
        <Route path="review-cycles" element={<div>Review Cycles Page</div>} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default MainRouter;

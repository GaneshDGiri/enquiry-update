import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import MainLayout from "../layouts/MainLayout";
import UserLogin from "../pages/UserLogin/UserLogin";
import UserRegister from "../pages/UserRegister/UserRegister";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import EnquiryPage from "../pages/EnquiryPage/EnquiryPage";
import CheckStatus from "../pages/CheckStatus/CheckStatus";
import UserProfile from "../pages/UserProfile/UserProfile";
import AdminUsers from "../pages/AdminUsers/AdminUsers";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import HelpCenter from "../pages/HelpCenter/HelpCenter";
import AdminAnalytics from "../pages/AdminAnalytics/AdminAnalytics";

const AppRoutes = () => {
  const { role } = useContext(AuthContext);
  
  // 🛠️ FIX FOR THE REFRESH BUG:
  // We check localStorage synchronously. If a token exists, we don't 
  // redirect immediately, allowing the AuthContext time to reload.
  const hasToken = localStorage.getItem("token");

  // Helper logic to verify access
  const isUser = role === "user" || (!role && hasToken);
  const isAdmin = role === "admin" || (!role && hasToken);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        
        {/* 1. APP START - Strictly force root URL to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* ============================== */}
        {/* 🔓 PUBLIC / AUTH ROUTES        */}
        {/* ============================== */}
        <Route 
          path="/login" 
          element={role === "user" ? <Navigate to="/enquiry" replace /> : <UserLogin />} 
        />
        <Route 
          path="/register" 
          element={role === "user" ? <Navigate to="/enquiry" replace /> : <UserRegister />} 
        />
        <Route 
          path="/admin-login" 
          element={role === "admin" ? <Navigate to="/admin-dashboard" replace /> : <AdminLogin />} 
        />
        
        {/* ============================== */}
        {/* 🧑‍💻 PROTECTED USER ROUTES      */}
        {/* ============================== */}
        <Route 
          path="/profile" 
          element={isUser ? <UserProfile /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/enquiry" 
          element={isUser ? <EnquiryPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/status" 
          element={isUser ? <CheckStatus /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/help" 
          element={isUser ? <HelpCenter /> : <Navigate to="/login" replace />} 
        />
        
        {/* ============================== */}
        {/* 🛡️ PROTECTED ADMIN ROUTES     */}
        {/* ============================== */}
        <Route 
          path="/admin-users" 
          element={isAdmin ? <AdminUsers /> : <Navigate to="/admin-login" replace />} 
        />
        <Route 
          path="/admin-dashboard" 
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin-login" replace />} 
        />
        <Route 
          path="/admin-analytics" 
          element={isAdmin ? <AdminAnalytics /> : <Navigate to="/admin-login" replace />} 
        />

      </Route>
    </Routes>
  );
};

export default AppRoutes;
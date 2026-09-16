import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // No login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role-based page access
  const accessRules = {
    student: [
      "/student-dashboard",
      "/dashboard",
      "/wildlife",
      "/detection",
      "/audio",
      "/history",
      "/analytics",
      "/population",
      "/habitat",
      "/reports",
      "/profile",
    ],

    research_officer: [
      "/research-officer-dashboard",
      "/dashboard",
      "/population",
      "/habitat",
      "/analytics",
      "/conservation",
      "/ecosystem-health",
      "/reports",
      "/profile",
    ],

    forest_officer: [
      "/forest-officer-dashboard",
      "/dashboard",
      "/population",
      "/habitat",
      "/conservation",
      "/ecosystem-health",
      "/reports",
      "/profile",
    ],

    admin: [
      "/dashboard",
      "/wildlife",
      "/detection",
      "/audio",
      "/history",
      "/analytics",
      "/habitat",
      "/population",
      "/conservation",
      "/ecosystem-health",
      "/reports",
      "/profile",
    ],
  };

  // Unknown role
  if (!accessRules[role]) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    return <Navigate to="/login" replace />;
  }

  // Redirect /dashboard to the correct role dashboard
  if (location.pathname === "/dashboard") {
    if (role === "student") {
      return <Navigate to="/student-dashboard" replace />;
    }

    if (role === "research_officer") {
      return <Navigate to="/research-officer-dashboard" replace />;
    }

    if (role === "forest_officer") {
      return <Navigate to="/forest-officer-dashboard" replace />;
    }
  }

  // Check whether the current role can access the page
  if (!accessRules[role].includes(location.pathname)) {
    if (role === "student") {
      return <Navigate to="/student-dashboard" replace />;
    }

    if (role === "research_officer") {
      return <Navigate to="/research-officer-dashboard" replace />;
    }

    if (role === "forest_officer") {
      return <Navigate to="/forest-officer-dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
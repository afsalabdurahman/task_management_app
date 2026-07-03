import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const user = localStorage.getItem("user");
  const isAuthenticated = !!user;
  const loading = false; // Replace with your loading state if needed

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

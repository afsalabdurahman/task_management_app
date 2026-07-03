import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
  // const isAuthenticated = true; // Replace with your auth state

  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
//   const isAuthenticated = true; // Replace with your auth state

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;


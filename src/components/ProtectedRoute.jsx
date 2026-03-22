import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const role = localStorage.getItem("role");

  // if not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // if role restriction exists
  if (roleRequired) {

    // admin can access everything
    if (role === "ADMIN") {
      return children;
    }

    // candidate trying to access admin page
    if (role !== roleRequired) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
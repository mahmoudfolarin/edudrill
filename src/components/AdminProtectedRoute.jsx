import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("admin_auth") === "true";
  const token = localStorage.getItem("admin_token");

  if (!isAuth || !token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

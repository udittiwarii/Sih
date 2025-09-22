import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return <Navigate to="/auth/login" replace />;

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <div className="p-8 text-red-500 z-10 text-center">Access Denied</div>;
  }
  return children;
}

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <p className="p-8 text-center text-slate-500">Checking your session...</p>;
  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}

export function GuestRoute() {
  const { user, loading } = useAuth();
  if (loading) return <p className="p-8 text-center text-slate-500">Checking your session...</p>;
  return user ? <Navigate to="/notes" replace /> : <Outlet />;
}

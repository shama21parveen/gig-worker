import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '@/store/app-store';

export function ProtectedRoute() {
  const session = useAppStore((state) => state.session);
  return session.isAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" replace />;
}

export function PublicRoute() {
  const session = useAppStore((state) => state.session);
  return session.isAuthenticated ? <Navigate to="/app/dashboard" replace /> : <Outlet />;
}

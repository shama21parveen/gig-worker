import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute, PublicRoute } from '@/routes/route-guards';
import { DashboardPage } from '@/pages/DashboardPage';
import { DocumentsPage } from '@/pages/DocumentsPage';
import { EarningsPage } from '@/pages/EarningsPage';
import { GrievancesPage } from '@/pages/GrievancesPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OtpVerificationPage } from '@/pages/OtpVerificationPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SafetyPage } from '@/pages/SafetyPage';
import { ShiftPlannerPage } from '@/pages/ShiftPlannerPage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/app/dashboard" replace />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to="/auth/sign-in" replace /> },
          { path: 'sign-in', element: <SignInPage /> },
          { path: 'sign-up', element: <SignUpPage /> },
          { path: 'verify', element: <OtpVerificationPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/app',
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/app/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'earnings', element: <EarningsPage /> },
          { path: 'shifts', element: <ShiftPlannerPage /> },
          { path: 'safety', element: <SafetyPage /> },
          { path: 'documents', element: <DocumentsPage /> },
          { path: 'support', element: <GrievancesPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AccountLayout, AuthLayout, CustomerLayout } from "@/layouts";
import RootLayout from "@/layouts/RootLayout";
import { PageLoader } from "@/components";
import ErrorPage from "@/pages/ErrorPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

const HomePage = lazy(() => import("@/pages/HomePage"));
const Services = lazy(() => import("@/pages/Services"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const BookingPage = lazy(() => import("@/pages/BookingPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const OrdersPage = lazy(() => import("@/pages/OrdersPage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const PaymentsPage = lazy(() => import("@/pages/PaymentsPage"));
const SupportPage = lazy(() => import("@/pages/SupportPage"));

const withSuspense = (element: ReactNode) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <CustomerLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: withSuspense(<HomePage />) },
          { path: "services", element: withSuspense(<Services />) },
          { path: "about", element: withSuspense(<AboutPage />) },
          { path: "contact", element: withSuspense(<ContactPage />) },
          {
            path: "book",
            element: (
              <ProtectedRoute>{withSuspense(<BookingPage />)}</ProtectedRoute>
            ),
          },
          {
            element: (
              <ProtectedRoute>
                <AccountLayout />
              </ProtectedRoute>
            ),
            children: [
              { path: "profile", element: withSuspense(<ProfilePage />) },
              { path: "orders", element: withSuspense(<OrdersPage />) },
              {
                path: "notifications",
                element: withSuspense(<NotificationsPage />),
              },
              { path: "settings", element: withSuspense(<SettingsPage />) },
              { path: "payments", element: withSuspense(<PaymentsPage />) },
              { path: "support", element: withSuspense(<SupportPage />) },
            ],
          },
          {
            path: "dashboard",
            element: (
              <ProtectedRoute>
                <Navigate to="/profile" replace />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: withSuspense(<LoginPage />) },
          { path: "register", element: withSuspense(<SignUpPage />) },
          {
            path: "forgot-password",
            element: withSuspense(<ForgotPasswordPage />),
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

export { default as ProtectedRoute } from "./ProtectedRoute";

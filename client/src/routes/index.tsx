import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { CustomerLayout } from "@/layouts";
import Services from "@/pages/Services";
import SignUpPage from "@/pages/SignUpPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import BookingPage from "@/pages/BookingPage";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "@/pages/ErrorPage";

const router = createBrowserRouter([
   {
  path: "/",
  element: <CustomerLayout />,
  errorElement: <ErrorPage />,

  children: [
    { index: true, element: <HomePage /> },
    { path: "services", element: <Services /> },
    { path: "about", element: <AboutPage /> },
    { path: "contact", element: <ContactPage /> },

    {
      path: "book",
      element: (
        <ProtectedRoute>
          <BookingPage />
        </ProtectedRoute>
      ),
    },
  ],
},
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },

  {
    path: "/dashboard",
    element: <DashboardPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

export { default as ProtectedRoute } from "./ProtectedRoute";
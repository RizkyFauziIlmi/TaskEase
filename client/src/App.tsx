import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import TodoPage from "./pages/todo-page";
import ProtectedAlreadyLoginRoute from "./middlewares/ProtectedAlreadyLoginRoute";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import DashboardPage from "./pages/dashboard-page";
import AdminRoute from "./middlewares/AdminRoute";
import AdminSettingsPage from "./pages/admin-settings-page";
import RequestRecoveryPage from "./pages/request-recovery-page";
import VerifyOtpPage from "./pages/verify-otp-page";
import ResetPasswordPage from "./pages/reset-password-page";
import DefaultTheme from "./middlewares/DefaultTheme";
import DocumentationPage from "./pages/documentation-page";
import FriendsPage from "./pages/friends-page";
import { DatabaseOverviewComponent } from "./components/database-overview-component";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DefaultTheme>
            <LandingPage />
          </DefaultTheme>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedAlreadyLoginRoute>
            <DefaultTheme>
              <LoginPage />
            </DefaultTheme>
          </ProtectedAlreadyLoginRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedAlreadyLoginRoute>
            <DefaultTheme>
              <SignupPage />
            </DefaultTheme>
          </ProtectedAlreadyLoginRoute>
        }
      />
      <Route
        path="/request-recovery"
        element={
          <DefaultTheme>
            <RequestRecoveryPage />
          </DefaultTheme>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <DefaultTheme>
            <VerifyOtpPage />
          </DefaultTheme>
        }
      />
      <Route
        path="/reset-password"
        element={
          <DefaultTheme>
            <ResetPasswordPage />
          </DefaultTheme>
        }
      />
      <Route path="*" element={<Navigate to={"/todo"} replace />} />
      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-settings"
        element={
          <AdminRoute>
            <AdminSettingsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/friends"
        element={
          <ProtectedRoute>
            <FriendsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documentation"
        element={
          <DefaultTheme>
            <DocumentationPage />
          </DefaultTheme>
        }
      />
      <Route
        path="/documentation/database-overview"
        element={
          <DefaultTheme>
            <DatabaseOverviewComponent />
          </DefaultTheme>
        }
      />
    </Routes>
  );
}

export default App;

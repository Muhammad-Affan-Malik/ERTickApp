import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";

/**
 * Main App Component
 * Configures routing and wraps the app with AuthProvider for global auth state
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public route - Landing page (redirects to dashboard if logged in) */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          
          {/* Protected route - Dashboard accessible only after login */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
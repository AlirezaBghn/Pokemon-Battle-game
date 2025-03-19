import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import GameSelectionPage from "./pages/GameSelectionPage.jsx";
import GuessGame from "./pages/GuessGame.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import BattleGamePage from "./pages/BattleGamePage.jsx";
import HeroSection from "./pages/heroSection.jsx";
import BattleGameLeaderboardPage from "./pages/BattleGameLeaderboardPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.jsx";
import "./i18n"; // Import i18n configuration

// Protected route wrapper - redirects to home if authenticated
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - redirect to /home if authenticated */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <HeroSection />
          </PublicRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />

      {/* All routes below require authentication */}
      <Route element={<AuthenticatedLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/game-selection" element={<GameSelectionPage />} />
        <Route path="/guessing-game" element={<GuessGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/battle-game" element={<BattleGamePage />} />
        <Route
          path="/battle-game-leaderboard"
          element={<BattleGameLeaderboardPage />}
        />
      </Route>

      {/* 404 Page - catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

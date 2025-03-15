import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import GameSelectionPage from "./pages/GameSelectionPage.jsx";
import GuessGame from "./pages/GuessGame.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import BattleGamePage from "./pages/BattleGamePage.jsx";
import BattleGameLeaderboardPage from "./pages/BattleGameLeaderboardPage.jsx";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.jsx";
import "./i18n"; // Import i18n configuration

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* All routes below require authentication */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/game-selection" element={<GameSelectionPage />} />
          <Route path="/guessing-game" element={<GuessGame />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/battle-game" element={<BattleGamePage />} />
          <Route
            path="/battle-game-leaderboard"
            element={<BattleGameLeaderboardPage />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

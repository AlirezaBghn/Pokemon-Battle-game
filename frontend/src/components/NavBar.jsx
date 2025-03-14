import { Link, useLocation } from "react-router-dom";
import SignOutButton from "./SignOutButton";

const NavBar = () => {
  const location = useLocation();
  const showGuessingGameLeaderboard = location.pathname === "/guessing-game";
  const showBattleGameLeaderboard = location.pathname === "/battle-game";

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <div>
        <Link
          to="/"
          className="px-4 py-2 bg-gray-800 border border-green-500 hover:bg-gray-700 text-lime-400 font-bold rounded"
        >
          Home
        </Link>
      </div>
      <div className="flex-1 flex justify-center space-x-4">
        {showGuessingGameLeaderboard && (
          <Link
            to="/leaderboard"
            className="bg-lime-500 text-gray-900 px-5 py-2 rounded-[10px] font-bold hover:bg-green-500 transition"
          >
            Leaderboard
          </Link>
        )}
        {showBattleGameLeaderboard && (
          <Link
            to="/battle-game-leaderboard"
            className="bg-lime-500 text-gray-900 px-5 py-2 rounded-[10px] font-bold hover:bg-green-500 transition"
          >
            Leaderboard
          </Link>
        )}
      </div>
      <SignOutButton />
    </nav>
  );
};

export default NavBar;

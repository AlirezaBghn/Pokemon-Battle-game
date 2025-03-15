import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SignOutButton from "./SignOutButton";
import LanguageSwitcher from "./LanguageSwitcher";

const NavBar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate hook
  const showGuessingGameLeaderboard = location.pathname === "/guessing-game";
  const showBattleGameLeaderboard = location.pathname === "/battle-game";
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Function to handle back navigation
  const goBack = () => {
    navigate(-1);
  };

  // Determine if the back button should be shown
  const showBackButton =
    location.pathname !== "/" &&
    location.pathname !== "/signin" &&
    location.pathname !== "/signup";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  // Also close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Button styles for consistent appearance
  const buttonClass =
    "bg-gray-800 border border-green-500 hover:bg-gray-700 text-lime-400 text-xs sm:text-sm md:text-base font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded transition-colors duration-300 flex items-center";

  return (
    <nav ref={navRef} className="bg-gray-900 p-2 sm:p-4">
      {/* Desktop Navigation */}
      <div className="hidden sm:flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={goBack}
              className={buttonClass}
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          )}
          <Link to="/" className={buttonClass}>
            {t("home")}
          </Link>
        </div>
        <div className="flex-1 flex justify-center space-x-4">
          {showGuessingGameLeaderboard && (
            <Link to="/leaderboard" className={buttonClass}>
              {t("leaderboard")}
            </Link>
          )}
          {showBattleGameLeaderboard && (
            <Link to="/battle-game-leaderboard" className={buttonClass}>
              {t("leaderboard")}
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <SignOutButton matchNavStyle={true} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Back Button (Mobile) */}
            {showBackButton && (
              <button
                onClick={goBack}
                className="text-lime-400 p-1.5 hover:bg-gray-800 rounded"
                aria-label="Go back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            )}
            {/* Home button (Mobile) */}
            <Link
              to="/"
              className="text-lime-400 font-bold text-sm hover:text-green-400 transition-colors ml-2"
            >
              {t("home")}
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-lime-400 p-1.5 hover:bg-gray-800 rounded"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - All buttons in one column */}
        {menuOpen && (
          <div className="mt-2 flex flex-col items-start space-y-2 animate-fadeIn pl-2">
            {showGuessingGameLeaderboard && (
              <Link to="/leaderboard" className={buttonClass}>
                {t("leaderboard")}
              </Link>
            )}
            {showBattleGameLeaderboard && (
              <Link to="/battle-game-leaderboard" className={buttonClass}>
                {t("leaderboard")}
              </Link>
            )}
            <div>
              <SignOutButton matchNavStyle={true} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

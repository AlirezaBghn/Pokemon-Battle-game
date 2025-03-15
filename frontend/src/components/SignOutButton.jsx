import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { backendAPI } from "../services/api";
import { useTranslation } from "react-i18next";

const SignOutButton = ({ matchNavStyle = false }) => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      await backendAPI.post("/api/logout");
      setIsAuthenticated(false);
      localStorage.removeItem("i18nextLng");
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  const buttonClass = matchNavStyle
    ? "bg-gray-800 border border-green-500 hover:bg-gray-700 text-lime-400 text-xs sm:text-sm md:text-base font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded transition-colors duration-300"
    : "bg-green-600 hover:bg-green-500 text-black font-bold text-xs sm:text-sm md:text-base py-1 sm:py-2 px-3 sm:px-4 rounded shadow-md sm:shadow-lg transition-all duration-300";

  return (
    <button onClick={handleSignOut} className={buttonClass}>
      {t("signOut")}
    </button>
  );
};

export default SignOutButton;

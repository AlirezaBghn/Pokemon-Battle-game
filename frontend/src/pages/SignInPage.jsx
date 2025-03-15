import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next"; // Import translation hook
import LanguageSwitcher from "../components/LanguageSwitcher"; // Import LanguageSwitcher

// Loader
function Loader() {
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation(); // Use translation hook

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <span className="loading loading-dots loading-xl"></span>
      <p className="text-lime-400 mt-4 text-2xl">
        {t("loading")} {progress}%
      </p>
    </div>
  );
}

function SignInPage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const { t } = useTranslation(); // Use translation hook

  // initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Verify session on mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        console.log("Verifying session...");
        const response = await backendAPI.get("/api/check-session", {
          withCredentials: true,
        });
        if (response.data.authenticated) {
          console.log("Session verified. User is authenticated.");
          setIsAuthenticated(true);
          navigate("/");
        }
      } catch (error) {
        console.error(
          "Error verifying session",
          error.response?.data || error.message
        );
      }
    };
    verifySession();
  }, [setIsAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting sign in with:", { email, password });
      const response = await backendAPI.post(
        "/api/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Sign in response:", response.data);
      if (response.data) {
        console.log("✅ User authenticated, updating state...");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.log("❌ No authentication data received.");
      }
    } catch (err) {
      console.error("Error signing in:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error signing in");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-md w-full bg-gray-900 border border-green-500 rounded-lg shadow-xl text-lime-400 p-6 sm:p-8 relative">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          {t("signIn")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 sm:mb-4">
            <label
              className="block text-gray-300 mb-2 text-sm sm:text-base"
              htmlFor="email"
            >
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              placeholder={t("enterEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 sm:p-3 rounded bg-gray-800 text-lime-400 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs sm:text-sm"
              required
            />
          </div>
          <div className="mb-5 sm:mb-6">
            <label
              className="block text-gray-300 mb-2 text-sm sm:text-base"
              htmlFor="password"
            >
              {t("password")}
            </label>
            <input
              type="password"
              id="password"
              placeholder={t("enterPassword")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 sm:p-3 rounded bg-gray-800 text-lime-400 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-black p-2 sm:p-3 rounded font-bold text-sm sm:text-base"
          >
            {t("signIn")}
          </button>
        </form>
        <p className="mt-4 sm:mt-6 text-center text-gray-400 text-sm">
          {t("dontHaveAccount")}{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            {t("signUpHere")}
          </Link>
        </p>
        {/* Language Switcher at the bottom right */}
        <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 md:top-2 md:left-2 md:bottom-auto md:right-auto">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendAPI } from "../services/api";
import { useTranslation } from "react-i18next"; // Import translation hook
import LanguageSwitcher from "../components/LanguageSwitcher"; // Import LanguageSwitcher

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation(); // Use translation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert(t("passwordsDoNotMatch"));
      return;
    }

    try {
      console.log("Sending signup request with data:", {
        username,
        email,
        password,
      });

      // Use backendAPI so that withCredentials and baseURL are applied
      await backendAPI.post("/api/register", { username, email, password });

      console.log("Attempting auto login after signup...");

      const loginResponse = await backendAPI.post(
        "/api/login",
        { email, password },
        { withCredentials: true } // Explicitly include credentials, if needed
      );

      console.log("Auto login successful, user data:", loginResponse.data);

      // Redirect to homepage after successful login
      navigate("/home");
    } catch (err) {
      console.error(
        "Error during signup:",
        err.response?.data?.message || err.message
      );
      setErrorMessage(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-md w-full bg-gray-900 border border-green-500 rounded-lg shadow-xl text-lime-400 p-6 sm:p-8 relative">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          {t("signUp")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 sm:mb-4">
            <label
              className="block text-gray-300 mb-2 text-sm sm:text-base"
              htmlFor="username"
            >
              {t("usernameField")}
            </label>
            <input
              type="text"
              id="username"
              placeholder={t("enterUsername")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 sm:p-3 rounded bg-gray-800 text-lime-400 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs sm:text-sm"
              required
            />
          </div>
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
          <div className="mb-3 sm:mb-4">
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
          <div className="mb-5 sm:mb-6">
            <label
              className="block text-gray-300 mb-2 text-sm sm:text-base"
              htmlFor="confirmPassword"
            >
              {t("confirmPassword")}
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder={t("confirmYourPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 sm:p-3 rounded bg-gray-800 text-lime-400 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs sm:text-sm"
              required
            />
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-black p-2 sm:p-3 rounded font-bold text-sm sm:text-base"
          >
            {t("signUp")}
          </button>
        </form>
        <p className="mt-4 sm:mt-6 text-center text-gray-400 text-sm">
          {t("alreadyHaveAccount")}{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            {t("signInHere")}
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

export default SignUpPage;

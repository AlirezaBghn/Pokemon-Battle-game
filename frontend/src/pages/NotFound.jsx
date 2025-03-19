import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// Custom RingLoader built with Tailwind CSS (copied from HomePage for consistency)
const RingLoader = ({
  size = "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20",
  borderWidth = "border-2 sm:border-3 md:border-4",
  color = "border-red-500", // Changed to red for 404 theme
}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${size} ${borderWidth} ${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [pokemonId, setPokemonId] = useState(94); // Default to Gengar
  const [loading, setLoading] = useState(true);

  // Show loading state initially
  useEffect(() => {
    // Simulate loading for a brief moment
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1200); // Show loader for 1.2 seconds

    return () => clearTimeout(loadingTimer);
  }, []);

  // Randomly cycle through "confused" or "error" themed Pokemon
  useEffect(() => {
    // Pokemon IDs that fit a "lost" or "error" theme: Psyduck, Gengar, MissingNo (use Porygon instead), Wobbuffet, Mimikyu
    const errorPokemon = [54, 94, 137, 202, 778];
    const randomPokemon =
      errorPokemon[Math.floor(Math.random() * errorPokemon.length)];
    setPokemonId(randomPokemon);
  }, []);

  const handleHomeClick = () => {
    // Navigate to home or landing page based on authentication status
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  // Show loading state first
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-blue-950 p-4">
        <RingLoader />
        <p className="text-lg sm:text-xl text-red-400 mt-4 animate-pulse">
          {t("loading")}...
        </p>
      </div>
    );
  }

  // Show 404 content after loading
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-blue-950 p-4 text-center">
      {/* Animated glitch effect overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 animate-glitch"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-lg">
        {/* 404 text with glitch effect */}
        <h1 className="text-8xl md:text-9xl font-bold text-red-500 mb-4 animate-pulse-text">
          404
        </h1>

        {/* Confused Pokemon */}
        <div className="mb-6 relative">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
            alt="Confused Pokemon"
            className="w-40 h-40 mx-auto animate-float-slow"
          />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t("error.pageNotFound")}
        </h2>

        <p className="text-lg text-gray-300 mb-8">
          {t("error.pageNotFoundMessage")}
        </p>

        {/* Button with pokeball design */}
        <button
          onClick={handleHomeClick}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full hover:from-red-700 hover:to-red-800 transition duration-300 shadow-lg"
        >
          <div className="w-6 h-6 mr-2 rounded-full bg-white border-2 border-black relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-0 border-b-2 border-black"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-black"></div>
          </div>
          {isAuthenticated ? t("Back To Home") : t("Get Start")}
        </button>
      </div>
    </div>
  );
};

export default NotFound;

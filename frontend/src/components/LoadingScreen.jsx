import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LoadingScreen = ({ onTimerComplete }) => {
  const { t } = useTranslation();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [pokemonIndex, setPokemonIndex] = useState(1);
  const [pageReady, setPageReady] = useState(false);

  // Get the tip for the current pokemon index with fallback
  const getCurrentTip = () => {
    const tipKey = `loading.tips.${pokemonIndex}`;
    const translation = t(tipKey);

    // Check if translation failed (returns the key itself)
    if (translation === tipKey) {
      // Return funny message instead of empty string
      return "Please wait while our Grass-type Pokémon are stuffing wood into the servers to make them run faster! 🌱🔥";
    }
    return translation;
  };

  // Check if page content is loaded
  useEffect(() => {
    // Check if document is already complete when component mounts
    if (document.readyState === "complete") {
      setPageReady(true);
    } else {
      // Add event listener for when page finishes loading
      const handleLoad = () => setPageReady(true);
      window.addEventListener("load", handleLoad);

      // Also set a minimum delay before we consider the page "ready"
      const minimumDelay = setTimeout(() => setPageReady(true), 3000);

      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(minimumDelay);
      };
    }
  }, []);

  // Timer effect for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        // If page is ready or countdown hits 1, complete the loading
        if ((pageReady && prevTime <= 25) || prevTime <= 1) {
          clearInterval(timer);
          onTimerComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Change Pokemon sprite every 3 seconds
    const pokemonTimer = setInterval(() => {
      setPokemonIndex((prev) => (prev % 6) + 1); // Cycle through 6 starter Pokemon
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(pokemonTimer);
    };
  }, [onTimerComplete, pageReady]);

  // Map of starter Pokemon to show
  const starterPokemon = {
    1: { name: "Pikachu", id: 25 },
    2: { name: "Charizard", id: 6 },
    3: { name: "Blastoise", id: 9 },
    4: { name: "Venusaur", id: 3 },
    5: { name: "Mewtwo", id: 150 },
    6: { name: "Eevee", id: 133 },
  };

  const currentPokemon = starterPokemon[pokemonIndex];

  // Calculate the percentage for progress bar
  const progressPercentage = ((30 - timeRemaining) / 30) * 100;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-blue-950 z-50">
      <div className="relative w-full max-w-md px-6 py-8 text-center">
        {/* Animated Pokemon */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png`}
              alt={currentPokemon.name}
              className="w-32 h-32 animate-bounce-slow"
            />
            <div className="absolute inset-0 bg-white opacity-0 rounded-full animate-ping-slow"></div>
          </div>
        </div>

        {/* Custom Ring Loader */}
        <div className="relative mx-auto my-8">
          {/* Outer spinning ring */}

          {/* Inner pulsing pokeball */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16"></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-white mb-4 animate-pulse-text neon-text">
          {t("loading")}
        </h2>

        {/* Timer with Progress Bar */}
        <div className="mb-4 mt-6">
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-1000 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <p className="text-lime-400 font-bold text-lg animate-pulse-text">
          {timeRemaining} {t("loading.seconds")}
        </p>

        {/* Fun pokemon tips at the bottom - using translated tips */}
        <div className="mt-8 text-gray-300 text-sm italic animate-fade-in-out">
          <p>"{getCurrentTip()}"</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

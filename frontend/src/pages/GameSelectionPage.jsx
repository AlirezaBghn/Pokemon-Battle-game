import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import { useTranslation } from "react-i18next"; // Import translation hook

// Custom RingLoader built with Tailwind CSS (no DaisyUI)
function RingLoader({
  size = "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20",
  borderWidth = "border-2 sm:border-3 md:border-4",
  color = "border-blue-500",
}) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${size} ${borderWidth} ${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}

function GameSelectionPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Use translation hook

  // Simulate a loading delay (e.g., on page refresh)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust delay duration as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="flex flex-col items-center">
          <RingLoader />
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-lime-400">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4 sm:p-6 md:p-8 font-mono flex items-center justify-center">
      <AudioPlayer url="https://kappa.vgmsite.com/soundtracks/destiny-original-soundtrack-2014/jkmpenobri/05.%20The%20Warmind.mp3" />
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-lime-400 mb-4 sm:mb-6 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          {t("selectGame")}
        </h1>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-gray-800 border border-green-500 text-lime-400 font-bold rounded shadow-lg hover:bg-gray-700 transition text-sm sm:text-base md:text-lg"
            onClick={() => navigate("/battle-game")}
          >
            {t("battleGame")}
          </button>
          <button
            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-gray-800 border border-green-500 text-lime-400 font-bold rounded shadow-lg hover:bg-gray-700 transition text-sm sm:text-base md:text-lg"
            onClick={() => navigate("/guessing-game")}
          >
            {t("guessingGame")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameSelectionPage;

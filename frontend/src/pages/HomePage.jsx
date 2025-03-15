import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AudioPlayer from "../components/AudioPlayer";

// Custom RingLoader built with Tailwind CSS
function RingLoader({
  size = "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20",
  borderWidth = "border-2 sm:border-3 md:border-4",
  color = "border-blue-500",
}) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${size} ${borderWidth} ${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}

function HomePage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate a loading delay (e.g., for page refresh)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust the duration (in ms) as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4 sm:p-6 md:p-8">
        <RingLoader />
        <p className="text-lg sm:text-xl md:text-2xl text-lime-400 mt-3 sm:mt-4">
          {t("loading")}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4 sm:p-6 md:p-8 text-center">
      <AudioPlayer url="https://kappa.vgmsite.com/soundtracks/destiny-original-soundtrack-2014/pktnwsgptz/42.%20Excerpt%202%20from%20the%20Rose.mp3" />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-lime-400 mb-6 sm:mb-8 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
        {t("welcomeTo")}
      </h1>
      <button
        className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-gray-800 border-2 sm:border-3 md:border border-green-500 text-lime-400 font-bold rounded-full shadow-xl hover:bg-gray-700 transition text-base sm:text-lg md:text-xl"
        onClick={() => navigate("/game-selection")}
      >
        {t("startGame")}
      </button>
    </div>
  );
}

export default HomePage;

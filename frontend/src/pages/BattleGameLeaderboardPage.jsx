import { useState, useEffect } from "react";
import { backendAPI } from "../services/api";
import AudioPlayer from "../components/AudioPlayer";
import { useTranslation } from "react-i18next"; // Import translation hook

// Custom RingLoader component using Tailwind CSS
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

function BattleGameLeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(); // Use translation hook

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await backendAPI.get(
          "/api/game-results?gameType=BattleGame"
        );
        // Keep only one entry per username
        const uniqueResults = Array.from(
          new Map(res.data.map((item) => [item.username, item])).values()
        );
        setLeaderboard(uniqueResults);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center text-base sm:text-lg md:text-xl text-lime-400 p-4">
        <RingLoader />
        <p className="mt-3 sm:mt-4">{t("loadingLeaderboard")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-2 sm:p-4 md:p-6 font-mono">
      <AudioPlayer url="https://kappa.vgmsite.com/soundtracks/destiny-the-taken-king-original-soundtrack/pknaantged/2-01.%20Oryx%20Ascendant.mp3" />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-lime-400 mb-3 sm:mb-4 md:mb-6 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          {t("battleGameLeaderboard")}
        </h1>

        {/* Table container with horizontal scroll on small screens */}
        <div className="bg-gray-800 p-2 sm:p-3 md:p-4 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full text-lime-400 min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-1 sm:p-2 text-sm sm:text-base md:text-lg">
                  {t("username")}
                </th>
                <th className="text-left p-1 sm:p-2 text-sm sm:text-base md:text-lg">
                  {t("userScore")}
                </th>
                <th className="text-left p-1 sm:p-2 text-sm sm:text-base md:text-lg">
                  {t("pcScore")}
                </th>
                <th className="text-left p-1 sm:p-2 text-sm sm:text-base md:text-lg">
                  {t("winner")}
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((result, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-1 sm:p-2 text-xs sm:text-sm md:text-base">
                    {result.username}
                  </td>
                  <td className="p-1 sm:p-2 text-xs sm:text-sm md:text-base">
                    {result.userScore}
                  </td>
                  <td className="p-1 sm:p-2 text-xs sm:text-sm md:text-base">
                    {result.pcScore}
                  </td>
                  <td className="p-1 sm:p-2 text-xs sm:text-sm md:text-base">
                    {result.winner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile note */}
        <p className="sm:hidden text-center text-xs text-lime-400 mt-2">
          {t("scrollHorizontally")}
        </p>
      </div>
    </div>
  );
}

export default BattleGameLeaderboardPage;

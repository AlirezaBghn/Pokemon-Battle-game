import { useEffect, useState } from "react";
import { backendAPI } from "../services/api";
import AudioPlayer from "../components/AudioPlayer";
import { useTranslation } from "react-i18next"; // Import translation hook

// Custom RingLoader component built with Tailwind CSS
function RingLoader({
  size = "w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20",
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

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(); // Use translation hook

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await backendAPI.get("/api/leaderboard");
        const deduped = Object.values(
          response.data.reduce((acc, cur) => {
            if (!acc[cur.username] || cur.score > acc[cur.username].score) {
              acc[cur.username] = cur;
            }
            return acc;
          }, {})
        );
        deduped.sort((a, b) => b.score - a.score);
        setLeaderboard(deduped);
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
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-mono">
        <RingLoader />
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-lime-400">
          {t("loadingLeaderboard")}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-2 sm:p-3 md:p-4 lg:p-6 font-mono">
      <AudioPlayer url="https://kappa.vgmsite.com/soundtracks/destiny-the-taken-king-original-soundtrack/pknaantged/2-01.%20Oryx%20Ascendant.mp3" />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-lime-400 mb-3 sm:mb-4 md:mb-6 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          {t("leaderboardTitle")}
        </h1>
        <div className="bg-gray-800 p-2 sm:p-3 md:p-4 rounded-lg shadow-lg">
          {leaderboard.length === 0 ? (
            <p className="text-center text-lime-400 text-base sm:text-lg md:text-xl py-4">
              {t("noScoresYet")}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-lime-400 min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-1 sm:p-2 text-sm sm:text-base md:text-lg">
                      {t("rank")}
                    </th>
                    <th className="text-left p-1 sm:p-2 text-sm sm:text-base md:text-lg">
                      {t("username")}
                    </th>
                    <th className="text-left p-1 sm:p-2 text-sm sm:text-base md:text-lg">
                      {t("scoreLeaderboard")}
                    </th>
                    <th className="text-left p-1 sm:p-2 text-sm sm:text-base md:text-lg">
                      {t("date")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr
                      key={entry._id || index}
                      className="border-t border-gray-700 hover:bg-gray-700"
                    >
                      <td className="p-1 sm:p-2 text-center text-xs sm:text-sm md:text-base lg:text-lg">
                        {index + 1}
                      </td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm md:text-base lg:text-lg">
                        {entry.username}
                      </td>
                      <td className="p-1 sm:p-2 text-center text-xs sm:text-sm md:text-base lg:text-lg">
                        {entry.score}
                      </td>
                      <td className="p-1 sm:p-2 text-center text-xs sm:text-sm md:text-base lg:text-lg">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Mobile note for horizontal scrolling */}
        <p className="sm:hidden text-center text-xs text-lime-400 mt-2">
          {t("scrollHorizontally")}
        </p>
      </div>
    </div>
  );
}

export default Leaderboard;

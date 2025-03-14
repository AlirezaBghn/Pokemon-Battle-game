import { useEffect, useState } from "react";
import { backendAPI } from "../services/api";
import AudioPlayer from "../components/AudioPlayer";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

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
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4 font-mono">
      <AudioPlayer url="https://kappa.vgmsite.com/soundtracks/destiny-the-taken-king-original-soundtrack/pknaantged/2-01.%20Oryx%20Ascendant.mp3" />{" "}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-lime-400 mb-6 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          🎖️ Leaderboard
        </h1>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          {leaderboard.length === 0 ? (
            <p className="text-center text-lime-400 text-xl">No scores yet!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-lime-400">
                <thead>
                  <tr>
                    <th className="text-left p-2">🏆 Rank</th>
                    <th className="text-left p-2">👤 Username</th>
                    <th className="text-left p-2">💯 Score</th>
                    <th className="text-left p-2">📅 Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr
                      key={entry._id || index}
                      className="border-t border-gray-700 hover:bg-gray-700 text-xl"
                    >
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2">{entry.username}</td>
                      <td className="p-2 text-center">{entry.score}</td>
                      <td className="p-2 text-center">
                        {new Date(entry.date).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;

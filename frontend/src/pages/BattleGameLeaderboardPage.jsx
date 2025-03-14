import { useState, useEffect } from "react";
import { backendAPI } from "../services/api";
import AudioPlayer from "../components/AudioPlayer";

function BattleGameLeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await backendAPI.get(
          "/api/game-results?gameType=BattleGame"
        );
        // keep only one entry per username
        const uniqueResults = Array.from(
          new Map(res.data.map((item) => [item.username, item])).values()
        );
        setLeaderboard(uniqueResults);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-lime-400">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4 font-mono">
      <AudioPlayer url="https://kappa.vgmsite.com/soundtracks/destiny-the-taken-king-original-soundtrack/pknaantged/2-01.%20Oryx%20Ascendant.mp3" />{" "}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-lime-400 mb-6 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          Battle Game Leaderboard
        </h1>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <table className="w-full text-lime-400">
            <thead>
              <tr>
                <th className="text-left p-2">Username</th>
                <th className="text-left p-2">User Score</th>
                <th className="text-left p-2">PC Score</th>
                <th className="text-left p-2">Winner</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((result, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="p-2">{result.username}</td>
                  <td className="p-2">{result.userScore}</td>
                  <td className="p-2">{result.pcScore}</td>
                  <td className="p-2">{result.winner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BattleGameLeaderboardPage;

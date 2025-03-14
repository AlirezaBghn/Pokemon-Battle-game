import { useNavigate } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";

function GameSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4 font-mono flex items-center justify-center">
      <AudioPlayer url="https://kappa.vgmsite.com/soundtracks/destiny-original-soundtrack-2014/jkmpenobri/05.%20The%20Warmind.mp3" />{" "}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-lime-400 mb-6 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          Select a Game
        </h1>
        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-2 bg-gray-800 border border-green-500 text-lime-400 font-bold rounded shadow-lg hover:bg-gray-700 transition"
            onClick={() => navigate("/battle-game")}
          >
            Battle Game
          </button>
          <button
            className="px-6 py-2 bg-gray-800 border border-green-500 text-lime-400 font-bold rounded shadow-lg hover:bg-gray-700 transition"
            onClick={() => navigate("/guessing-game")}
          >
            Guessing Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameSelectionPage;

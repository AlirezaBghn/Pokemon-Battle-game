import { useState, useEffect } from "react";
import { pokeAPI, backendAPI, createScore } from "../services/api";
import AudioPlayer from "../components/AudioPlayer";

function GuessGame() {
  // Game-related states
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [hint, setHint] = useState("");
  const [details, setDetails] = useState(null);
  const [message, setMessage] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [username, setUsername] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  // Chat-related states
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");


useEffect(() => {
  const getUser = async () => {
    try {
      console.log("🔍 Fetching user...");
      const res = await backendAPI.get("/api/user", { withCredentials: true });
      console.log("✅ User data:", res.data);
      setUsername(res.data.username);
    } catch (error) {
      console.error(
        "❌ Error fetching user:",
        error.response?.data?.message || error.message
      );
      setUsername("");
    } finally {
      setLoadingUser(false);
    }
  };

  getUser();
}, []);



  // Once the username is set, fetch best score and a random Pokémon.
  useEffect(() => {
    if (username) {
      fetchBestScore(username);
      fetchRandomPokemon();
    }
  }, [username]);

  // Fetch best score from your backend leaderboard.
  const fetchBestScore = async (user) => {
    try {
      const res = await backendAPI.get("/api/leaderboard");
      const userRecord = res.data.find((entry) => entry.username === user);
      setBestScore(userRecord ? userRecord.score : 0);
    } catch (error) {
      console.error("Error fetching leaderboard best score", error);
    }
  };

  // Fetch a random Pokémon from the PokéAPI.
  const fetchRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await pokeAPI.get(`/pokemon/${randomId}`);
      setCurrentPokemon(response.data);
      setHint("");
      setDetails(null);
    } catch (error) {
      console.error("Error fetching Pokémon from PokéAPI", error);
    }
  };

  // Fetch a hint using the Pokémon species endpoint.
  const handleHint = async () => {
    if (hintCount >= 3) {
      setMessage("No more hints available!");
      return;
    }
    if (!details && currentPokemon) {
      try {
        const res = await pokeAPI.get(
          `/pokemon-species/${currentPokemon.name}`
        );
        setDetails(res.data);
        const englishEntry = res.data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        setHint(
          `Hint: ${
            englishEntry ? englishEntry.flavor_text : "No hint available."
          }`
        );
      } catch (error) {
        console.error("Error fetching species details", error);
        setHint("No hint available.");
      }
    }
    setHintCount((prev) => prev + 1);
  };

  // Process the user's guess.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPokemon) return;

    let newScore = score;
    let newWrongAttempts = wrongAttempts;

    if (guess.trim().toLowerCase() === currentPokemon.name.toLowerCase()) {
      newScore += 10;
      setMessage("Correct! +10 points");
      newWrongAttempts = 0;
      setWrongAttempts(0);
    } else {
      newScore -= 10;
      newWrongAttempts += 1;
      setWrongAttempts(newWrongAttempts);
      setMessage(
        `Wrong! The correct answer was ${currentPokemon.name}. -10 points`
      );
    }

    setScore(newScore);

    // Update leaderboard if needed.
    if (newScore > bestScore) {
      setBestScore(newScore);
      try {
        await createScore(username, newScore);
      } catch (error) {
        console.error("Error saving score to leaderboard", error);
      }
    }

    if (newWrongAttempts >= 3) {
      setMessage("Game Over! You lost. Click Try Again to restart.");
      setGameOver(true);
      return;
    }

    fetchRandomPokemon();
    setGuess("");
  };

  // Restart the game by resetting all relevant states.
  const handleRestart = () => {
    setScore(0);
    setHintCount(0);
    setWrongAttempts(0);
    setMessage("");
    setHint("");
    setGameOver(false);
    fetchRandomPokemon();
  };

  // Handle AI chat submission using fetch.
  const handleChatSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await backendAPI.post("/api/pokemonAI", {
      messages: [{ role: "user", content: chatInput }],
    });
    // Assuming your ChatController returns an object with a "message" property:
    setChatResponse(res.data.message.content);
  } catch (error) {
    console.error("Error fetching AI response:", error.response?.data?.message || error.message);
    setChatResponse("Error: Unable to get response");
  }
};


  // Loading state
  if (loadingUser || !currentPokemon) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8 font-mono">
        <div className="text-2xl text-lime-400">Loading game...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8 font-mono text-lime-300">
      <AudioPlayer url="https://kappa.vgmsite.com/soundtracks/destiny-2-original-soundtrack-2017/scmkphov/01.%20Inner%20Light.mp3" />{" "}
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-2xl p-8 transform scale-90 origin-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Game Section */}
          <div className="flex flex-col">
            {/* Player Name */}
            <p className="text-center text-xl mb-2">
              Player: <span className="font-bold">{username}</span>
            </p>
            <h2 className="text-5xl font-extrabold text-center text-lime-400 mb-6 drop-shadow-lg">
              Guess the Pokémon!
            </h2>
            <p className="text-center text-2xl mb-4">
              Best Score: <span className="font-bold">{bestScore}</span>
            </p>
            <div className="flex justify-center mb-6">
              {currentPokemon && currentPokemon.sprites && (
                <img
                  src={currentPokemon.sprites.front_default}
                  alt="pokemon"
                  className="w-48 h-48 border-4 border-green-500 rounded-full shadow-lg"
                />
              )}
            </div>
            {/* Score Details Stacked Vertically */}
            <div className="flex flex-col items-center mb-6 space-y-2 text-xl">
              <p>
                Score: <span className="font-bold">{score}</span>
              </p>
              <p>
                Wrong Attempts:{" "}
                <span className="font-bold">{wrongAttempts}</span> / 3
              </p>
              <p>
                Hints used: <span className="font-bold">{hintCount}</span> / 3
              </p>
            </div>
            {hint && (
              <div className="bg-green-700 bg-opacity-90 p-4 mb-6 rounded text-center text-xl shadow-inner">
                {hint}
              </div>
            )}
            <div className="flex justify-center mb-6">
              <button
                onClick={handleHint}
                disabled={hintCount >= 3}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 transition duration-300 text-white font-bold rounded shadow-lg"
              >
                Get Hint
              </button>
            </div>
            {!gameOver ? (
              <form
                onSubmit={handleSubmit}
                className="mb-6 flex flex-col items-center"
              >
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Enter Pokémon name"
                  className="border border-gray-600 p-3 w-full max-w-md rounded bg-gray-800 text-lime-200 placeholder-lime-400 text-center mb-4 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-300"
                  required
                />
                <button
                  type="submit"
                  className="w-full max-w-md px-6 py-3 bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-bold rounded shadow-lg"
                >
                  Submit Guess
                </button>
              </form>
            ) : (
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-lime-400 mb-4">
                  {score > bestScore
                    ? "Congratulations, You Won!"
                    : score < bestScore
                    ? "You lost!"
                    : "It's a Tie!"}
                </h2>
                <button
                  onClick={handleRestart}
                  className="mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 transition duration-300 text-white font-bold rounded shadow-lg"
                >
                  Try Again
                </button>
              </div>
            )}
            {message && (
              <p className="mt-4 text-center text-2xl font-bold text-lime-400">
                {message}
              </p>
            )}
            {currentPokemon && (
              <p className="mt-4 text-center text-xl font-bold text-lime-400 opacity-70">
                (For practice, the correct answer is: {currentPokemon.name})
              </p>
            )}
          </div>

          {/* AI Chat Section */}
          <div className="flex flex-col justify-between border-l border-gray-800 pl-8">
            <div>
              <h2 className="text-4xl font-bold text-center text-lime-400 mb-6 drop-shadow">
                Smartachu
              </h2>
              <h2 className="text-4xl font-bold text-center text-lime-400 mb-6 drop-shadow">
                Your Pokémon AI Buddy
              </h2>
              <form
                onSubmit={handleChatSubmit}
                className="mb-6 flex flex-col items-center"
              >
                <textarea
                  className="w-full max-w-lg p-4 border border-gray-600 rounded bg-gray-800 text-lime-200 placeholder-lime-400 mb-4 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-300"
                  rows="6"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Note: AI answers are not always correct"
                ></textarea>
                <button
                  type="submit"
                  className="w-full max-w-lg px-6 py-3 bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-bold rounded shadow-lg"
                >
                  Submit
                </button>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Need more help? Feel free to chat with Smartachu!
                </p>
              </form>
              {chatResponse && (
                <div className="p-6 border border-gray-600 rounded bg-gray-800 shadow-inner">
                  <h2 className="text-xl font-bold mb-2 text-lime-400">
                    Response:
                  </h2>
                  <p>{chatResponse}</p>
                </div>
              )}
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Remember, the AI is here for suggestions only!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuessGame;

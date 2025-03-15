import { useState, useEffect } from "react";
import { pokeAPI, backendAPI, createScore } from "../services/api";
import AudioPlayer from "../components/AudioPlayer";
import { useTranslation } from "react-i18next";

// Enhanced responsive ring loader
function RingLoader({
  size = "w-12 h-12",
  borderWidth = "border-4",
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

function GuessGame() {
  const { t } = useTranslation();
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
  const [aiLoading, setAiLoading] = useState(false);

  // Fetch user data
  useEffect(() => {
    const getUser = async () => {
      try {
        console.log("🔍 Fetching user...");
        const res = await backendAPI.get("/api/user", {
          withCredentials: true,
        });
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

  // Initialize game data once username is available
  useEffect(() => {
    if (username) {
      fetchBestScore(username);
      fetchRandomPokemon();
    }
  }, [username]);

  // Score fetching
  const fetchBestScore = async (user) => {
    try {
      const res = await backendAPI.get("/api/leaderboard");
      const userRecord = res.data.find((entry) => entry.username === user);
      setBestScore(userRecord ? userRecord.score : 0);
    } catch (error) {
      console.error("Error fetching leaderboard best score", error);
    }
  };

  // Fetch Pokémon data
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

  // Hint handling
  const handleHint = async () => {
    if (hintCount >= 3) {
      setMessage(t("noMoreHints"));
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
            englishEntry ? englishEntry.flavor_text : t("noHintAvailable")
          }`
        );
      } catch (error) {
        console.error("Error fetching species details", error);
        setHint(t("noHintAvailable"));
      }
    }
    setHintCount((prev) => prev + 1);
  };

  // Process user's guess
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPokemon) return;

    let newScore = score;
    let newWrongAttempts = wrongAttempts;

    if (guess.trim().toLowerCase() === currentPokemon.name.toLowerCase()) {
      newScore += 10;
      setMessage("Correct! +10 points");
    } else {
      newScore -= 10;
      newWrongAttempts += 1;
      setWrongAttempts(newWrongAttempts);
      setMessage(
        `Wrong! The correct answer was ${currentPokemon.name}. -10 points`
      );
    }

    setScore(newScore);

    // Update leaderboard if needed
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

  // Reset game
  const handleRestart = () => {
    setScore(0);
    setHintCount(0);
    setWrongAttempts(0);
    setMessage("");
    setHint("");
    setGameOver(false);
    fetchRandomPokemon();
  };

  // AI chat handling
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    setAiLoading(true);
    try {
      const res = await backendAPI.post("/api/pokemonAI", {
        messages: [{ role: "user", content: chatInput }],
      });
      setChatResponse(res.data.message.content);
    } catch (error) {
      console.error(
        "Error fetching AI response:",
        error.response?.data?.message || error.message
      );
      setChatResponse("Error: Unable to get response");
    } finally {
      setAiLoading(false);
    }
  };

  // Loading screen
  if (loadingUser || !currentPokemon) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <RingLoader
            size="w-14 h-14 sm:w-20 sm:h-20"
            borderWidth="border-4"
            color="border-blue-500"
          />
          <p className="text-xl sm:text-2xl text-lime-400 mt-4">
            Loading game...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-2 py-3 sm:p-4 md:p-6 lg:p-8 font-mono text-lime-300">
      <AudioPlayer url="https://kappa.vgmsite.com/soundtracks/destiny-2-original-soundtrack-2017/scmkphov/01.%20Inner%20Light.mp3" />

      <div className="w-full max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        {/* Header - consistent across all views */}
        <div className="p-3 sm:p-5 md:p-6 lg:p-8 bg-gray-800 border-b border-gray-700">
          <div className="flex flex-col space-y-1 sm:space-y-2">
            <p className="text-center text-xs sm:text-sm md:text-base">
              {t("player")}: <span className="font-bold">{username}</span>
            </p>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center text-lime-400 leading-tight drop-shadow-lg">
              {t("guessThePokemon")}
            </h1>
            <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl">
              {t("bestScore")}: <span className="font-bold">{bestScore}</span>
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
          {/* Game Section */}
          <div className="flex flex-col p-3 sm:p-5 md:p-6">
            {/* Pokemon Image */}
            <div className="flex justify-center my-3 sm:my-4 md:my-6">
              {currentPokemon?.sprites && (
                <div className="relative">
                  <img
                    src={currentPokemon.sprites.front_default}
                    alt="pokemon"
                    className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 border-2 sm:border-4 border-green-500 rounded-full shadow-lg bg-gray-800"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 px-2 py-1 rounded-full border border-green-500">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className="text-xs sm:text-sm font-bold text-lime-400">
                        ?
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Game Stats */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3 sm:mb-4 md:mb-5 p-2 sm:p-3 bg-gray-800 rounded-lg">
              <div className="flex flex-col items-center justify-center p-1 sm:p-2 bg-gray-700 rounded">
                <span className="text-xs sm:text-sm text-gray-400">
                  {t("score")}
                </span>
                <span className="font-bold text-base sm:text-lg text-lime-400">
                  {score}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-1 sm:p-2 bg-gray-700 rounded">
                <span className="text-xs sm:text-sm text-gray-400">
                  {t("wrong")}
                </span>
                <span className="font-bold text-base sm:text-lg text-red-400">
                  {wrongAttempts}/3
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-1 sm:p-2 bg-gray-700 rounded">
                <span className="text-xs sm:text-sm text-gray-400">
                  {t("hints")}
                </span>
                <span className="font-bold text-base sm:text-lg text-yellow-400">
                  {hintCount}/3
                </span>
              </div>
            </div>

            {/* Hint Display */}
            {hint && (
              <div className="bg-green-800 bg-opacity-80 p-2 sm:p-3 md:p-4 mb-3 sm:mb-4 md:mb-5 rounded text-center text-xs sm:text-sm md:text-base shadow-inner">
                {hint}
              </div>
            )}

            {/* Hint Button */}
            <div className="flex justify-center mb-3 sm:mb-4 md:mb-5">
              <button
                onClick={handleHint}
                disabled={hintCount >= 3}
                className={`px-3 sm:px-4 md:px-5 py-1 sm:py-2 font-bold rounded shadow-lg text-sm sm:text-base transition duration-300 ${
                  hintCount >= 3
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
              >
                {hintCount >= 3 ? t("noMoreHints") : t("getHint")}
              </button>
            </div>

            {/* Game Form */}
            {!gameOver ? (
              <form
                onSubmit={handleSubmit}
                className="mb-3 sm:mb-4 md:mb-5 flex flex-col items-center"
              >
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-2 sm:mb-3">
                  <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Enter Pokémon name"
                    className="w-full border border-gray-600 p-2 sm:p-3 rounded bg-gray-800 text-lime-200 placeholder-lime-400 text-center focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-300 text-sm sm:text-base"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-bold rounded shadow-lg text-sm sm:text-base"
                >
                  Submit Guess
                </button>
              </form>
            ) : (
              <div className="text-center p-4 mb-3 sm:mb-4 md:mb-5 bg-gray-800 rounded-lg">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-lime-400 mb-3">
                  {score > bestScore
                    ? "Congratulations, You Won! 🏆"
                    : score < bestScore
                    ? "Game Over! 💔"
                    : "It's a Tie! 🤝"}
                </h2>
                <button
                  onClick={handleRestart}
                  className="px-5 sm:px-6 md:px-8 py-2 sm:py-3 bg-red-600 hover:bg-red-700 transition duration-300 text-white font-bold rounded-lg shadow-lg text-sm sm:text-base"
                >
                  Play Again
                </button>
              </div>
            )}

            {/* Game Messages */}
            {message && (
              <div
                className={`mt-2 sm:mt-3 md:mt-4 p-2 rounded-lg text-center ${
                  message.includes("Correct")
                    ? "bg-green-900 bg-opacity-50"
                    : "bg-red-900 bg-opacity-50"
                }`}
              >
                <p className="text-sm sm:text-base md:text-lg font-bold">
                  {message}
                </p>
              </div>
            )}

            {/* Debug info - can be removed in production */}
            {currentPokemon && (
              <p className="mt-3 text-center text-xs text-lime-400 opacity-50">
                (Answer: {currentPokemon.name})
              </p>
            )}
          </div>

          {/* AI Chat Section - with improved responsiveness */}
          <div className="border-t lg:border-t-0 lg:border-l border-gray-700">
            <div className="flex flex-col h-full p-3 sm:p-5 md:p-6">
              {/* AI Chat Header */}
              <div className="mb-3 sm:mb-4 md:mb-6 text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-lime-400 drop-shadow">
                  {t("smartachu")}
                </h2>
                <p className="text-sm sm:text-base text-gray-400">
                  {t("pokemonAiBuddy")}
                </p>
              </div>

              {/* AI Chat Form */}
              <form
                onSubmit={handleChatSubmit}
                className="mb-3 sm:mb-4 md:mb-5 flex flex-col"
              >
                <textarea
                  className="w-full p-2 sm:p-3 border border-gray-600 rounded bg-gray-800 text-lime-200 placeholder-lime-400 mb-2 sm:mb-3 focus:outline-none focus:ring-2 focus:ring-lime-400 transition duration-300 text-sm sm:text-base resize-none"
                  rows="3"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t("askSmartachu")}
                ></textarea>
                <button
                  type="submit"
                  disabled={aiLoading}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 font-bold rounded shadow-lg text-sm sm:text-base transition duration-300 ${
                    aiLoading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {aiLoading ? t("thinking") : t("askSmartachuButton")}
                </button>
              </form>

              {/* AI Response Area */}
              <div className="flex-1 overflow-auto">
                {aiLoading ? (
                  <div className="flex flex-col items-center justify-center p-4">
                    <RingLoader
                      size="w-8 h-8 sm:w-10 sm:h-10"
                      borderWidth="border-2 sm:border-3"
                      color="border-green-500"
                    />
                    <p className="mt-2 text-xs sm:text-sm text-green-400">
                      Smartachu is thinking...
                    </p>
                  </div>
                ) : chatResponse ? (
                  <div className="p-3 sm:p-4 border border-gray-600 rounded bg-gray-800 shadow-inner text-sm">
                    <h3 className="text-sm sm:text-base font-bold mb-2 text-lime-400">
                      Smartachu says:
                    </h3>
                    <div className="prose prose-sm prose-invert max-w-none">
                      <p className="text-xs sm:text-sm whitespace-pre-wrap">
                        {chatResponse}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4 text-gray-500">
                    <p className="text-xs sm:text-sm">
                      Ask Smartachu about Pokémon!
                    </p>
                    <p className="text-xs mt-1 italic">
                      Example: "What type is effective against water Pokémon?"
                    </p>
                  </div>
                )}
              </div>

              {/* AI Chat Footer */}
              <div className="mt-3 sm:mt-4">
                <p className="text-center text-xs text-gray-500">
                  {t("aiDisclaimer")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuessGame;

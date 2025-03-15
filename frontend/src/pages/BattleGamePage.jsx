import { useState, useEffect } from "react";
import Card from "../components/Card";
import { backendAPI } from "../services/api";
import AudioPlayer from "../components/AudioPlayer";
import { useTranslation } from "react-i18next"; // Import translation hook

// Custom RingLoader Component using Tailwind CSS
function RingLoader({
  size = "w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16",
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

function BattleGamePage() {
  const [userCards, setUserCards] = useState([]);
  const [pcCards, setPcCards] = useState([]);
  const [selectedUserCard, setSelectedUserCard] = useState(null);
  const [selectedPcCard, setSelectedPcCard] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [pcScore, setPcScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [roundResult, setRoundResult] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(); // Use translation hook

  // Fetch logged-in user
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await backendAPI.get("/api/user");
        setUsername(res.data.username);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    getUser();
  }, []);

  // Fetch cards and shuffle them
  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await backendAPI.get("/api/cards");
        const data = res.data;
        const shuffled = data.sort(() => Math.random() - 0.5);
        setUserCards(shuffled.slice(0, 9));
        setPcCards(shuffled.slice(9, 18));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cards", error);
        setLoading(false);
      }
    };
    getCards();
  }, []);

  // Handle a card play
  const handleCardPlay = (card) => {
    if (selectedUserCard || gameOver) return;
    setSelectedUserCard(card);
    const randomIndex = Math.floor(Math.random() * pcCards.length);
    const pcCard = pcCards[randomIndex];
    setSelectedPcCard(pcCard);

    let updatedUserScore = userScore;
    let updatedPcScore = pcScore;
    let roundWinner = null;

    if (card.power > pcCard.power) {
      roundWinner = "user";
      updatedUserScore += 1;
    } else if (card.power < pcCard.power) {
      roundWinner = "pc";
      updatedPcScore += 1;
    } else {
      roundWinner = "tie";
    }

    setUserScore(updatedUserScore);
    setPcScore(updatedPcScore);

    setRoundResult({
      winner: roundWinner,
      userCardId: card.id,
      pcCardId: pcCard.id,
    });

    // After a short delay, remove the played cards and check for game over.
    setTimeout(() => {
      setUserCards((prevUserCards) => {
        const newUserCards = prevUserCards.filter((c) => c.id !== card.id);
        if (newUserCards.length === 0) {
          setGameOver(true);
          determineWinner(updatedUserScore, updatedPcScore);
        }
        return newUserCards;
      });
      setPcCards((prevPcCards) =>
        prevPcCards.filter((c) => c.id !== pcCard.id)
      );
      setSelectedUserCard(null);
      setSelectedPcCard(null);
      setRoundResult(null);
    }, 1500); // Slightly longer delay to see the result
  };

  // Determine and post the winner using the final scores
  const determineWinner = async (finalUserScore, finalPcScore) => {
    let winner;
    if (finalUserScore > finalPcScore) winner = "User";
    else if (finalUserScore < finalPcScore) winner = "PC";
    else winner = "Tie";
    try {
      await backendAPI.post("/api/game-results", {
        winner,
        userScore: finalUserScore,
        pcScore: finalPcScore,
        username,
        gameType: "BattleGame",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Reset the game
  const resetGame = async () => {
    setLoading(true);
    setUserCards([]);
    setPcCards([]);
    setSelectedUserCard(null);
    setSelectedPcCard(null);
    setUserScore(0);
    setPcScore(0);
    setGameOver(false);
    setRoundResult(null);
    try {
      const res = await backendAPI.get("/api/cards");
      const data = res.data;
      const shuffled = data.sort(() => Math.random() - 0.5);
      setUserCards(shuffled.slice(0, 9));
      setPcCards(shuffled.slice(9, 18));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cards", err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="flex flex-col items-center">
          <RingLoader />
          <p className="text-base sm:text-lg text-lime-400 mt-4">
            {t("loadingBattle")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-3 sm:p-4 md:p-6 lg:p-8 font-mono">
      <AudioPlayer url="https://kappa.vgmsite.com/soundtracks/destiny-the-taken-king-original-soundtrack/tcfvhsbbbh/2-08.%20Soul%20of%20Crota.mp3" />

      <div className="max-w-4xl mx-auto">
        {/* Game header with responsive sizing */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-lime-400 mb-3 sm:mb-5 md:mb-6 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          {t("cardBattle")}
        </h1>

        {/* Score section - improved for better display on all devices */}
        <div className="bg-gray-800 bg-opacity-60 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row justify-around items-center space-y-2 sm:space-y-0">
            <div className="text-lime-400 text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
              {t("player")}: <span className="text-white">{username}</span>
            </div>
            <div className="flex space-x-4 sm:space-x-6 md:space-x-10">
              <div className="text-lime-400 text-sm sm:text-base md:text-lg lg:text-xl">
                {t("player")}:{" "}
                <span className="font-bold text-white">{userScore}</span>
              </div>
              <div className="text-lime-400 text-sm sm:text-base md:text-lg lg:text-xl">
                PC: <span className="font-bold text-white">{pcScore}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards grid with win/lose indicators on sides */}
        <div className="relative">
          {/* Left win indicator (user win) - FIXED to read correctly */}
          {roundResult && roundResult.winner === "user" && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-8 z-10">
              <div className="flex flex-col items-center">
                <div className="writing-vertical-rl bg-green-500 bg-opacity-80 text-white px-1 py-2 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-bold">
                  {t("youWinRound")}
                </div>
                <div className="text-3xl mt-2">🎯</div>
              </div>
            </div>
          )}

          {/* Right win indicator (PC win) */}
          {roundResult && roundResult.winner === "pc" && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-8 z-10">
              <div className="flex flex-col items-center">
                <div className="writing-vertical-lr bg-red-500 bg-opacity-80 text-white px-1 py-2 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-bold">
                  {t("pcWinsRound")}
                </div>
                <div className="text-3xl mt-2">❌</div>
              </div>
            </div>
          )}

          {/* Tie indicator (centered) */}
          {roundResult && roundResult.winner === "tie" && (
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-4 md:-translate-y-8 z-10">
              <div className="flex flex-col items-center">
                <div className="bg-yellow-500 bg-opacity-80 text-white px-3 py-1 rounded-lg text-sm sm:text-base md:text-lg font-bold">
                  {t("tieRound")} 🤝
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {/* Player cards section */}
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3 sm:p-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-lime-400 mb-2 sm:mb-3 text-center md:text-left">
                {t("yourCards")}
              </h2>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {userCards.length > 0 ? (
                  userCards.map((card) => (
                    <div
                      key={card.id}
                      className="transform transition-transform hover:scale-105"
                    >
                      <Card
                        card={card}
                        onClick={() => handleCardPlay(card)}
                        selected={
                          selectedUserCard && selectedUserCard.id === card.id
                        }
                        flipped={
                          selectedUserCard && selectedUserCard.id === card.id
                        }
                        result={
                          roundResult && roundResult.userCardId === card.id
                            ? roundResult.winner === "user"
                              ? "win"
                              : roundResult.winner === "pc"
                              ? "lose"
                              : "tie"
                            : null
                        }
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-white text-center w-full py-4">
                    {t("noCardsLeft")}
                  </p>
                )}
              </div>
            </div>

            {/* PC cards section */}
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3 sm:p-4 mt-4 md:mt-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-lime-400 mb-2 sm:mb-3 text-center md:text-left">
                {t("pcCards")}
              </h2>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {pcCards.length > 0 ? (
                  pcCards.map((card) => (
                    <div
                      key={card.id}
                      className="transform transition-transform"
                    >
                      <Card
                        card={card}
                        onClick={() => {}}
                        faceDown={true}
                        flipped={
                          selectedPcCard && selectedPcCard.id === card.id
                        }
                        result={
                          roundResult && roundResult.pcCardId === card.id
                            ? roundResult.winner === "pc"
                              ? "win"
                              : roundResult.winner === "user"
                              ? "lose"
                              : "tie"
                            : null
                        }
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-white text-center w-full py-4">
                    {t("noCardsLeft")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Game over section with improved styling */}
        {gameOver && (
          <div className="mt-5 sm:mt-6 md:mt-8 text-center bg-gray-800 bg-opacity-70 rounded-lg py-4 px-3 sm:px-4 md:px-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-lime-400">
              {userScore > pcScore
                ? t("congratulationsWon")
                : userScore < pcScore
                ? t("pcWins")
                : t("itsATie")}
            </h2>
            <div className="mt-3 sm:mt-4 flex justify-center">
              <button
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 border-2 border-green-500 hover:bg-gray-700 text-lime-400 font-bold rounded-lg transition-all transform hover:scale-105"
                onClick={resetGame}
              >
                {t("playAgain")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BattleGamePage;

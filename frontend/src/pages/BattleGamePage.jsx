import { useState, useEffect } from "react";
import Card from "../components/Card";
import { backendAPI } from "../services/api";
import AudioPlayer from "../components/AudioPlayer";

function BattleGamePage() {
  const [userCards, setUserCards] = useState([]);
  const [pcCards, setPcCards] = useState([]);
  const [selectedUserCard, setSelectedUserCard] = useState(null);
  const [selectedPcCard, setSelectedPcCard] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [pcScore, setPcScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [roundMessage, setRoundMessage] = useState("");
  const [roundResult, setRoundResult] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

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

    // Calculate scores locally so we can update immediately.
    let updatedUserScore = userScore;
    let updatedPcScore = pcScore;
    let roundWinner = null;

    if (card.power > pcCard.power) {
      roundWinner = "user";
      updatedUserScore += 1;
      setRoundMessage("You win this round!");
    } else if (card.power < pcCard.power) {
      roundWinner = "pc";
      updatedPcScore += 1;
      setRoundMessage("PC wins this round!");
    } else {
      roundWinner = "tie";
      setRoundMessage("It's a tie round!");
    }

    // Update state with the new scores.
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
      setRoundMessage("");
    }, 1000);
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
    setRoundMessage("");
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
      <div className="flex items-center justify-center h-screen text-xl text-lime-400">
        Loading game...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4 font-mono">
      <AudioPlayer url="https://kappa.vgmsite.com/soundtracks/destiny-the-taken-king-original-soundtrack/tcfvhsbbbh/2-08.%20Soul%20of%20Crota.mp3" />{" "}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-lime-400 mb-6 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
          Card Battle
        </h1>
        <div className="flex justify-around mb-4">
          <div className="text-lime-400 text-xl">Player: {username}</div>
          <div className="text-lime-400 text-xl">User Score: {userScore}</div>
          <div className="text-lime-400 text-xl">PC Score: {pcScore}</div>
        </div>
        {roundMessage && (
          <div className="text-center text-2xl font-semibold text-yellow-400 mb-4">
            {roundMessage}
          </div>
        )}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-lime-400 mb-2">
              Your Cards
            </h2>
            <div className="flex flex-wrap gap-4">
              {userCards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  onClick={() => handleCardPlay(card)}
                  selected={selectedUserCard && selectedUserCard.id === card.id}
                  flipped={selectedUserCard && selectedUserCard.id === card.id}
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
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-lime-400 mb-2">
              PC Cards
            </h2>
            <div className="flex flex-wrap gap-4">
              {pcCards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  onClick={() => {}}
                  faceDown={true}
                  flipped={selectedPcCard && selectedPcCard.id === card.id}
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
              ))}
            </div>
          </div>
        </div>
        {gameOver && (
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-lime-400">
              {userScore > pcScore
                ? "Congratulations, You Won!"
                : userScore < pcScore
                ? "PC Wins!"
                : "It's a Tie!"}
            </h2>
            <button
              className="mt-4 px-6 py-2 bg-gray-800 border border-green-500 hover:bg-gray-700 text-lime-400 font-bold rounded"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BattleGamePage;

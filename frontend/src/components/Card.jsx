import PropTypes from "prop-types";

function Card({ card, onClick, flipped, result, selected, faceDown = false }) {
  const isFlipped = faceDown ? flipped : true;

  let resultClasses = "";
  if (result === "win") {
    resultClasses =
      "border-4 border-green-500 shadow-[0_0_10px_2px_rgba(0,255,0,1)]";
  } else if (result === "lose") {
    resultClasses =
      "border-4 border-red-500 shadow-[0_0_10px_2px_rgba(255,0,0,1)]";
  } else if (result === "tie") {
    resultClasses =
      "border-4 border-yellow-500 shadow-[0_0_10px_2px_rgba(255,255,0,1)]";
  } else if (selected) {
    resultClasses =
      "border-4 border-blue-400 shadow-[0_0_10px_2px_rgba(59,130,246,1)]";
  }

  return (
    <div
      className={`w-24 h-36 m-2 cursor-pointer transition-transform duration-300 ${resultClasses}`}
      onClick={onClick}
    >
      {/* Flip-card container */}
      <div
        className="relative w-full h-full transition-transform duration-600"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Back Face (face down) */}
        <div
          className="absolute w-full h-full flex items-center justify-center text-3xl font-bold text-green-400 rounded-lg"
          style={{
            background:
              "repeating-linear-gradient(45deg, #444, #444 4px, #222 4px, #222 8px)",
            backfaceVisibility: "hidden",
          }}
        >
          ?
        </div>
        {/* Front Face (revealed) */}
        <div
          className="absolute w-full h-full flex flex-col items-center justify-center rounded-lg p-1 text-center bg-black bg-opacity-80 text-green-200"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-24 object-cover rounded-lg mb-1"
          />
          <div className="text-sm font-bold">{card.name}</div>
          <div className="mt-1 text-xs">Power: {card.power}</div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    power: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  result: PropTypes.string,
  selected: PropTypes.bool,
  faceDown: PropTypes.bool,
};

export default Card;

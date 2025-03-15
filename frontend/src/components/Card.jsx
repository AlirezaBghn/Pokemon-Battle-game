import PropTypes from "prop-types";

function Card({ card, onClick, flipped, result, selected, faceDown = false }) {
  const isFlipped = faceDown ? flipped : true;

  let resultClasses = "";
  if (result === "win") {
    resultClasses =
      "border-2 sm:border-3 md:border-4 border-green-500 shadow-[0_0_5px_1px_rgba(0,255,0,0.8)] sm:shadow-[0_0_8px_2px_rgba(0,255,0,0.9)] md:shadow-[0_0_10px_2px_rgba(0,255,0,1)]";
  } else if (result === "lose") {
    resultClasses =
      "border-2 sm:border-3 md:border-4 border-red-500 shadow-[0_0_5px_1px_rgba(255,0,0,0.8)] sm:shadow-[0_0_8px_2px_rgba(255,0,0,0.9)] md:shadow-[0_0_10px_2px_rgba(255,0,0,1)]";
  } else if (result === "tie") {
    resultClasses =
      "border-2 sm:border-3 md:border-4 border-yellow-500 shadow-[0_0_5px_1px_rgba(255,255,0,0.8)] sm:shadow-[0_0_8px_2px_rgba(255,255,0,0.9)] md:shadow-[0_0_10px_2px_rgba(255,255,0,1)]";
  } else if (selected) {
    resultClasses =
      "border-2 sm:border-3 md:border-4 border-blue-400 shadow-[0_0_5px_1px_rgba(59,130,246,0.8)] sm:shadow-[0_0_8px_2px_rgba(59,130,246,0.9)] md:shadow-[0_0_10px_2px_rgba(59,130,246,1)]";
  }

  return (
    <div
      className={`w-16 h-24 sm:w-20 sm:h-30 md:w-24 md:h-36 m-1 sm:m-1.5 md:m-2 cursor-pointer transition-transform duration-300 ${resultClasses}`}
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
          className="absolute w-full h-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold text-green-400 rounded-lg"
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
          className="absolute w-full h-full flex flex-col items-center justify-center rounded-lg p-0.5 sm:p-1 text-center bg-black bg-opacity-80 text-green-200"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-12 sm:h-16 md:h-24 object-cover rounded-lg mb-0.5 sm:mb-1"
          />
          <div className="text-xs sm:text-sm font-bold truncate w-full px-1">
            {card.name}
          </div>
          <div className="mt-0.5 sm:mt-1 text-xxs sm:text-xs">
            Power: {card.power}
          </div>
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

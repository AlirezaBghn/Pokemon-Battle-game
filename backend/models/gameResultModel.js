import mongoose from "mongoose";

const gameResultSchema = mongoose.Schema(
  {
    winner: {
      type: String,
      required: true,
    },
    userScore: {
      type: Number,
      required: true,
    },
    pcScore: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    gameType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GameResult = mongoose.model("GameResult", gameResultSchema);

export default GameResult;

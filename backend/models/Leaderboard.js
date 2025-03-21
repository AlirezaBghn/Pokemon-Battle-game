import { Schema, model } from "mongoose";

const LeaderboardSchema = new Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default model("Leaderboard", LeaderboardSchema);

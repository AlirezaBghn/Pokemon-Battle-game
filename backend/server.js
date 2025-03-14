import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db/db.js";
import { notFound, errorHandler } from "./utils/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import cardsRoutes from "./routes/cardsRoutes.js";
import gameResultsRoutes from "./routes/gameResultsRoutes.js";
import chatRouter from "./routes/chatRouter.js";

dotenv.config();
const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api", authRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api/game-results", gameResultsRoutes);
app.use("/api/pokemonAI", chatRouter);

// Serve static files from React build folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Fallback route: for any non-API request, serve index.html
app.get("*", (req, res) => {
  if (!req.originalUrl.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  } else {
    res.status(404).send("Not found");
  }
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

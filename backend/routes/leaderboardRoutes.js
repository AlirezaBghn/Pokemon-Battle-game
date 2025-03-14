import { Router } from "express";
import {
  getLeaderboard,
  createScore,
} from "../controllers/leaderboardController.js";

const router = Router();

router.get("/", getLeaderboard);
router.post("/", createScore);

export default router;

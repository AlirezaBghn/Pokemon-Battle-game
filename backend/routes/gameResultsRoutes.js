import express from "express";
import {
  saveGameResult,
  getGameResults,
} from "../controllers/gameResultsController.js";

const router = express.Router();

router.post("/", saveGameResult);
router.get("/", getGameResults);

export default router;

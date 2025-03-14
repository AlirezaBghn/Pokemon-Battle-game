import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
  logoutUser,
  checkSession,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/user", protect, getUserProfile);
router.post("/logout", protect, logoutUser);
router.get("/check-session", protect, checkSession);

export default router;

import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  console.log("🔍 Checking authentication...");

  let token = req.cookies.token;
  if (!token) {
    console.log("❌ No token found in cookies.");
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    console.log("✅ Authenticated user:", req.user.username);
    next();
  } catch (error) {
    console.log("❌ Token verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
});

export { protect };

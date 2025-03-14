import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Registering user:", { username, email });

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const user = await User.create({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
  });

  if (user) {
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,        
      sameSite: "None",      
      domain: ".onrender.com", 
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);
    // Set cookie with secure options and domain
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domain: ".onrender.com",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  console.log("🔍 Checking user profile...");
  if (!req.user) {
    console.log("❌ No authenticated user found.");
    return res.status(401).json({ message: "Unauthorized - No user session" });
  }

  const user = await User.findById(req.user._id);
  if (user) {
    console.log("✅ User found:", user.username);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    console.log("❌ User not found in database.");
    res.status(404).json({ message: "User not found" });
  }
});

const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: ".onrender.com",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successful" });
};

const checkSession = (req, res) => {
  if (req.user) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
};

export { registerUser, authUser, getUserProfile, logoutUser, checkSession };

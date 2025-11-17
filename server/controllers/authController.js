// authController.js

const { response } = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config(); // load .env variables

// 🔹 Environment check
const isProd = process.env.NODE_ENV === "production";

// 🔹 Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// 🔹 Signup controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists. Please login directly." });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔹 Login controller (local login via Passport)
exports.login = (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  const token = generateToken(req.user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // true only in production
    sameSite: "None",
    path: "/",
    maxAge: 3600000, // 1 hour
  });

  res.json({ message: "Login successful", user: req.user, token });
};

// 🔹 Social login callback (Google/Facebook)
exports.socialLoginCallback = (req, res) => {
  try {
    if (!req.user) {
      const frontendUrl = process.env.FRONTEND_URL || "https://staykro.vercel.app";
      return res.redirect(`${frontendUrl}/login?error=OAuthFailed`);
    }

    const token = generateToken(req.user);

    res.cookie("token", token, {
      httpOnly: true,
    secure: true, // true only in production
    sameSite: "None",
      path: "/",
      maxAge: 3600000,
    });

    // Redirect to frontend success page where fetchUser() will be called
    const frontendUrl = process.env.FRONTEND_URL || "https://staykro.vercel.app";
    res.redirect(`${frontendUrl}/auth/success`);
  } catch (err) {
    console.error(err);
    const frontendUrl = process.env.FRONTEND_URL || "https://staykro.vercel.app";
    res.redirect(`${frontendUrl}/login?error=OAuthFailed`);
  }
};

// 🔹 Logout controller
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // true only in production
    sameSite: "None",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
};

// 🔹 Get logged-in user
// exports.getMe = async (req, res) => {
//   try {

//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };




exports.getMe=async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("name email role");
    if (!user) return res.status(404).json({ message: "User not found" });
    

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

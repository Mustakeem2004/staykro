const Admin = require("../../models/Admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Helper to generate JWT
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Admin signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    const token = generateToken(newAdmin);

    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(admin);

    res.status(200).json({ message: "Login successful", admin, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get current admin
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({ admin: req.admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout (just clear client-side token)
exports.logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

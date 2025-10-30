const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  try {
    // Get token from cookies or headers
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if role is admin 
    if (decoded.role !== "admin" ) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // Attach admin info to request
    req.admin = decoded;
    next();
  } catch (err) {
    console.error("Admin Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminMiddleware;

const jwt = require("jsonwebtoken");

const superAdminMiddleware = (req, res, next) => {
  try {
    // Get token from cookies or headers
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if role is superadmin
    if (decoded.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied: Superadmins only" });
    }

    // Attach superadmin info to request
    req.superadmin = decoded;
    next();
  } catch (err) {
    console.error("SuperAdmin Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = superAdminMiddleware;
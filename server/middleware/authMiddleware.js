const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token; // or req.headers.authorization
    if (!token) return res.status(401).json({ message: "Unauthorized" });


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // must contain id
    
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authmiddleware;



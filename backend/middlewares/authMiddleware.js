const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT and attach user info to req.user
const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("✓ verifyUser middleware - authHeader:", authHeader ? "present" : "MISSING");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("✗ No valid Bearer token found");
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("✓ verifyUser - token received:", token.substring(0, 20) + "...");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✓ verifyUser - token verified for user:", decoded.id, "role:", decoded.role);
    req.user = decoded; // decoded contains { id, role }
    next();
  } catch (err) {
    console.error("✗ verifyUser - JWT verification error:", err.message);
    return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
  }
};

module.exports = { verifyUser };

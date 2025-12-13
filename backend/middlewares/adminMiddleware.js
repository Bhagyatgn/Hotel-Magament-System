// Middleware to check if user is admin
const verifyAdmin = (req, res, next) => {
  console.log("✓ verifyAdmin - req.user:", req.user ? `ID:${req.user.id} Role:${req.user.role}` : "NOT SET");
  
  if (!req.user) {
    console.log("✗ req.user is not set");
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "admin") {
    console.log("✗ User role is not admin:", req.user.role);
    return res.status(403).json({ message: "Admin access required" });
  }

  console.log("✓ Admin verified");
  next();
};

module.exports = { verifyAdmin };

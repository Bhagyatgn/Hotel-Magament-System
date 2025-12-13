const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyUser } = require("../middlewares/authMiddleware");

// Get logged-in user's profile
router.get("/profile", verifyUser, userController.getUserProfile);

// Update logged-in user's profile
router.put("/profile", verifyUser, userController.updateUserProfile);

// Get logged-in user's bookings
router.get("/bookings", verifyUser, userController.getUserBookings);

module.exports = router;

const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { verifyUser } = require("../middlewares/authMiddleware");
const { verifyAdmin } = require("../middlewares/adminMiddleware");

// User creates a booking
router.post("/", verifyUser, bookingController.createBooking);

// User gets own bookings
router.get("/my", verifyUser, bookingController.getMyBookings);

// Admin gets all bookings
router.get("/", verifyUser, verifyAdmin, bookingController.getAllBookings);

// Admin updates booking status
router.put("/:bookingId/status", verifyUser, verifyAdmin, bookingController.updateBookingStatus);

module.exports = router;

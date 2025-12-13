const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const { verifyUser } = require("../middlewares/authMiddleware");
const { verifyAdmin } = require("../middlewares/adminMiddleware");

// Admin routes - require authentication first, then admin check
router.post("/:hotelId", verifyUser, verifyAdmin, roomController.addRoom);
router.put("/:roomId", verifyUser, verifyAdmin, roomController.updateRoom);
router.delete("/:roomId", verifyUser, verifyAdmin, roomController.deleteRoom);
router.get("/", verifyUser, verifyAdmin, roomController.getAllRooms);

// Public routes - order matters! More specific routes first
router.get("/hotel/:hotelId", roomController.getRooms);
router.get("/budget/:hotelId", roomController.getRoomsByBudget);
router.get("/:roomId", roomController.getRoomById);

module.exports = router;

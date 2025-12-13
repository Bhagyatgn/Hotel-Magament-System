const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.post("/add", hotelController.createHotel);

router.get("/filter", hotelController.getHotelsByBudget);

router.get("/", hotelController.getHotels);

router.get("/:id", hotelController.getHotelById);

router.put("/:id", hotelController.updateHotel);

router.delete("/:id", hotelController.deleteHotel);

module.exports = router;

const express = require("express");
const router = express.Router();

const offerController = require("../controllers/offerController");
const { verifyUser } = require("../middlewares/authMiddleware");
const { verifyAdmin } = require("../middlewares/adminMiddleware");

router.get("/", offerController.getOffers);
router.get("/admin", verifyUser, verifyAdmin, offerController.getAllOffers);
router.get("/:id", offerController.getOfferById);
router.post("/", verifyUser, verifyAdmin, offerController.createOffer);
router.put("/:id", verifyUser, verifyAdmin, offerController.updateOffer);
router.delete("/:id", verifyUser, verifyAdmin, offerController.deleteOffer);

module.exports = router;
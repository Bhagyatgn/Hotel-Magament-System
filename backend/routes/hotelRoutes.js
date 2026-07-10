const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const { verifyUser } = require('../middlewares/authMiddleware');
const { verifyAdmin } = require('../middlewares/adminMiddleware');

router.get('/filter', hotelController.getHotelsByBudget);
router.get('/', hotelController.getHotels);
router.get('/:id', hotelController.getHotelById);

router.post('/add', verifyUser, verifyAdmin, hotelController.createHotel);
router.put('/:id', verifyUser, verifyAdmin, hotelController.updateHotel);
router.delete('/:id', verifyUser, verifyAdmin, hotelController.deleteHotel);

module.exports = router;

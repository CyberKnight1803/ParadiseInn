const express = require('express');
const hotelController = require('../controllers/hotel');

const router = express.Router();

router.get('/', hotelController.getHomePage);
router.post('/', hotelController.postHomePage);

router.get('/bookings', hotelController.getBookings);

router.get('/book', hotelController.getAddBooking);

module.exports = router;
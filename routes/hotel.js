const express = require('express');
const hotelController = require('../controllers/hotel');

const router = express.Router();

router.get('/', hotelController.getHomePage);
router.post('/', hotelController.postHomePage);

router.get('/bookings', hotelController.getBookings);

router.get('/book', hotelController.getAddBooking);

router.post('/book', hotelController.postAddBooking);

router.get('/profile', hotelController.getProfile);

router.post('/profile', hotelController.postProfile);

module.exports = router;
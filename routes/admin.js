const express = require('express');
const adminController = require('../controllers/admin');
const isAdmin = require('../utils/isAdmin');

const router = express.Router();

router.get('/', isAdmin, adminController.getHomePage);

router.get('/add-employee', isAdmin, adminController.getAddEmployee);

router.get('/manage-bookings', isAdmin, adminController.getManageBookings);

router.get('/layouts', isAdmin, adminController.getLayout);

module.exports = router;
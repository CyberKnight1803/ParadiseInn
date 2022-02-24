const RoomType = require('../models/roomtype.js');

exports.getHomePage = (req, res, next) => {
    RoomType.find()
    .then(roomtypes => {
        return res.render('hotel/home', {
            path: "/", 
            roomTypes: roomtypes
        });
    });
};

exports.postHomePage = (req, res, next) => {
    return res.redirect('/');
}

exports.getBookings = (req, res, next) => {
    res.render('hotel/bookings', {
        path: "/bookings"
    });
};

exports.getAddBooking = (req, res, next) => {
    res.render('hotel/book', {
        path: "/book"
    });
};

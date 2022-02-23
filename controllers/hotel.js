exports.getHomePage = (req, res, next) => {
    res.render('hotel/home');
};

exports.getBookings = (req, res, next) => {
    res.render('hotel/bookings');
};

exports.getAddBooking = (req, res, next) => {
    res.render('hotel/book');
};

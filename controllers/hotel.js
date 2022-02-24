exports.getHomePage = (req, res, next) => {
    res.render('hotel/home', {
        path: "/"
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

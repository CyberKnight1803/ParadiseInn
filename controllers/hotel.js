const RoomType = require('../models/roomtype.js');
const User = require('../models/user');
const Booking = require('../models/booking');

const bcrypt = require('bcryptjs');
const { redirect } = require('express/lib/response');

exports.getHomePage = (req, res, _next) => {
    RoomType.find()
    .then(roomtypes => {
        return res.render('hotel/home', {
            path: "/", 
            roomTypes: roomtypes, 
            isLoggedIn: req.session.isLoggedIn,
            user: req.user
        });
    });
};

exports.postHomePage = (req, res, _next) => {
    return res.redirect('/');
};

exports.getBookings = (req, res, _next) => {
    

    if (req.session.isLoggedIn == undefined)
        return res.redirect('/login');

    req.user.populate('bookingList.bookings.bookingID')
    .then(user => {

        const bookings = user.bookingList.bookings;
        const bookingIDs = bookings.map(booking => {
            return booking._id;
        });

        return Booking.find({
            '_id': {
                '$in': bookingIDs
            }
        })
    })
    .then(bookings => {
        res.render('hotel/bookings', {
            path: "/bookings", 
            isLoggedIn: req.session.isLoggedIn, 
            user: req.user,
            bookings: bookings
        });
    })
    .catch(err => console.log(err));
};

exports.getAddBooking = (req, res, _next) => {

    if (req.session.isLoggedIn == undefined)
        return res.redirect('/login');

    res.render('hotel/book', {
        path: "/book", 
        isLoggedIn: req.session.isLoggedIn, 
        user: req.user
    });
};

exports.postAddBooking = (req, res, next) => {
    const roomType = req.body.roomType;
    const checkInDate = req.body.checkInDate;
    const checkOutDate = req.body.checkOutDate;
    const numGuests = req.body.numGuests;
    const numRooms = req.body.numRooms;

    if (roomType == "" || checkInDate == "" || checkOutDate == "" || numGuests == "")
        return res.redirect('/book');

    const booking = new Booking({
        roomType: roomType, 
        checkInDate: checkInDate, 
        checkOutDate: checkOutDate, 
        numGuests: numGuests, 
        numRooms: numRooms, 
        userId: req.user._id
    })

    return booking.save()
    .then(_result => {
        return req.user.addBooking(booking);
    })
    .then(_result => {
        console.log("BOOKING SUCCESS!");
        return res.redirect('/bookings');
    })
    .catch(err => console.log(err));
};

exports.getProfile = (req, res, _next) => {
    res.render('hotel/profile', {
        path: "/profile", 
        isLoggedIn: req.session.isLoggedIn,
        user: req.user
    });
};

exports.postProfile = (req, res, _next) => {
    
    const userID = req.user._id;
    const updatedUserName = req.body.name;
    const updatedEmail = req.body.email;
    const password = req.body.password;

    if (password != ""){
        bcrypt.hash(password, 12)
         .then(hashedPass => {
            User.findOne({_id: userID})
            .then(user => {
                user.name = updatedUserName;
                user.email = updatedEmail;
                user.password = hashedPass;
                return user.save();
            })
            .then(_result => {
                console.log("UPDATED PROFILE!");
                return res.redirect('/profile');
            })
            .catch(err => console.log(err));
        });
    }
    else {
        User.findOne({_id: userID})
            .then(user => {
                user.name = updatedUserName;
                user.email = updatedEmail;
                return user.save();
            })
            .then(_result => {
                console.log("UPDATED PROFILE!");
                return res.redirect('/profile');
            })
            .catch(err => console.log(err));
    }
};
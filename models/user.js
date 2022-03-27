const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type:String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true 
    },
    userType: {
        type: String, 
        required: true, 
        default: "user"
    },
    bookingList: {
        bookings: [
            {
                bookingID: {type: Schema.Types.ObjectId, ref: 'Booking'}
            }
        ]
    }
});

userSchema.methods.addBooking = function (booking) {
    const bookings = this.bookingList.bookings;
    const updatedBookings = [...this.bookingList.bookings, booking]

    const updatedBookingList = {
        bookings: updatedBookings
    }

    this.bookingList = updatedBookingList;
    return this.save();
}

module.exports = mongoose.model(
    'User', 
    userSchema
);
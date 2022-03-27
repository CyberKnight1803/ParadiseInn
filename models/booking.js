const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = Schema({
    roomType: {
        type: String, 
        required: true
    },
    checkInDate: {
        type: String, 
        required: true, 
    },
    checkOutDate: {
        type: String, 
        required: true 
    }, 
    numGuests: {
        type: Number, 
        required: true
    },
    numRooms: {
        type: Number, 
        required: true
    }, 
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
});

module.exports = mongoose.model(
    'Booking', 
    bookingSchema
);
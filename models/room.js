const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = Schema({
    name: {
        type: String, 
        required: true, 
        unique: true
    }, 
    roomType: {
        type: String, 
        required:true, 
    }, 
    isOccupied: {
        type: Boolean, 
        required: false, 
        default: false
    }
});


module.exports = mongoose.model(
    'Room', 
    roomSchema
);
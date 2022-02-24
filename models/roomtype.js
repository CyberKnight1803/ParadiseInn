const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomtypeSchema = Schema({
    name: {
        type: String, 
        required: true 
    }, 
    cost: {
        type: Number, 
        required: true 
    }, 
    imgPath: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model(
    'Roomtype', 
    roomtypeSchema
);
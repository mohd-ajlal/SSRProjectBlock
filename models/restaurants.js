const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    restaurantId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    restaurantName: {
        type: String,
        required: true,
        trim: true
    },
    cuisineType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    numberOfTables: {
        type: Number,
        required: true
    },
    hasOutdoorSeating: {
        type: Boolean,
        default: false,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
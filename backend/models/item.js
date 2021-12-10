const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

//Create Store Schema & model 
const itemSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    rate : {
        type: Array,
        default: []
    },
    price : {
        type: Number,
        required: true
    },
    opentime: {
        type: String,
        default: "10:00"
    },
    contact_number: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discount_rate: {
        type: Number,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    
    updateAt: {
        type: Date,
        default: Date.now
    },
    // geometry: geoSchema
    location: {
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }
});

itemSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

// Geocode & create location
itemSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        coordinates: [loc[0].longitude, loc[0].latitude]
    }

});

module.exports = mongoose.model("Items", itemSchema);
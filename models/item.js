const mongoose = require("mongoose");

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
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    opentime: {
        type: Date,
        default: Date.now
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
    }
});

itemSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        // delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Items", itemSchema);
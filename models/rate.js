const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
    rate : {
        type: Number,
        required: true,
    },
    comment : {
        type: String
    },
    owner : {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
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

rateSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        // delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Rate', rateSchema);
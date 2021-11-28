const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
    rate : {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    comment : {
        type: String
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    userName : {
        type: String
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
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
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Rate', rateSchema);
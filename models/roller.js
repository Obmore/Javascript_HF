const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Roller = db.model('Roller', {
    Type: String,
    id: Number,
    brand: String,
    price: Number,
    available: Boolean,
    _rental: {
        type: Schema.Types.ObjectId,
        ref: 'RollerStation'
    }
});

module.exports = Roller;
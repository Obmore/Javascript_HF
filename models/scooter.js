const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Roller = db.model('Roller', {
    iz: String,
    ev: Number,
    rating: String,
    _station: {
        type: Schema.Types.ObjectId,
        ref: 'RollerStation'
    }
});

module.exports = Roller;
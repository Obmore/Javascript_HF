const db = require('../config/db');

const RollerStation = db.model('Roller Station', {
    address: String,
    id: Number,
    capacity: Number
});

module.exports = RollerStation;
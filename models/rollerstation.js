const db = require('../config/db');

const RollerStation = db.model('RollerStation', {
    address: String,
    id: Number,
    capacity: Number
});

module.exports = RollerStation;
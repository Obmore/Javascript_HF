const db = require('../config/db');

const RollerStation = db.model('Roller Station', {
    nev: String,
    cim: String,
    tel: String
});

module.exports = RollerStation;
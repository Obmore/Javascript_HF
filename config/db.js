const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rollerstations', { useNewUrlParser: true });

module.exports = mongoose;

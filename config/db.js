const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Bendzsi:alma@cluster0.eh2vu4q.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp')
  .then(() => console.log('Connected!'));

module.exports = mongoose;

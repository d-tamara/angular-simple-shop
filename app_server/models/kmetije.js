const mongoose = require('mongoose');

const kmetijeShema = new mongoose.Schema({
  naziv: {type: String, required: true},
  naslov: {type: String, required: true},
  telefon: {type: String, required: true},
  mail: {type: String, required: true},
});

mongoose.model('Kmetija', kmetijeShema, 'Kmetije');
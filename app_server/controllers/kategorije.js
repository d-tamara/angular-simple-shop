/* Vrni začetno stran s seznamom lokacij */
// const seznam = (req, res) => {
//   res.render('kategorije-seznam', { title: 'Seznam kategorij' });

//  var kmetije = require("../models/kmetije.json");

const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
    
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com';
}


var seznamKmetij = (req, res) => {
    
    axios
        .get (apiParametri.streznik + '/api/kategorije', {})
        .then((odgovor) => {
            res.render('kategorije-seznam', { title: 'Seznam kmetij',
            kmetije: odgovor.data});
        });
};
  
  module.exports = {
    seznamKmetij
  };
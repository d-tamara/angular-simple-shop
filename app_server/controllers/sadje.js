// var sadje = require("../models/sadje.json");
/*const seznam = (req, res) => {
  res.render('sadje-seznam', { title: 'Seznam sadja' });
  title
};
*/

const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)

};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com';
}


var seznam = (req, res) => {

    axios
        .get (apiParametri.streznik + '/api/sadje', {})
        .then((odgovor) => {
            res.render('sadje-seznam', { title: 'Seznam sadja',
                sadje: odgovor.data});
        });

};

/* Vrni podrobnosti lokacije */
var podrobnostiSadja = (req, res) => {
    var idSadja = req.params.id;

    axios
        .get(apiParametri.streznik+'/api/sadje/'+idSadja, {})
        .then((odgovor) => {
            res.render('podrobno-izdelek', odgovor.data);
        });

};

module.exports = {
  seznam,
  podrobnostiSadja
};
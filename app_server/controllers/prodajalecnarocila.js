//var narocila = require("../models/prodajalecpregled-narocila.json");

const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)

};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com';
}

/*
const seznamNarocil = (req, res) => {
    res.render('prodajalecnarocila', {
        title: 'Seznam narocil',
        narocila: narocila
    });
}
*/

var seznamNarocil = (req, res) => {
    var idPodatkov = req.params.id;
    axios
        .get (apiParametri.streznik+'/api/narocila/'+idPodatkov, {})
        .then((odgovor) => {
            res.render('prodajalecnarocila', odgovor.data);
        });

};
module.exports = {
    seznamNarocil
};
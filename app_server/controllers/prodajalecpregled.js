// var izdelkiZ = require("../models/prodajalec-zelenjava.json");

var narocila = require("../models/prodajalecpregled-narocila.json");

var podatki = require("../models/prodajalecpregled-podatki.json");

const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
    
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com';
}
   
 
const seznamIzdelkovZ = (req, res) => {
    var idPodatkov = req.params.id;
     axios
        .get (apiParametri.streznik + '/api/prodajalecPregled/' +idPodatkov, {})
        .then((odgovor) => {
            res.render('prodajalec-pregled', odgovor.data);
        });

};

const seznamNarocil = (req, res) => {
    var idPodatkov = req.params.id;
    axios
        .get (apiParametri.streznik+'/api/narocila/'+idPodatkov, {})
        .then((odgovor) => {
            res.render('prodajalecnarocila', odgovor.data);
        });

};

const seznamPodatkov = (req, res) => {
    
    var idPodatkov = req.params.id;
    
    axios
        .get (apiParametri.streznik + '/api/prodajalecPodatki/'+idPodatkov, {})
        .then((odgovor) => {
            res.render('prodajalecpregled-podatki', odgovor.data);
        });
};
 

module.exports = {
  seznamIzdelkovZ,
  seznamNarocil,
  seznamPodatkov,
};
// var nakup = require("../models/nakup.json");

const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)

};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com';
}

var seznamNarocil = (req, res) => {

    var idZabojcka = req.params.id;

    axios
        .get(apiParametri.streznik+'/api/zabojcek/'+idZabojcka, {})
        .then((zabojcek) => {
            res.render('nakup', zabojcek.data);
        });
};


module.exports = {
  seznamNarocil
};
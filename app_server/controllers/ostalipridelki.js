const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)    
};

if(process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com';
}

var seznam = (req, res) => {
  axios
    .get(apiParametri.streznik + '/api/ostalipridelki', {})
    .then((odgovor) => {
        res.render('ostalipridelki-seznam', {title: 'Seznam ostalih pridelkov',
            ostalipridelki: odgovor.data});
    });
};

var podrobnostiPridelkov = (req, res) => {
  var idOstali = req.params.id;  
    axios
        .get(apiParametri.streznik + '/api/ostalipridelki/'+idOstali, {})
        .then((odgovor) => {
            res.render('podrobno-izdelek', odgovor.data);
        });
};

/*var pridelki = require("../models/pridelki.json");

var seznam = (req, res) => {
  res.render('ostalipridelki-seznam', { 
        title: 'Seznam ostalih pridelkov',
        pridelki: pridelki
    });
};

/* Vrni podrobnosti lokacije */
/*var podrobnostiPridelkov = (req, res) => {
    var id = req.params.id;
    
    pridelki.forEach(function(item, index) {
        if (item.id == id) {
            res.render('podrobno-izdelek', item);
        }
    }
    );
};*/

module.exports = {
    seznam,
    podrobnostiPridelkov
};

// const seznam = (req, res) => {
//   res.render('ostalipridelki-seznam', { title: 'Seznam ostalih pridelkov',
    
//     ostaliPridelki1: [{
//             naziv: 'Cvetlični med',
//             link: '/izdelek',
//             imgSrc: '../images/honey-jar.png'
//         }, {
//             naziv: 'Jagodna marmelada',
//             link: '/izdelek',
//             imgSrc: '../images/jam.png'
//         }, {
//             naziv: 'Jajca',
//             link: '/izdelek',
//             imgSrc: '../images/eggs.png'
//         }, {
//             naziv: 'Jogurt',
//             link: '/izdelek',
//             imgSrc: '../images/frozen-yogurt.png'
//         }, {
//             naziv: 'Mleko',
//             link: '/izdelek',
//             imgSrc: '../images/milk.png'
//         }],
  
//   });
// };

// /* Vrni podrobnosti lokacije */
// const podrobnostiPridelkov = (req, res) => {
//   res.render('podrobno-izdelek', { title: 'Podrobnosti pridelkov' });
  
// };


// module.exports = {
//   seznam,
//   podrobnostiPridelkov
// };
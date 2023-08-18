//var pijaca = require("../models/pijaca.json");

const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)

};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com';
}

var seznam = (req, res) => {

    axios
        .get (apiParametri.streznik + '/api/pijaca', {})
        .then((odgovor) => {
            res.render('pijaca-seznam', { title: 'Seznam pijace',
                pijaca: odgovor.data});
        });

};

var podrobnostiPijace = (req, res) => {

    var idPijace = req.params.id;

    axios
        .get(apiParametri.streznik+'/api/pijaca/'+idPijace, {})
        .then((odgovor) => {
            res.render('podrobno-izdelek', odgovor.data);
        });

};

module.exports = {
    seznam,
    podrobnostiPijace
};

/*

var seznam = (req, res) => {
  res.render('pijaca-seznam', { 
        title: 'Seznam pijače',
        pijaca: pijaca
    });
};

Vrni podrobnosti lokacije
var podrobnostiPijace = (req, res) => {
    var id = req.params.id;
    
    pijaca.forEach(function(item, index) {
        if (item.id == id) {
            res.render('podrobno-izdelek', item);
        }
    }
    );
};
*/


// const seznam = (req, res) => {
//   res.render('pijaca-seznam', { title: 'Seznam pijace',
  
//      pijace1: [{
//             naziv: 'Jabolčni sok',
//             link: '/izdelek',
//             imgSrc: '../images/apple-juice.png'
//         }, {
//             naziv: 'Pomarančni sok',
//             link: '/izdelek',
//             imgSrc: '../images/orange-juice.png'
//         }, {
//             naziv: 'Sirup žajbelj',
//             link: '/izdelek',
//             imgSrc: '../images/sirup-zajbelj.png'
//         }, {
//             naziv: 'Sirup bezeg',
//             link: '/izdelek',
//             imgSrc: '../images/sirup-bezeg.png'
//         }, {
//             naziv: 'Sirup meta',
//             link: '/izdelek',
//             imgSrc: '../images/sirup-meta.png'
//         }],
  
  
//   });
// };

// /* Vrni podrobnosti lokacije */
// const podrobnostiPijace = (req, res) => {
//   res.render('podrobno-izdelek', { title: 'Podrobnosti pijace' });
// };

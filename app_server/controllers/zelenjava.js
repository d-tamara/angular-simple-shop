/* Vrni začetno stran s seznamom lokacij */
// var zelenjava = require("../models/zelenjava-mongodb.json");

const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
    
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com';
}

// to sem dodala 23.12.:
// // to sem dodala 23.12.:
// const axios = require('axios').create({
//     baseURL = apiParametri.streznik,
//     timeout: 5000
// });

var seznam = (req, res) => {
    
    axios
        .get (apiParametri.streznik + '/api/zelenjava', {})
        .then((odgovor) => {
            res.render('zelenjava-seznam', { title: 'Seznam zelenjave',
            zelenjava: odgovor.data});
        });
  
};


var podrobnostiZelenjave = (req, res) => {
    
    var idZelenjave = req.params.id;
    
     axios
        .get(apiParametri.streznik+'/api/zelenjava/'+idZelenjave, {})
        .then((odgovor) => {
            res.render('podrobno-izdelek', odgovor.data);
        });

};

module.exports = {
    seznam,
    podrobnostiZelenjave
};


// /* Vrni začetno stran s seznamom lokacij */
// var zelenjava = require("../models/zelenjava.json");


// const seznam = (req, res) => {
//   res.render('zelenjava-seznam', { title: 'Seznam zelenjave' });
// };

// /* Vrni podrobnosti lokacije */
// const podrobnostiZelenjave = (req, res) => {
//     var idZelenjave = req.params.id;
    
//     zelenjava.forEach(function(item, index) {
//         if (item.id == idZelenjave) {
//             res.render('podrobno-izdelek', item);
//         }
//     }
//     );
//     // res.render('podrobno-izdelek', { title: 'Podrobnosti zelenjave' });
// };


// const axios = require('axios');
// var apiParametri = {
//     streznik: 'http://localhost:' + (process.env.PORT || 8080)
// };
// if (process.env.NODE_ENV === 'production') {
//     apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com/';
// }

// =======

// module.exports = {
//   seznam,
//   podrobnostiZelenjave
// };

// const axios = require('axios');
// var apiParametri = {
//     streznik: 'http://localhost:' + (process.env.PORT || 8080)
// };
// if (process.env.NODE_ENV === 'production') {
//     apiParametri.streznik = 'https://buylocal-heroku.herokuapp.com/';
// }

// const seznam = (req, res) => {
//     axios
//         .get(apiParametri.streznik + "api/zelenjava")
//         .then((odgovor) => {
//             res.render('zelenjava-seznam', {
//                 title: 'Zelenjava',
//                 glavaStrani: {
//                     naslov: 'Zelenjava',
//                     podnaslov: 'Kategorija zelenjava'
//                 },
//                 zelenjava: odgovor.data
//             });
//         })
//   };
  
//   const podrobnostiIzdelka = (req, res) => {
//       var seznamIndex = req.params.id;

//       axios
//         .get(apiParametri.streznik + "/api/zelenjava/" + seznamIndex)
//             .then((odgovor) => {
//                 res.render('podrobno-izdelek', odgovor.data);
//             });
//   };




/* Vrni začetno stran s seznamom lokacij */
/*const seznam = (req, res) => {
    res.render('zelenjava-seznam', { 
        title: 'Seznam zelenjave',

        zelenjave1: [{
            naziv: 'Paradižnik',
            link: '/izdelek',
            imgSrc: '../images/001-tomato.png'
        }, {
            naziv: 'Rdeča paprika',
            link: '/izdelek',
            imgSrc: '../images/002-pepper.png'
        }, {
            naziv: 'Rumena paprika',
            link: '/izdelek',
            imgSrc: '../images/pepper.png'
        }, {
            naziv: 'Zelena paprika',
            link: '/izdelek',
            imgSrc: '../images/pepper-(1).png'
        }, {
            naziv: 'Bučke',
            link: '/izdelek',
            imgSrc: '../images/003-zucchini.png'
        }],
        zelenjave2: [{
            naziv: 'Kumare',
            link: '/izdelek',
            imgSrc: '../images/004-cucumber.png'
        }, {
            naziv: 'Čebula',
            link: '/izdelek',
            imgSrc: '../images/005-onion.png'
        }, {
            naziv: 'Por',
            link: '/izdelek',
            imgSrc: '../images/008-leek.png'
        }, {
            naziv: 'Česen',
            link: '/izdelek',
            imgSrc: '../images/006-clove-garlic.png'
        }, {
            naziv: 'Buča',
            link: '/izdelek',
            imgSrc: '../images/007-pumpkin.png'
        }]
    });
  };*/
  
  // /* Vrni podrobnosti lokacije */
  // const podrobnostiZelenjave = (req, res) => {
  //   res.render('podrobno-izdelek', { title: 'Podrobnosti zelenjave' });
  // };
  
  
  // module.exports = {
  //   seznam,
  //   podrobnostiZelenjave
  // };
  
  /*const podrobnostiIzdelka = (req, res) => {
    res.render('podrobno-izdelek', { 
        title: 'Paradižnik',
        glavaStrani: {
            naslov: 'Paradižnik'
        },
        zelenjava: {
            naziv: 'Paradižnik',
            slika: '../images/001-tomato.png',
            navoljo: [{
                imeKmetije: 'Mlakar',
                stevilo: '10',
                cena: '6 eur/kg'
            }, {
                imeKmetije: 'Mihelič ribarnica',
                stevilo: '0',
                cena: '5 eur/kg'
            }],
        }
    });
  };*/
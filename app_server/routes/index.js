var express = require('express');
var router = express.Router();

var ctrlDomov = require("../controllers/home");
router.get('/', ctrlDomov.home);

// KATEGORIJE
var ctrlKategorije = require("../controllers/kategorije");
router.get('/kategorije', ctrlKategorije.seznamKmetij);

// ZELENJAVA
var ctrlZelenjava = require("../controllers/zelenjava");
router.get('/zelenjava', ctrlZelenjava.seznam);
router.get('/zelenjava/:id', ctrlZelenjava.podrobnostiZelenjave);

//SADJE
var ctrlSadje = require("../controllers/sadje");
router.get('/sadje', ctrlSadje.seznam);
router.get('/sadje/:id', ctrlSadje.podrobnostiSadja);

//PIJAČA
var ctrlPijaca = require("../controllers/pijaca");
router.get('/pijaca', ctrlPijaca.seznam);
router.get('/pijaca/:id', ctrlPijaca.podrobnostiPijace);

//OSTALI IZDELKI
var ctrlPridelki = require("../controllers/ostalipridelki");
router.get('/ostalipridelki', ctrlPridelki.seznam);
router.get('/ostalipridelki/:id', ctrlPridelki.podrobnostiPridelkov);

//....

// PRIJAVA
var ctrlPrijava = require("../controllers/profil-prijava");
router.get('/profil', ctrlPrijava.profil);
router.get('/prijavaKupec', ctrlPrijava.prijavaKupec);

// REGISTRACIJA KUPEC
router.get('/registracijaKupec', ctrlPrijava.registracijaKupec);
router.get('/prijavaProdajalec', ctrlPrijava.prijavaProdajalec);
router.get('/registracijaProdajalec', ctrlPrijava.registracijaProdajalec);

// NAKUP
var ctrlNakup = require("../controllers/nakup");
router.get('/nakup/:id', ctrlNakup.seznamNarocil);

// ZABOJCEK
var ctrlZabojcek = require("../controllers/zabojcek");
router.get('/zabojcek/:id', ctrlZabojcek.seznamNarocil);

// PRODAJALEC PREGLED
var ctrlProdajalecPregled = require("../controllers/prodajalecpregled");
router.get('/prodajalecPregled/:id', ctrlProdajalecPregled.seznamIzdelkovZ);
router.get('/prodajalecPodatki/:id', ctrlProdajalecPregled.seznamPodatkov);
router.get('/narocila/:id', ctrlProdajalecPregled.seznamNarocil);



// PRODAJALEC NOV IZDELEK
var ctrlProdajalecNov = require("../controllers/prodajalec-nov-izdelek");
router.get('/prodajalecNov/:id', ctrlProdajalecNov.obrazec);

// PRODAJALEC UREDI
var ctrlProdajalecUredi = require("../controllers/prodajalec-uredi");
router.get('/prodajalecUredi/:idProdajalca/:idIzdelka', ctrlProdajalecUredi.prodajalecUredi);

var ctrlData = require("../controllers/data");
router.get('/db', ctrlData.seznam);


module.exports = router;


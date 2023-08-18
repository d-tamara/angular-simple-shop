const passport = require('passport');
const mongoose = require('mongoose');
const Kupec = mongoose.model('Kupec');
const Prodajalec = mongoose.model('Prodajalec');

const registracijaKupca = (req, res) => {
    console.log("Pridem do sem pri registraciji");
    console.log("našega kupca");
    if (!req.body.ime || !req.body.priimek || !req.body.email || !req.body.geslo || !req.body.postnaStevilka || !req.body.kraj || !req.body.naslov) {
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    const uporabnik = new Kupec();
    uporabnik.ime = req.body.ime;
    uporabnik.priimek = req.body.priimek;
    uporabnik.email = req.body.email;
    uporabnik.postnaStevilka = req.body.postnaStevilka;
    uporabnik.kraj = req.body.kraj;
    uporabnik.naslov = req.body.naslov;
    uporabnik.nastaviGeslo(req.body.geslo);
    uporabnik.save(napaka => {
        if (napaka) {
            if (napaka.name == "MongoError" && napaka.code == 11000) {
                res.status(400).json({"sporočilo": "Kupec s tem elektronskim naslovom je že registriran"});
            } else {
            res.status(500).json(napaka);
            }
        } else {
            // console.log("Shranim si tole", uporabnik.ime);
            res.status(200).json({"žeton": uporabnik.generirajJwt()});
        }
    });
};



const registracijaProdajalca = (req, res) => {
    if (!req.body.ime || !req.body.priimek || !req.body.imeKmetije || !req.body.geslo || !req.body.naslovKmetije || !req.body.postaKmetije
        || !req.body.krajKmetije || !req.body.podrocjeProdaje || !req.body.email || !req.body.telefon ) {
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    const uporabnik = new Prodajalec();
    uporabnik.ime = req.body.ime;
    uporabnik.priimek = req.body.priimek;
    uporabnik.imeKmetije = req.body.imeKmetije;
    uporabnik.geslo = req.body.geslo;
    uporabnik.naslovKmetije = req.body.naslovKmetije;
    uporabnik.postaKmetije = req.body.postaKmetije;
    uporabnik.krajKmetije = req.body.krajKmetije;
    uporabnik.podrocjeProdaje = req.body.podrocjeProdaje;
    uporabnik.email = req.body.email;
    uporabnik.telefon = req.body.telefon;
    uporabnik.nastaviGeslo(req.body.geslo);
    uporabnik.save(napaka => {
        if (napaka) {
            if (napaka.name == "MongoError" && napaka.code == 11000) {
                res.status(400).json({"sporočilo": "Prodajalec s tem elektronskim naslovom je že registriran"});
            } else {
                res.status(500).json(napaka);
            }
        } else {
            res.status(200).json({"žeton": uporabnik.generirajJwt()});
        }
    });
};




const prijavaKupca = (req, res) => {
    if (!req.body.email || !req.body.geslo) {
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki pri prijavi!"});
    }
    console.log("Halo");
    passport.authenticate('local', (napaka, uporabnik, informacije) => {
        //console.log("neki je scena");
        if (napaka)
            return res.status(500).json(napaka);
        if (uporabnik) {
            res.status(200).json({"žeton": uporabnik.generirajJwt()});
        } else {
            res.status(401).json(informacije);
        }
    })(req, res);
};


const prijavaProdajalca = (req, res) => {
    if (!req.body.email || !req.body.geslo) {
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    

    console.log("Halo");
    passport.authenticate('local', (napaka, uporabnik, informacije) => {
        console.log("neki je scena u passportu");
        if (napaka)
            return res.status(500).json(napaka);
        if (uporabnik) {
            res.status(200).json({"žeton": uporabnik.generirajJwt()});
        } else {
            console.log("pride do napake");
            res.status(401).json(informacije);
        }
    })(req, res);
};



module.exports = {
    registracijaKupca,
    prijavaKupca,
    registracijaProdajalca,
    prijavaProdajalca
};


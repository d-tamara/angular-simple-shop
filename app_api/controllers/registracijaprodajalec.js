const mongoose = require('mongoose');
const RegistracijaProdajalec = mongoose.model('Prodajalec');

// seznam za izpis sodelujocih kmetij na /kategorije
const RegistracijaProdajalecSeznam = (req,res) => {
    RegistracijaProdajalec.find().exec(function (err, seznam) {
        if (err) {
            console.log(err);
            res.status(404).json({"sporočilo": "Napaka pri poizvedbi: " + err});
        } else {
            res.status(200).json(seznam);
        }
    });
};

// post metoda za ustvarjanje novega prodajalca na /registracijaProdajalec
const prodajalecKreiraj = (req, res) => {
    RegistracijaProdajalec.create({

            ime: req.body.ime,
            priimek: req.body.priimek,
            imeKmetije: req.body.imeKmetije,
            naslovKmetije: req.body.naslovKmetije,
            postaKmetije: req.body.postaKmetije,
            krajKmetije: req.body.postaKmetije,
            podrocjeProdaje: req.body.podrocjeProdaje,
            telefon: req.body.telefon,
            email: req.body.email,
            geslo: req.body.geslo
        }, (napaka, prodajalec) => {
            if(napaka) {
                res.status(400).json(napaka);
            }  else {
                // tle more it na prodajalecPregled/id
                res.status(201).json(prodajalec)
                
            }
        }
    );
};

module.exports = {
    RegistracijaProdajalecSeznam,
    prodajalecKreiraj
    
};
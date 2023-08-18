const mongoose = require('mongoose');
const PrijavaKupec = mongoose.model('Kupec');

const prijavaKupecSeznam = (req,res) => {
    PrijavaKupec.find().exec(function (err, seznam) {
        if (err) {
            console.log(err);
            res.status(404).json({"sporočilo": "Napaka pri poizvedbi: " + err});
        } else {
            res.status(200).json(seznam);
        }
    });
};

const vrniKupca = (req, res, pkOdgovor) => {
    if (req.payload && req.payload.email) {
        PrijavaKupec
            .findOne({email: req.payload.email})
            .exec((napaka, uporabnik) => {
                if (!uporabnik)
                    return res.status(404).json({"sporočilo": "Ne najdem uporabnika"});
                else if (napaka)
                    return res.status(500).json(napaka);
                pkOdgovor(req, res, uporabnik.ime);
            });
    } else {
        return res.status(400).json({"sporočilo": "Ni podatka o uporabniku"});
    }
};

module.exports = {
    prijavaKupecSeznam,
    vrniKupca
};
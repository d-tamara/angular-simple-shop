const mongoose = require('mongoose');
const Kupec = mongoose.model('Kupec');

//post metoda za dodajanje v zabojcek

const dodajIzdelek = (req, res, podatki) => {
    if (!podatki) {
        res.status(404).json({"sporočilo": "Ne najdem prodajalca."});
    } else {
        podatki.izdelkiVZabojcku.push({
            ime: req.body.ime,
            kolicina: req.body.kolicina,
            cena: req.body.cena,
            imeKmetije: req.body.imeKmetije
        });
        podatki.save((napaka, podatki) => {
            if (napaka) {
                res.status(400).json(napaka);
            } else {

                const dodaniIzdelek = podatki.izdelkiVZabojcku.slice(-1).pop();
                res.status(201).json(dodaniIzdelek);
            }
        });
    }
};

const dodajVZabojcek = (req,res) => {
    if (!req.params.idNakupa) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem podatkov."
        });
    }
    Kupec
        .findById(req.params.idNakupa)
        .select('izdelkiVZabojcku')
        .exec((napaka, podatki) => {
            if (napaka) {
                res.status(400).json(napaka);
            } else {
                dodajIzdelek(req, res, podatki);
                res.status(200).json({"status": "uspešno"});
            }
        });
}



// izbrise celo podshemo izdelkiVzabojcku
const zabojcekIzbrisiIzdelek = (req, res) => {
    const {idNakupa, idDodanegaIzdelka} = req.params;
    if (!idNakupa || !idDodanegaIzdelka) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem zabojcka ali dodanega izdelka."
        });
    }
    Kupec
        .findById(idNakupa)
        .select('izdelkiVZabojcku')
        .exec((napaka, podatki) => {
            if (!podatki) {
                return res.status(404).json({"sporočilo": "Ne najdem izdelkov."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (podatki.izdelkiVZabojcku && podatki.izdelkiVZabojcku.length > 0) {
                if (!podatki.izdelkiVZabojcku.id(idDodanegaIzdelka)) {
                    return res.status(404).json({"sporočilo": "Ne najdem izdelka."});
                } else {
                    podatki.izdelkiVZabojcku.id(idDodanegaIzdelka).remove();
                    podatki.save((napaka) => {
                        if (napaka) {
                            return res.status(500).json(napaka);
                        } else {
                            return res.status(204).json({"status": "uspešno"});
                        }
                    });
                }
            } else {
                res.status(404).json({"sporočilo": "Ni izdelka za brisanje."});
            }
        });
};


module.exports = {
    dodajVZabojcek,
    zabojcekIzbrisiIzdelek
};
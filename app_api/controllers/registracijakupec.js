const mongoose = require('mongoose');
const RegistracijaKupec = mongoose.model('Kupec');

const RegistracijaKupecSeznam = (req,res) => {
    RegistracijaKupec.find().exec(function (err, seznam) {
        if (err) {
            console.log(err);
            res.status(404).json({"sporočilo": "Napaka pri poizvedbi: " + err});
        } else {
            res.status(200).json(seznam);
        }
    });
};

const kupecKreiraj = (req, res) => {
    RegistracijaKupec.create({

            ime: req.body.ime,
            priimek: req.body.priimek,
            email: req.body.email,
            geslo: req.body.geslo,
            postnaStevilka: req.body.postnaStevilka,
            naslov: req.body.naslov,
            kraj: req.body.kraj
        }, (napaka, kupec) => {
            if(napaka) {
                res.status(400).json(napaka);
            }  else {
                res.status(201).json(kupec)
            }
        }
    );
};

// const registracija = (req, res) => {
//     if (!req.body.ime || !req.body.email || !req.body.geslo) {
//         return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
//     }
//     Kupec.create({

//             ime: req.body.ime,
//             priimek: req.body.priimek,
//             email: req.body.email,
//             geslo: req.body.geslo,

//         }
//     );
//     ustvariUporabnika(ime,priimek,email,geslo);
// };

// const ustvariUporabnika = (ime,priimek,email,geslo) => {
//     const uporabnik = new Kupec();
//     uporabnik.ime = ime;
//     uporabnik.priimek = priimek;
//     uporabnik.email = email;
//     uporabnik.nastaviGeslo(geslo);

//     uporabnik.save(napaka => {
//         if (napaka) {
//             res.status(500).json(napaka);
//         } else {
//             res.status(200).json({"žeton": uporabnik.generirajJwt()});
//         }
//     })
// }







    /*
    const uporabnik = new Kupec();
    uporabnik.ime = req.body.ime;
    uporabnik.priimek = req.body.priimek;
    uporabnik.email = req.body.email;
    uporabnik.nastaviGeslo(req.body.geslo);
    uporabnik.save(napaka => {
        if (napaka) {
            res.status(500).json(napaka);
        } else {
            res.status(200).json({"žeton": uporabnik.generirajJwt()});
        }
    }); */




// --------------------------------------
/*
const registracijaKupecSeznam = (req,res) => {
    RegistracijaKupec.find().exec(function (err, seznam) {
        if (err) {
            console.log(err);
            res.status(404).json({"sporočilo": "Napaka pri poizvedbi: " + err});
        } else {
            res.status(200).json(seznam);
        }
    });
};


const kupecKreiraj = (req, res) => {
    RegistracijaKupec.create({
        
        ime: req.body.ime,
        priimek: req.body.priimek,
        email: req.body.email,
        geslo: req.body.geslo,
    }, (napaka, kupec) => {
        if(napaka) {
            res.status(400).json(napaka);
        }  else {
            res.redirect("/kategorije");
        }
    }
    );
};
*/


module.exports = {
    RegistracijaKupecSeznam,
    kupecKreiraj
};
const mongoose = require('mongoose');
const Prodajalec = mongoose.model('Prodajalec');

// podatki posameznega prodajalca
const podatkiPodrobnosti = (req,res) => {
    // var id = req.params.email;
    var id = req.params.idPodatkov;
    // console.log(id);
    Prodajalec.findById(id).exec(function (err, podatki) {
    // Prodajalec.find(id).exec(function (err, podatki) {
        if(err) {
         console.log(err);
         res.status(404).json({"sporočilo": "Napaka pri iskanju id podatkov: " + err});
     } else {
        res.status(200).json(podatki);
     }
    
    });
};

// posodabljanje podatkov za posameznega prodajalca / kmetijo
const posodobiPodatke = (req, res) => {
    if (!req.params.idPodatkov) {
    return res.status(404).json({
      "sporočilo": 
        "Ne najdem podatkov."
    });
  }
  Prodajalec
    .findById(req.params.idPodatkov)
    .select('-ime -priimek -postaKmetije -podrocjeProdaje -geslo -izdelki -narocila')
    .exec((napaka, podatki) => {
      if (!podatki) {
        return res.status(404).json({"sporočilo": "Ne najdem prodajalca."});
      } else if (napaka) {
        return res.status(500).json(napaka);
      }
      podatki.ime = req.body.ime;
      podatki.priimek = req.body.priimek;
      podatki.imeKmetije = req.body.imeKmetije;
      podatki.naslovKmetije = req.body.naslovKmetije;
      podatki.krajKmetije = req.body.krajKmetije;
      podatki.postaKmetije = req.body.postaKmetije;
      podatki.telefon = req.body.telefon;
      podatki.email = req.body.email;
      
      podatki.save((napaka, podatki) => {
        if (napaka) {
          res.status(404).json(napaka);
        } else {
          res.status(201).json(podatki);
        }
        
      });
    });
    
    
};

// dodajanje novega izdelka
const dodajIzdelek = (req, res, podatki) => {
    // console.log(podatki);
  if (!podatki) {
    res.status(404).json({"sporočilo": "Ne najdem prodajalca."});
  } else {
    podatki.izdelki.push({
      kategorija: req.body.kategorija,
      ime: req.body.ime,
      cena: req.body.cena,
      kolicina: req.body.kolicina
    });
    podatki.save((napaka, podatki) => {
      if (napaka) {
        res.status(400).json(napaka);
      } else {

        const dodaniIzdelek = podatki.izdelki.slice(-1).pop();
        res.status(201).json(dodaniIzdelek);
      }
    });
  }
};

const izdelkiKreiraj = (req,res) => {
    const idPodatkov = req.params.idPodatkov;
    if (idPodatkov) {
        Prodajalec
            .findById(req.params.idPodatkov)
            .select('izdelki')
            .exec((napaka, podatki) => {
                console.log("tule:", podatki);
                if (napaka) {
                    res.status(400).json(napaka);
                } else {
                    dodajIzdelek(req, res, podatki);
                    res.status(200).json({"status": "uspešno"});
                }
            });
    } else {
        res.status(400).json({
            "sporočilo":
                "Ne najdem lokacije, idLokacije je obvezen parameter."
        });
    }
}


// izpis posameznega izdelka, ki jih ima prodajalec
const izdelekPreberiIzbranega = (req, res) => {
  Prodajalec
    .findById(req.params.idPodatkov)
    .select('imeKmetije izdelki')
    .exec((napaka, prodajalec) => {
      if (!prodajalec) {
        return res.status(404).json({
          "sporočilo": 
            "Ne najdem prodajalca s podanim enoličnim identifikatorjem idProdajalca."
        });
      } else if (napaka) {
        return res.status(500).json(napaka);
      }
      if (prodajalec.izdelki && prodajalec.izdelki.length > 0) {
        const izdelek = prodajalec.izdelki.id(req.params.idIzdelka);
        if (!izdelek) {
          return res.status(404).json({
            "sporočilo": 
              "Ne najdem izdelka s podanim enoličnim identifikatorjem idIzdelka."
          });
        } else {
          res.status(200).json(
            izdelek
            
          );
        }
      } else {
        return res.status(404).json({
          "sporočilo": 
            "Ne najdem nobenega izdelka."
        });
      }
    });
};

// urejanje obstojecega izdelka
const izdelekPosodobiIzbranega = (req,res) => {

    if (!req.params.idPodatkov || !req.params.idIzdelka) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem podatkov." +
                "idPodatkov in idIzdelka sta obvezna parametra."
        });
    }
    Prodajalec
        .findById(req.params.idPodatkov)
        .select('izdelki')
        .exec((napaka, prodajalec) => {
            if (!prodajalec) {
                return res.status(404).json({"sporočilo": "Ne najdem prodajalca."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (prodajalec.izdelki && prodajalec.izdelki.length > 0) {
                const izdelek = prodajalec.izdelki.id(req.params.idIzdelka);
                if (!izdelek) {
                    return res.status(404).json({"sporočilo": "Ne najdem izdelka."});
                } else {
                    izdelek.cena = req.body.cena;
                    izdelek.kolicina = req.body.kolicina;

                    prodajalec.save((napaka, prodajalec) => {
                        if (napaka) {
                            res.status(404).json(napaka);
                        } else {
                            res.status(200).json(prodajalec);
                        }
                    });
                }
            }
        });
};

//brisanje obstojecega izdelka

const prodajalecIzbrisiIzdelek = (req, res) => {
    const {idPodatkov, idIzdelka} = req.params;
    if (!idPodatkov || !idIzdelka) {
        return res.status(404).json({
            "sporočilo":
                "Ne najdem prodajalca ali izdelka."
        });
    }
    Prodajalec
        .findById(idPodatkov)
        .select('izdelki')
        .exec((napaka, podatki) => {
            if (!podatki) {
                return res.status(404).json({"sporočilo": "Ne najdem izdelkov."});
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            if (podatki.izdelki && podatki.izdelki.length > 0) {
                if (!podatki.izdelki.id(idIzdelka)) {
                    return res.status(404).json({"sporočilo": "Ne najdem izdelka."});
                } else {
                    podatki.izdelki.id(idIzdelka).remove();
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
    podatkiPodrobnosti,
    izdelekPreberiIzbranega,
    posodobiPodatke,
    izdelkiKreiraj,
    dodajIzdelek,
    izdelekPosodobiIzbranega,
    prodajalecIzbrisiIzdelek
};
const mongoose = require('mongoose');
const Kupec = mongoose.model("Kupec");
const Prodajalec = mongoose.model('Prodajalec');
const Izdelek = mongoose.model('Izdelek');


const vsebinaKupci = require('../models/kupec-novo.json');
const vsebinaProdajalci = require('../models/prodajalec-novo.json');
const vsebinaIzdelki = require('../models/izdelek-novo.json');

function Latch(limit) {
    this.limit = limit;
    this.count = 0;
    this.waitBlock = function () {
    };
};

Latch.prototype.async = function (fn, ctx) {
    var _this = this;
    setTimeout(function () {
        fn.call(ctx, function () {
            _this.count = _this.count + 1;
            if (_this.limit <= _this.count) {
                _this.waitBlock.call(_this.waitBlockCtx);
            }
        });
    }, 0);
};

Latch.prototype.await = function (callback, ctx) {
    this.waitBlock = callback;
    this.waitBlockCtx = ctx;
};

const dodajZacetnoVsebino = (req, res, pkOdgovor) => {
    var sporocilo = "Vsebina podatkovne baze je bila uspešno dodana.";
    var barrier = new Latch(vsebinaKupci.length + vsebinaProdajalci.length + vsebinaIzdelki.length);

    barrier.async(function (koncano) {
        for (var kupec of vsebinaKupci) {
            const k = new Kupec();
            k.ime = kupec.ime;
            k.priimek = kupec.priimek;
            k.email = kupec.email;

            k.postnina = kupec.postnina;
            k.cena = kupec.cena;
            k.datumDostave = kupec.datumDostave;
            k.nacinPlacila = kupec.nacinPlacila;
            k.postnaStevilka = kupec.postnaStevilka;
            k.naslov = kupec.naslov;
            k.kraj = kupec.kraj;
            k.izdelkiVZabojcku = kupec.izdelkiVZabojcku;

            k.nastaviGeslo(kupec.geslo);

            Kupec
                .findOne({email: kupec.email})
                .exec((napaka, najdenUporabnik) => {
                    if (!najdenUporabnik) {
                        k.save(k, (napaka, upo) => {
                            if (napaka)
                                sporocilo = napaka;

                            koncano();
                        });
                    } else
                        koncano();
                });

        }
    });

    barrier.async(function (koncano) {
        for (var prodajalec of vsebinaProdajalci) {
            const p = new Prodajalec();
            p.ime = prodajalec.ime;
            p.priimek = prodajalec.priimek;
            p.email = prodajalec.email;

            p.imeKmetije = prodajalec.imeKmetije;
            p.naslovKmetije = prodajalec.naslovKmetije;
            p.postaKmetije = prodajalec.postaKmetije;
            p.krajKmetije = prodajalec.krajKmetije;
            p.podrocjeProdaje = prodajalec.podrocjeProdaje;

            p.telefon = prodajalec.telefon;
            p.izdelki = prodajalec.izdelki;
            p.narocila = prodajalec.narocila;


            p.nastaviGeslo(prodajalec.geslo);
            // console.log(p);
            Prodajalec
                .findOne({email: prodajalec.email})
                .exec((napaka, najdenUporabnik) => {
                   // console.log(najdenUporabnik);
                    if (!najdenUporabnik) {
                        p.save(p, (napaka, upo) => {
                            if (napaka)
                                sporocilo = napaka;
                            // console.log(upo);
                            koncano();
                        });
                    } else
                        koncano();
                });

        }
    });

    barrier.async(function (koncano) {
        for (var izdelek of vsebinaIzdelki) {
            vsebina = {
                naziv: izdelek.naziv,
                kategorija: izdelek.kategorija,
                imgSrc: izdelek.kategorija,
                zaloga: izdelek.zaloga
            }

            // if (typeof (namig.naziv) == 'object')
            //     vsebina.avtor = vsebinaAvtorji.length > 0 ? vsebinaAvtorji[0].ime : "neznan študent";
            // else
            //     vsebina.avtor = vsebinaAvtorji.length > 1 ? vsebinaAvtorji[1].ime : "neznan študent";

            Izdelek.create(vsebina, (napaka, izdelek) => {
                if (napaka)
                    sporocilo = napaka;

                koncano();
            });

        }
    });

    // barrier.async(function (koncano) {
    //     for (var izdelek of vsebinaIzdelki) {
    //         const i = new Izdelek();
    //         i.kategorija = izdelek.kategorija;
    //         i.naziv = izdelek.naziv;
    //         i.imgSrc = izdelek.imgSrc;
    //         i.zaloga = izdelek.zaloga;
    //         // console.log(i);
    //         Izdelek
    //             .findOne({naziv: izdelek.naziv})
    //             .exec((napaka, najdenUporabnik) => {
    //                 // console.log(najdenUporabnik);
    //                 if (!najdenUporabnik) {
    //                     i.save(i, (napaka, upo) => {
    //                         // console.log(izdelek.naziv);
    //                         // console.log("Ni najdene zelenjave");
    //                         if (napaka)
    //                             sporocilo = napaka;
    //                         // console.log(upo);
    //                         koncano();
    //                     });
    //                 } else {
    //                     // console.log(najdenUporabnik);
    //                     koncano();
    //                 }
    //             });
    //
    //     }
    // });


    // Počakamo, da se vsi vnosa vsebina shrani
    barrier.await(function () {
        res.status(200).json({"sporočilo": sporocilo});
    });
};

const izbrisiVsebino = (req, res) => {
    Kupec.collection.drop();
    Prodajalec.collection.drop();
    Izdelek.collection.drop();

    res.status(200).json({"sporočilo": "Vsebina podatkovne baze je bila uspešno izbrisana."});
};

module.exports = {
    dodajZacetnoVsebino,
    izbrisiVsebino
}
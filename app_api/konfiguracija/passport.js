const passport = require('passport');
const LokalnaStrategija = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Kupec = mongoose.model('Kupec');
const Prodajalec = mongoose.model('Prodajalec');

passport.use(
    new LokalnaStrategija(
        {
            usernameField: 'email',
            passwordField: 'geslo'
        },
        (uporabniskoIme, geslo, pkKoncano) => {
            Kupec.findOne(
                { email: uporabniskoIme },
                (napaka, uporabnik) => {
                    if (napaka)
                        return pkKoncano(napaka);
                    if (!uporabnik) {
                        return pkKoncano(null, false, {
                            "sporočilo": "Napačen vnos epošte"
                        });
                    }
                    if (!uporabnik.preveriGeslo(geslo)) {
                        console.log("Napačno geslo");
                        return pkKoncano(null, false, {
                            "sporočilo": "Napačno geslo"
                        });
                    }
                    return pkKoncano(null, uporabnik);
                }
            );
        }
    )
);

passport.use(
    new LokalnaStrategija(
        {
            usernameField: 'email',
            passwordField: 'geslo'
        },
        (uporabniskoIme, geslo, pkKoncano) => {
            Prodajalec.findOne(
                { email: uporabniskoIme },
                (napaka, uporabnik) => {
                    if (napaka)
                        return pkKoncano(napaka);
                    if (!uporabnik) {
                        return pkKoncano(null, false, {
                            "sporočilo": "Napačen vnos epošte"
                        });
                    }
                    if (!uporabnik.preveriGeslo(geslo)) {
                        return pkKoncano(null, false, {
                            "sporočilo": "Napačno geslo"
                        });
                    }
                    return pkKoncano(null, uporabnik);
                }
            );
        }
    )
);
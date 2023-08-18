const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components:
 *  schemas:
 *   izdelkiZabojcekShema:
 *    type: object
 *    properties:
 *     ime:
 *      type: string
 *     kolicina:
 *      type: string
 *     cena:
 *      type: string
 *     imeKmetije:
 *      type: string
 *   IzdelekKDodaj:
 *    type: object
 *    properties:
 *     ime:
 *      type: string
 *      example: Paradiznik
 *     kolicina:
 *      type: string
 *      example: 11
 *     cena:
 *      type: string
 *      example: 22
 *     imeKmetije:
 *      type: string
 *      example: Kmetije Rebernik
 *    required:
 *     - ime
 *     - kolicina
 *     - cena
 *     - imeKmetije
 *   IzdelekKBranje:
 *    type: object
 *    properties:
 *     ime:
 *      type: string
 *      example: Paradiznik
 *     kolicina:
 *      type: string
 *      example: 11
 *     cena:
 *      type: string
 *      example: 22
 *     imeKmetije:
 *      type: string
 *      example: Kmetije Rebernik
 */

const izdelkiZabojcekShema = new mongoose.Schema({
    ime: {type: String},
    kolicina: {type: String},
    cena: {type: String},
    imeKmetije: {type: String}

});


/**
 * @swagger
 * components:
 *  schemas:
 *   KupecPrijava:
 *    type: object
 *    description: Podatki kupca za prijavo
 *    properties:
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: luka@novak.net
 *     geslo:
 *      type: string
 *      format: password
 *      example: test
 *    required:
 *     - email
 *     - geslo
 *   KupecRegistracija:
 *    type: object
 *    description: Podatki kupca za registracijo
 *    properties:
 *     ime:
 *      type: string
 *      description: ime kupca
 *      writeOnly: true
 *      example: Luka
 *     priimek:
 *      type: string
 *      description: priimek kupca
 *      writeOnly: true
 *      example: Novak
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: luka@novak.net
 *     geslo:
 *      type: string
 *      format: password
 *      example: test
 *     postnaStevilka:
 *      type: string
 *      description: poštna številka
 *      example: 1000
 *     kraj:
 *      type: string
 *      description: kraj
 *      example: Ljubljana
 *     naslov:
 *      type: string
 *      description: naslov bivanja
 *      example: Bohoriceva 81a
 *    required:
 *     - ime
 *     - email
 *     - geslo
 *   KupecPodatki:
 *    type: object
 *    description: Izpis podatkov kupca.
 *    properties:
 *     ime:
 *      type: string
 *      description: ime kupca
 *      writeOnly: true
 *      example: Luka
 *     priimek:
 *      type: string
 *      description: priimek kupca
 *      writeOnly: true
 *      example: Novak
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: luka@novak.net
 *     geslo:
 *      type: string
 *      format: password
 *      example: test
 *     postnina:
 *      type: string
 *      description: cena postnine
 *      example: 2€
 *     cena:
 *      type: string
 *      description: cena nakupa
 *      example: 20€
 *     datumDostave:
 *      type: string
 *      description: datum predvidene dostave
 *      example: 4.1.2020
 *     nacinPlacila:
 *      type: string
 *      description: način plačila
 *      example: ob prevzemu
 *     postnaStevilka:
 *      type: string
 *      description: poštna številka
 *      example: 1000
 *     naslov:
 *      type: string
 *      description: naslov bivanja
 *      example: Bohoriceva 81a
 *     kraj:
 *      type: string
 *      description: kraj
 *      example: Ljubljana
 *     izdelkiVZabojcku:
 *      type: array
 *      description: izdelki kupca v zabojcku
 *      example:
 *       - Paradiznik
 *         5
 *         10
 *         Kmetija Rebernik
 *       - Kumare
 *         10
 *         10
 *         Janezova domacija
 *   AvtentikacijaOdgovor:
 *    type: object
 *    description: Rezultat uspešne avtentikacije uporabnika
 *    properties:
 *     žeton:
 *      type: string
 *      description: JWT žeton
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZhMjBlZDlhZGM0MzIyNmY0NjhkZjMiLCJlbGVrdHJvbnNraU5hc2xvdiI6ImRlamFuQGxhdmJpYy5uZXQiLCJpbWUiOiJEZWphbiBMYXZiacSNIiwiZGF0dW1Qb3Rla2EiOjE1Nzc5NTU2NjMsImlhdCI6MTU3NzM1MDg2M30.PgSpqjK8qD2dHUsXKwmqzhcBOJXUUwtIOHP3Xt6tbBA
 *    required:
 *     - žeton
 *   Napaka:
 *    type: object
 *    description: Podrobnosti napake
 *    required:
 *     - sporočilo
 *    properties:
 *     sporočilo:
 *      type: string
 *    example:
 *     sporočilo: Parametri so obvezni.
 */

const uporabnikiShema = new mongoose.Schema({
    ime: {type: String, unique: true},
    priimek: {type: String},
    email: {type: String, unique: true, required: true},
    postnina: {type: String},
    cena: {type: String},
    datumDostave: {type: String},
    nacinPlacila: {type: String},
    postnaStevilka: {type: String},
    naslov: {type: String},
    kraj: {type: String},
    izdelkiVZabojcku: [izdelkiZabojcekShema],
    zgoscenaVrednost: {type: String, required: true},
    nakljucnaVrednost: {type: String, required: true}
});


uporabnikiShema.methods.nastaviGeslo = function(geslo) {
    this.nakljucnaVrednost = crypto.randomBytes(16).toString('hex');
    this.zgoscenaVrednost = crypto
        .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
         .toString('hex');
};

uporabnikiShema.methods.preveriGeslo = function(geslo) {
     let zgoscenaVrednost = crypto
         .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
         .toString('hex');
    return this.zgoscenaVrednost === zgoscenaVrednost;
};

//generiranje JWT žetona za avtentikacijo uporabnika ob zahtevah na strežnik preko api
 uporabnikiShema.methods.generirajJwt = function() {
     //console.log("Generiranje JWT...");
     const datumPoteka = new Date();
     datumPoteka.setDate(datumPoteka.getDate() + 7);

     return jwt.sign({
         _id: this._id,
         email: this.email,
         ime: this.ime,
         priimek: this.priimek,
         naslov: this.naslov,
         kraj: this.kraj,
         postnaStevilka: this.postnaStevilka,
         exp: parseInt(datumPoteka.getTime() / 1000, 10)
     }, process.env.JWT_GESLO);
 };

mongoose.model('Kupec', uporabnikiShema, 'Kupci');

/**
 * @swagger
 *  components:
 *   examples:
 *    NeNajdemNakupa:
 *     summary: ne najdem nakupa
 *     value:
 *      sporočilo: Ne najdem nakupa.
 *    NeNajdemIzdelka:
 *     summary: ne najdem izdelka
 *     value:
 *      sporočilo: Ne najdem izdelka.
 *    NiNobenegaIzdelka:
 *     summary: ni nobenega izdelka
 *     value:
 *      sporočilo: Ni nobenega izdelka.
 *    NiZetona:
 *     summary: ni JWT žetona
 *     value:
 *      sporočilo: "UnauthorizedError: No authorization token was found."
 */
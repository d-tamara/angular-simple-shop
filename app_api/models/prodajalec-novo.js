const mongoose = require('mongoose')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components:
 *  schemas:
 *   IzdelekBranje:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolicni identifikator
 *      example: 5ded18eb51386c3799833191
 *     kategorija:
 *      type: string
 *      example: Ostali pridelki
 *     ime:
 *      type: string
 *      example: Akacijev med
 *     cena:
 *      type: string
 *      example: 11
 *     kolicina:
 *      type: string
 *      example: 20
 *   IzdelekDodaj:
 *    type: object
 *    properties:
 *     kategorija:
 *      type: string
 *      example: Ostali pridelki
 *     ime:
 *      type: string
 *      example: Cvetlicni med
 *     cena:
 *      type: string
 *      example: 12
 *     kolicina:
 *      type: string
 *      example: 90
 *    required:
 *     - ime
 *     - kategorija
 *     - cena
 *     - kolicina
 *   IzdelekUrejanje:
 *    type: object
 *    properties:
 *     cena:
 *      type: string
 *      example: 13
 *     kolicina:
 *      type: string
 *      example: 78
 *    required:
 *      - cena
 *      - kolicina
 *   IzdelekProdajalec:
 *    description: Podatki izdelka z nazivom in enolicnim identifikatorjem prodajalca
 *    type: object
 *    properties:
 *     prodajalec:
 *      type: object
 *      properties:
 *       _id:
 *        type: string
 *        format: uuid
 *        example: 5ded18eb51386c3799833191
 *      required:
 *       - _id
 *     izdelek:
 *      type: object
 *      $ref: "#/components/schemas/IzdelekBranje"
 *    required:
 *     - prodajalec
 *     - izdelek
 */

const izdelekPShema = new mongoose.Schema({
    kategorija: {type: String},
    ime: {type: String},
    cena: {type: String},
    kolicina: {type: String}
});

/**
 * @swagger
 * components:
 *  schemas:
 *   NarocilaPodrobnosti:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      example: 5e04bfb6a3aff223697cbbcb
 *     cena:
 *      type: string
 *      example: 22.5
 *     status:
 *      type: string
 *      example: v obdelavi
 *     seznamIzdelkov:
 *      type: array
 *      description: seznam naročenih izdelkov
 *      example:
 *       - paradiznik
 *       - paprika
 *       - kumare
 */

const narociloShema = new mongoose.Schema({
    cena: {type: String},
    status: {type: String},
    seznamIzdelkov: [{type: String}],
});

/**
 * @swagger
 * components:
 *  schemas:
 *   ProdajalecPrijava:
 *    type: object
 *    description: Podatki kupca za prijavo
 *    properties:
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: janez@macek.net
 *     geslo:
 *      type: string
 *      format: password
 *      example: test
 *    required:
 *     - email
 *     - geslo
 *   ProdajalecRegistracija:
 *    type: object
 *    description: Podatki prodajalca za registracijo
 *    properties:
 *     ime:
 *      type: string
 *      description: ime prodajalca
 *      writeOnly: true
 *      example: Janez
 *     priimek:
 *      type: string
 *      description: priimek prodajalca
 *      writeOnly: true
 *      example: Maček
 *     email:
 *      type: string
 *      description: elektronski naslov
 *      example: janez@macek.net
 *     geslo:
 *      type: string
 *      format: password
 *      example: test
 *     imeKmetije:
 *      type: string
 *      description: ime kmetije
 *     naslovKmetije:
 *      type: string
 *      example: Ljubljanska 15
 *     postaKmetije:
 *      type: string
 *      example: 1263
 *     krajKmetije:
 *      type: string
 *     podrocjeProdaje:
 *      type: string
 *      description: področje prodaje kmetije
 *      example: zelenjava, sadje
 *     telefon:
 *      type: string
 *      description: telefonska številka kmetije
 *      example: 040853224
 *    required:
 *     - email
 *     - geslo
 *     - ime
 *     - priimek
 *     - postaKmetije
 *     - imeKmetije
 *     - naslovKmetije
 *     - krajKmetije
 *     - podrocjeProdaje
 *     - telefon
 *   SeznamProdajalcev:
 *    type: array
 *    description: Seznam vseh sodelujocih kmetij oziroma prodajalcev.
 *    items: ProdajalecHome
 *   ProdajalecHome:
 *    type: object
 *    description: Pregled prodajalca
 *    properties:
 *     ime:
 *      type: string
 *      description: ime prodajalca
 *      example: Janez
 *     priimek:
 *      type: string
 *      description: priimek prodajalca
 *      example: Marn
 *     imeKmetije:
 *      type: string
 *      description: ime prodajalceve kmetije
 *      example: Turisticna kmetija Marn
 *     naslovKmetije:
 *      type: string
 *      description: naslov kmetije
 *      example: Marnova ulia 7
 *     krajKmetije:
 *      type: string
 *      description: kraj kmetije
 *      example: Ljubljana
 *     postaKmetije:
 *      type: string
 *      description: postna stevilka kraja kmetije
 *      example: 1000
 *     email:
 *      type: string
 *      description: telefonska stevilka kmetije
 *      example: janez@marnovakmetija.si
 *     izdelki:
 *      type: array
 *      description: izdelki, ki jih prodajalec prodaja
 *      example:
 *       - Zelenjava
 *         Paradiznik
 *         3
 *         500
 *       - Zelenjava
 *         Kumare
 *         1
 *         1650
 *     narocila:
 *      type: array
 *      description: narocila kupcev, ki vsebujejo prodajalceve izdelke
 *      example:
 *       - 22
 *         Placano
 *         Paradiznik, Kumare
 *       - 31
 *         V obdelavi
 *         Paradiznik, Korenje, Paprika
 *   ProdajalecUrejanjePodatkov:
 *    type: object
 *    description: urejanje podatkov prodajalca
 *    properties:
 *     ime:
 *      type: string
 *      description: ime prodajalca
 *      example: Janez
 *     priimek:
 *      type: string
 *      description: priimek prodajalca
 *      example: Marn
 *     imeKmetije:
 *      type: string
 *      description: ime prodajalceve kmetije
 *      example: Turisticna kmetija Marn
 *     naslovKmetije:
 *      type: string
 *      description: naslov kmetije
 *      example: Marnova ulia 7
 *     krajKmetije:
 *      type: string
 *      description: kraj kmetije
 *      example: Ljubljana
 *     postaKmetije:
 *      type: string
 *      description: postna stevilka kraja kmetije
 *      example: 1000
 *     email:
 *      type: string
 *      description: telefonska stevilka kmetije
 *      example: janez@marnovakmetija.si
 *     telefon:
 *      type: string
 *      description: telefon kmetije
 *      example: 041567456
 *    required:
 *     - ime
 *     - priimek
 *     - imeKmetije
 *     - naslovKmetije
 *     - krajKmetije
 *     - postaKmetije
 *     - email
 *     - telefon
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

const prodajalecShema = new mongoose.Schema({
    ime: {type: String},
    priimek: {type: String},
    imeKmetije: {type: String},
    naslovKmetije: { type: String},
    postaKmetije: {type: String},
    krajKmetije: {type: String},
    podrocjeProdaje: {type: String},
    email: {type: String, required: true},
    telefon: {type: String},
    izdelki: [izdelekPShema],
    narocila: [narociloShema],
    zgoscenaVrednost: {type: String, required: true},
    nakljucnaVrednost: {type: String, required: true}
});

prodajalecShema.methods.nastaviGeslo = function(geslo) {
    this.nakljucnaVrednost = crypto.randomBytes(16).toString('hex');
    this.zgoscenaVrednost = crypto
        .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
        .toString('hex');
};

prodajalecShema.methods.preveriGeslo = function(geslo) {
    let zgoscenaVrednost = crypto
        .pbkdf2Sync(geslo, this.nakljucnaVrednost, 1000, 64, 'sha512')
        .toString('hex');
    return this.zgoscenaVrednost === zgoscenaVrednost;
};

//generiranje JWT žetona za avtentikacijo uporabnika ob zahtevah na strežnik preko api
prodajalecShema.methods.generirajJwt = function() {
    const datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        ime: this.ime,
        imeKmetije: this.imeKmetije,
        naslovKmetije: this.naslovKmetije,
        postaKmetije: this.postaKmetije,
        krajKmetije: this.krajKmetije,
        podrocjeProdaje: this.podrocjeProdaje,
        telefon: this.telefon,
        exp: parseInt(datumPoteka.getTime() / 1000, 10)
    }, process.env.JWT_GESLO);
};


mongoose.model('Prodajalec', prodajalecShema, 'Prodajalci');

/**
 * @swagger
 *  components:
 *   examples:
 *    NeNajdemProdajalca:
 *     summary: ne najdem prodajalca
 *     value:
 *      sporočilo: Ne najdem prodajalca.
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
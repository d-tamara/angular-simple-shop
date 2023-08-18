const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *  schemas:
 *   zalogaShema:
 *    type: object
 *    properties:
 *     nazivKmetije:
 *      type: string
 *     cene:
 *      type: string
 *     kolicina:
 *      type: string
 *     required:
 *     - nazivKmetije
 *     - cena
 *     - kolicina
 */

const zalogaShema = new mongoose.Schema({
  nazivKmetije: {type: String, required: true},
  cena: {type: String, required: true},
  kolicina: {type: String, required: true}
});

/**
 * @swagger
 * components:
 *  schemas:
 *   IzdelekBranjePovzetek:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolicni identifikator
 *      example: 5ded18eb51386c3799833191
 *     kategorija:
 *      type: string
 *      example: Pridelek
 *     naziv:
 *      type: string
 *      description: ime izdelka
 *      example: Izdelek
 *     imgSrc:
 *      type: string
 *      description: slika izdelka
 *     zaloga:
 *      type: array
 *      description: seznam kmetij z izbranim izdelkom
 *      example:
 *       - nazivKmetije: Kmetija Rebernik
 *         cena: 1
 *         kolicina: 90
 *       - nazivKmetije: Pri Majdi
 *         cena: 1.4
 *         kolicina: 20
 *     required:
 *      - naziv
 *      - imgSrc
 *   IzdelekBranjePodrobnosti:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolicni identifikator
 *      example: 5ded18eb51386c3799833191
 *     kategorija:
 *      type: string
 *      example: Pridelek
 *     naziv:
 *      type: string
 *      description: ime izdelka
 *      example: Izdelek
 *     imgSrc:
 *      type: string
 *      description: slika izdelka
 *     zaloga:
 *      type: array
 *      description: seznam kmetij z izbranim izdelkom
 *      example:
 *       - nazivKmetije: Kmetija Rebernik
 *         cena: 1
 *         kolicina: 90
 *       - nazivKmetije: Pri Majdi
 *         cena: 1.4
 *         kolicina: 20
 *     required:
 *      - naziv
 *      - imgSrc
 *      - zaloga
 *
 */

const izdelekShema = new mongoose.Schema({
  kategorija: {type: String, required: true},
  naziv: {type: String, required: true},
  imgSrc: {data: Buffer, contentType: String},
  zaloga: [zalogaShema]

});

mongoose.model('Izdelek', izdelekShema, 'Izdelki');
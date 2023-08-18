// index.js
const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');
const avtentikacija = jwt({
     secret: process.env.JWT_GESLO,
     userProperty: 'payload',
     algorithms: ['HS256']
});

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Izdelki
 *    description: Obvladovanje izdelkov
 *  - name: Prodajalec
 *    description: Domača stran prodajalca
 *  - name: Kupec
 *    description: Domača stran kupca
 *  - name: Avtentikacija
 *    description: Obvladovanje uporabnikov
 */

/**
 * Varnostna shema dostopa
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */


// kategorije izdelkov - shema izdelek-novo.js
const ctrlIzdelek = require('../controllers/izdelek');
// zelenjava
/**
 * @swagger
 *  /zelenjava:
 *   get:
 *    summary: Seznam zelenjave
 *    description: Pridobitev **seznama zelenjave**
 *    tags: [Izdelki]
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s seznamom najdenih izdelkov v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/IzdelekBranjePovzetek"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri poizvedbi.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get('/zelenjava', ctrlIzdelek.izdelkiSeznam);


/**
 * @swagger
 *  /zelenjava/{idIzdelka}:
 *   get:
 *    summary: Podrobnosti izbrane zelenjave
 *    description: Prikaze podrobnosti iskane zelenjave iz **seznama zelenjave**
 *    tags: [Izdelki]
 *    parameters:
 *     - in: path
 *       name: idIzdelka
 *       description: enolicni identifikator izdelka
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s seznamom najdenih izdelkov v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/IzdelekBranjePodrobnosti"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri iskanju id izdelka.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get("/zelenjava/:idIzdelka", ctrlIzdelek.izdelkiPreberiIzbrano);
// sadje
/**
 * @swagger
 *  /sadje:
 *   get:
 *    summary: Seznam sadja
 *    description: Pridobitev **seznama sadja**
 *    tags: [Izdelki]
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s seznamom najdenih izdelkov v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/IzdelekBranjePovzetek"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri poizvedbi.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get('/sadje', ctrlIzdelek.izdelkiSeznam);

/**
 * @swagger
 *  /sadje/{idIzdelka}:
 *   get:
 *    summary: Podrobnosti izbranega sadja
 *    description: Prikaze podrobnosti iskanega sadja iz **seznama sadja**
 *    tags: [Izdelki]
 *    parameters:
 *     - in: path
 *       name: idIzdelka
 *       description: enolicni identifikator izdelka
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s seznamom najdenih izdelkov v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/IzdelekBranjePodrobnosti"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri iskanju id izdelka.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get("/sadje/:idIzdelka", ctrlIzdelek.izdelkiPreberiIzbrano);
// pijaca
/**
 * @swagger
 *  /pijaca:
 *   get:
 *    summary: Seznam pijače
 *    description: Pridobitev **seznama pijače**
 *    tags: [Izdelki]
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s seznamom najdenih izdelkov v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/IzdelekBranjePovzetek"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri poizvedbi.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get('/pijaca', ctrlIzdelek.izdelkiSeznam);
/**
 * @swagger
 *  /pijaca/{idIzdelka}:
 *   get:
 *    summary: Podrobnosti izbrane pijače
 *    description: Prikaze podrobnosti iskanega pijače iz **seznama pijače**
 *    tags: [Izdelki]
 *    parameters:
 *     - in: path
 *       name: idIzdelka
 *       description: enolicni identifikator izdelka
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s seznamom najdenih izdelkov v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/IzdelekBranjePodrobnosti"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri iskanju id izdelka.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get("/pijaca/:idIzdelka", ctrlIzdelek.izdelkiPreberiIzbrano);
// ostali pridelki
/**
 * @swagger
 *  /ostalipridelki:
 *   get:
 *    summary: Seznam ostalih pridelkov
 *    description: Pridobitev **seznama ostalih pridelkov**
 *    tags: [Izdelki]
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s seznamom najdenih pridelkov v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/IzdelekBranjePovzetek"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri poizvedbi.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get("/ostalipridelki", ctrlIzdelek.izdelkiSeznam);
/**
 * @swagger
 *  /ostalipridelki/{idIzdelka}:
 *   get:
 *    summary: Podrobnosti izbranega pridelka
 *    description: Prikaze podrobnosti iskanega pridelka iz **seznama ostalih pridelkov**
 *    tags: [Izdelki]
 *    parameters:
 *     - in: path
 *       name: idIzdelka
 *       description: enolicni identifikator izdelka
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s seznamom najdenih izdelkov v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/IzdelekBranjePodrobnosti"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri iskanju id izdelka.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get("/ostalipridelki/:idIzdelka", ctrlIzdelek.izdelkiPreberiIzbrano);


// zaslonska za pregled prodajalca
const ctrlProdajalec = require('../controllers/prodajalecpregled');
// prvotna stran - pregled (ime, priimek, seznam izdelkov + gumbi na vec stvari)
/**
 * @swagger
 *  /prodajalecPregled/{idPodatkov}:
 *   get:
 *    summary: Pregled prodajalčevih podatkov in izdelkov
 *    description: Prikaze podatke prodajalca in njegovih izdelkov.
 *    tags: [Prodajalec]
 *    parameters:
 *     - in: path
 *       name: idPodatkov
 *       description: enolicni identifikator prodajalca
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z podrobnostmi zahtevanega prodajalca v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/ProdajalecHome"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri iskanju id prodajalca.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get('/prodajalecPregled/:idPodatkov', ctrlProdajalec.podatkiPodrobnosti);
// narocila
/**
 * @swagger
 *  /narocila/{idPodatkov}:
 *   get:
 *    summary: Pregled prodajalčevih podatkov in narocil
 *    description: Prikaze podatke prodajalca in njegovih izdelkov ter narocil.
 *    tags: [Prodajalec]
 *    parameters:
 *     - in: path
 *       name: idPodatkov
 *       description: enolicni identifikator prodajalca
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z podrobnostmi zahtevanega prodajalca v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/ProdajalecHome"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri iskanju id prodajalca.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get("/narocila/:idPodatkov", ctrlProdajalec.podatkiPodrobnosti);
// podatki (izpis + urejanje)
/**
 * @swagger
 *  /prodajalecPodatki/{idPodatkov}:
 *   get:
 *    summary: Pregled prodajalčevih podatkov in narocil
 *    description: Prikaze podatke prodajalca in njegovih izdelkov ter narocil.
 *    tags: [Prodajalec]
 *    parameters:
 *     - in: path
 *       name: idPodatkov
 *       description: enolicni identifikator prodajalca
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z podrobnostmi zahtevanega prodajalca v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/ProdajalecHome"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri iskanju id prodajalca.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get("/prodajalecPodatki/:idPodatkov", ctrlProdajalec.podatkiPodrobnosti);
/**
 * @swagger
 *  /prodajalecPodatki/{idPodatkov}:
 *   put:
 *    summary: Posodabljanje prodajalcevih podatkov;
 *    description: Prikaz in posodobitev prodajalcevih podatkov.
 *    tags: [Prodajalec]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Podatki o prodajalcu
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/ProdajalecUrejanjePodatkov"
 *    parameters:
 *     - in: path
 *       name: idPodatkov
 *       description: enolicni identifikator prodajalca
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "201":
 *      description: Uspešno posodobljeni podatki prodajalca, ki se vrnejo v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/ProdajalecHome"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem prodajalca:
 *          $ref: "#/components/examples/NeNajdemProdajalca"
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.put("/prodajalecPodatki/:idPodatkov", ctrlProdajalec.posodobiPodatke);
// put metoda za dodajanje novega izdelka
/**
 * @swagger
 *  /prodajalecNov/{idPodatkov}:
 *   get:
 *    summary: Pregled prodajalcevih podatkov in dodajanje novega izdelka
 *    description: Prikaze podatke prodajalca in njegovih izdelkov ter narocil.
 *    tags: [Prodajalec]
 *    parameters:
 *     - in: path
 *       name: idPodatkov
 *       description: enolicni identifikator prodajalca
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z podrobnostmi zahtevanega prodajalca v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/ProdajalecHome"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri iskanju id prodajalca.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get("/prodajalecNov/:idPodatkov", ctrlProdajalec.podatkiPodrobnosti);
/**
 * @swagger
 *  /prodajalecNov/{idPodatkov}:
 *   post:
 *    summary: Dodajanje posameznega izdelka v ponudbo
 *    description: Dodajanje **novega izdelka v ponudbo izdelkov**.
 *    tags: [Prodajalec]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idPodatkov
 *       description: enolični identifikator podatkov
 *       schema:
 *        type: string
 *       required: true
 *    requestBody:
 *     description: Podatki o izdelku
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/IzdelekDodaj"
 *    responses:
 *     "201":
 *      description: Uspešno dodan izdelek, ki se vrne v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/IzdelekBranje"
 *     "400":
 *      description: Napaka pri shranjevanju izdelka.
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve, zahtevanega prodajalca ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem podatkov:
 *          $ref: "#/components/examples/NeNajdemProdajalca"
 *     "500":
 *      description: Napaka pri iskanju prodajalca.
 */
router.post("/prodajalecNov/:idPodatkov", ctrlProdajalec.izdelkiKreiraj);
// urejanje in prikaz izbranega izdelka prodajalca
/**
 * @swagger
 *  /prodajalecUredi/{idPodatkov}/{idIzdelka}:
 *   get:
 *    summary: Branje posameznega izdelka v ponudbi
 *    description: Branje **izbranega izdelka iz ponudbe izdelkov**.
 *    tags: [Prodajalec]
 *    parameters:
 *     - in: path
 *       name: idPodatkov
 *       description: enolični identifikator podatkov
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idIzdelka
 *       description: enolični identifikator  izdelka
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Uspesna zahteva s podrobnostmi izdelka v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/IzdelekProdajalec"
 *     "404":
 *      description: Napaka zahteve, zahtevanega izdelka ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem podatkov:
 *          $ref: "#/components/examples/NeNajdemProdajalca"
 *         ne najdem izdelka:
 *          $ref: "#/components/examples/NeNajdemIzdelka"
 *     "500":
 *      description: Napaka pri iskanju nakupa oz. urejanju izdelka.
 */
router.get("/prodajalecUredi/:idPodatkov/:idIzdelka", ctrlProdajalec.izdelekPreberiIzbranega);
/**
 * @swagger
 *  /prodajalecUredi/{idPodatkov}/{idIzdelka}:
 *   put:
 *    summary: Urejanje posameznega izdelka v ponudbi
 *    description: Urejanje **izbranega izdelka iz ponudbe izdelkov**.
 *    tags: [Prodajalec]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idPodatkov
 *       description: enolični identifikator podatkov
 *       schema:
 *        type: string
 *        example: 5ded18eb51386c3799833191
 *       required: true
 *     - in: path
 *       name: idIzdelka
 *       description: enolični identifikator  izdelka
 *       schema:
 *        type: string
 *        example: 5ded18eb51386c3799833191
 *       required: true
 *    requestBody:
 *     description: Podatki o izdelku
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/IzdelekUrejanje"
 *    responses:
 *     "200":
 *      description: Uspešno spremenjen izdelek, ki se vrne podatkih prodajalca v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ProdajalecHome"
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve, zahtevanega izdelka ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem podatkov:
 *          $ref: "#/components/examples/NeNajdemProdajalca"
 *         ne najdem izdelka:
 *          $ref: "#/components/examples/NeNajdemIzdelka"
 *     "500":
 *      description: Napaka pri iskanju nakupa oz. urejanju izdelka.
 */
router.put("/prodajalecUredi/:idPodatkov/:idIzdelka", ctrlProdajalec.izdelekPosodobiIzbranega);

/**
 * @swagger
 *  /prodajalecPodatki/{idPodatkov}/{idIzdelka}:
 *   delete:
 *    summary: Brisanje izbranega izdelka iz ponudbe
 *    description: Brisanje **izbranega izdelka iz ponudbe izdelkov**.
 *    tags: [Prodajalec]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idPodatkov
 *       description: enolični identifikator podatkov
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idIzdelka
 *       description: enolični identifikator  izdelka
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Uspešno izbrisan izdelek iz ponudbe.
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve, zahtevanega izdelka ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem podatkov:
 *          $ref: "#/components/examples/NeNajdemProdajalca"
 *         ne najdem izdelka:
 *          $ref: "#/components/examples/NeNajdemIzdelka"
 *     "500":
 *      description: Napaka pri iskanju nakupa oz. brisanju izdelka.
 */
router.delete("/prodajalecPodatki/:idPodatkov/:idIzdelka", ctrlProdajalec.prodajalecIzbrisiIzdelek);


// nakup + zabojcek

const ctrlNakup = require('../controllers/nakup');
const ctrlZabojcek = require('../controllers/zabojcek');
/**
 * @swagger
 *  /zabojcek/{idNakupa}:
 *   get:
 *    summary: Pregled kupcevih podatkov in izdelkov v zabojcku
 *    description: Prikaze podatke kupca in njegovih izdelkov v zabojcku
 *    tags: [Kupec]
 *    parameters:
 *     - in: path
 *       name: idNakupa
 *       description: enolicni identifikator kupca
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z podrobnostmi zahtevanega kupca v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/KupecPodatki"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri iskanju id prodajalca.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get("/zabojcek/:idNakupa", ctrlNakup.zabojcekSeznam);
/**
 * @swagger
 *  /nakup/{idNakupa}:
 *   get:
 *    summary: Pregled kupcevih podatkov in izdelkov v zabojcku
 *    description: Prikaze podatke kupca in njegovih izdelkov v zabojcku
 *    tags: [Kupec]
 *    parameters:
 *     - in: path
 *       name: idNakupa
 *       description: enolicni identifikator kupca
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Uspešna zahteva z podrobnostmi zahtevanega kupca v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/KupecPodatki"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri iskanju id prodajalca.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get("/nakup/:idNakupa", ctrlNakup.zabojcekSeznam);
/**
 * @swagger
 *  /zabojcek/{idNakupa}:
 *   post:
 *    summary: Dodajanje posameznega izdelka v zabojcek.
 *    description: Dodajanje **novega izdelka v zabojcek z  izdelki**.
 *    tags: [Kupec]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idNakupa
 *       description: enolični identifikator podatkov
 *       schema:
 *        type: string
 *       required: true
 *    requestBody:
 *     description: Podatki o dodanem izdelku
 *     required: true
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/IzdelekKDodaj"
 *    responses:
 *     "201":
 *      description: Uspešno dodan izdelek, ki se vrne v rezultatu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/IzdelekKBranje"
 *     "400":
 *      description: Napaka pri shranjevanju izdelka.
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve, zahtevanega kupca ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem podatkov:
 *          $ref: "#/components/examples/NeNajdemNakupa"
 *     "500":
 *      description: Napaka pri iskanju kupca.
 */
router.post("/zabojcek/:idNakupa", ctrlZabojcek.dodajVZabojcek);

/**
 * @swagger
 *  /zabojcek/{idNakupa}/{idDodanegaIzdelka}:
 *   delete:
 *    summary: Brisanje izbranega izdelka iz zabojcka
 *    description: Brisanje **izbranega izdelka iz zabojcka**.
 *    tags: [Kupec]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: idNakupa
 *       description: enolični identifikator nakupa
 *       schema:
 *        type: string
 *       required: true
 *     - in: path
 *       name: idDodanegaIzdelka
 *       description: enolični identifikator dodanega izdelka
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "204":
 *      description: Uspešno izbrisan izdelek iz zabojčka.
 *     "401":
 *      description: Napaka pri dostopu.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NiZetona"
 *     "404":
 *      description: Napaka zahteve, zahtevanega nakuoa oz. izdelka ni mogoče najti.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        examples:
 *         ne najdem nakupa:
 *          $ref: "#/components/examples/NeNajdemNakupa"
 *         ne najdem izdelka:
 *          $ref: "#/components/examples/NeNajdemIzdelka"
 *     "500":
 *      description: Napaka pri iskanju nakupa oz. brisanju izdelka.
 */
router.delete("/zabojcek/:idNakupa/:idDodanegaIzdelka", ctrlZabojcek.zabojcekIzbrisiIzdelek);

//AVTENTIKACJA
var ctrlAvtentikacija = require('../controllers/avtentikacija');

// REGISTRACIJE KONTROLERJI

//KUPEC
const ctrlRegistracijaKupec = require('../controllers/registracijakupec');
const ctrlPrijavaKupec = require('../controllers/prijavakupec');

/**
 * @swagger
 *   /registracijaKupec:
 *     post:
 *       summary: Registracija novega kupca
 *       description: Registracija **novega kupca**.
 *       tags: [Avtentikacija]
 *       requestBody:
 *         description: Podatki za registracijo **kupca**.
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/KupecRegistracija"
 *       responses:
 *         "200":
 *           description: Uspešna registracija uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri registraciji so obvezni ime, elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *             example:
 *               sporočilo: Zahtevani so vsi podatki.
 *         "500":
 *           description: Napaka na strežniku pri registraciji uporabnika.
 */

// router.get('/registracijaKupec', ctrlRegistracijaKupec.RegistracijaKupecSeznam);
// router.get('/prijavaKupca', ctrlPrijavaKupec.prijavaKupecSeznam);


router.post('/registracijaKupec', ctrlAvtentikacija.registracijaKupca);

/**
 * @swagger
 *   /prijavaKupec:
 *     post:
 *       summary: Prijava obstoječega kupca
 *       description: Prijava **obstoječega kupca** z elektronskim naslovom in geslom.
 *       tags: [Avtentikacija]
 *       requestBody:
 *         description: Prijavni podatki
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/KupecPrijava"
 *       responses:
 *         "200":
 *           description: Uspešna prijava uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri prijavi sta obvezna elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               example:
 *                 sporočilo: Zahtevani so vsi podatki.
 *         "401":
 *           description: Napaka pri prijavi uporabnika.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               examples:
 *                 uporabniško ime:
 *                   value:
 *                     sporočilo: Napačno uporabniško ime.
 *                   summary: napačno uporabniško ime
 *                 geslo:
 *                   value:
 *                     sporočilo: Napačno geslo.
 *                   summary: napačno geslo
 *         "500":
 *           description: Napaka na strežniku pri preverjanju uporabnika.
 */
router.post('/prijavaKupec', ctrlAvtentikacija.prijavaKupca);

/**
 * @swagger
 *   /registracijaProdajalec:
 *     post:
 *       summary: Registracija novega prodajalca
 *       description: Registracija **novega prodajalca**.
 *       tags: [Avtentikacija]
 *       requestBody:
 *         description: Podatki za registracijo **prodajalca**.
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/ProdajalecRegistracija"
 *       responses:
 *         "200":
 *           description: Uspešna registracija uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri registraciji sta obvezna elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *             example:
 *               sporočilo: Zahtevani so vsi podatki.
 *         "500":
 *           description: Napaka na strežniku pri registraciji uporabnika.
 */

//PRODAJALEC
const ctrlRegistracijaProdajalec = require('../controllers/registracijaprodajalec');
router.post('/registracijaProdajalec', ctrlAvtentikacija.registracijaProdajalca);
router.post('/prijavaProdajalec', ctrlAvtentikacija.prijavaProdajalca);

/**
 * @swagger
 *   /prijavaProdajalec:
 *     post:
 *       summary: Prijava obstoječega prodajalca
 *       description: Prijava **obstoječega prodajalca** z elektronskim naslovom in geslom.
 *       tags: [Avtentikacija]
 *       requestBody:
 *         description: Prijavni podatki
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/ProdajalecPrijava"
 *       responses:
 *         "200":
 *           description: Uspešna prijava uporabnika z JWT žetonom v rezultatu.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AvtentikacijaOdgovor"
 *         "400":
 *           description: Napaka zahteve, pri prijavi sta obvezna elektronski naslov in geslo.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               example:
 *                 sporočilo: Zahtevani so vsi podatki.
 *         "401":
 *           description: Napaka pri prijavi uporabnika.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Napaka"
 *               examples:
 *                 uporabniško ime:
 *                   value:
 *                     sporočilo: Napačno uporabniško ime.
 *                   summary: napačno uporabniško ime
 *                 geslo:
 *                   value:
 *                     sporočilo: Napačno geslo.
 *                   summary: napačno geslo
 *         "500":
 *           description: Napaka na strežniku pri preverjanju uporabnika.
 */
// router.post('/prijavaProdajalec', ctrlAvtentikacija.prijavaProdajalca);
// router.get('/registracijaProdajalec', ctrlRegistracijaProdajalec.RegistracijaProdajalecSeznam);

// seznam kmetij na /kategorije
/**
 * @swagger
 *  /kategorije:
 *   get:
 *    summary: Seznam prodajalcev
 *    description: Prikaze seznam kmetij registriranih prodajalcev in njihovo podrocje prodaje ter kraj.
 *    tags: [Izdelki]
 *    responses:
 *     "200":
 *      description: Uspešna zahteva s seznamom prodajalcev.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/ProdajalecHome"
 *     "404":
 *      description: Napaka pri poizvedbi.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Napaka"
 *        example:
 *         sporočilo: Napaka pri iskanju id prodajalca.
 *     "500":
 *      description: Napaka na strežniku pri dostopu do podatkovne baze.
 */
router.get('/kategorije', ctrlRegistracijaProdajalec.RegistracijaProdajalecSeznam);

var ctrlBaza = require('../controllers/baza');

// Dodajanje in brisanje vsebine podatkovne baze
router.route("/db")
    .post(ctrlBaza.dodajZacetnoVsebino)
    .delete(ctrlBaza.izbrisiVsebino);


module.exports = router;
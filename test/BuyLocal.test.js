/**
 * Funkcionalni testi
 */


(async function BuyLocal() {
    // Knjižnice
    const { exec } = require("child_process");
    const { describe, it, after, before } = require("mocha");
    const { Builder, By, until } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");
    const expect = require("chai").expect;

    // Parametri
    let aplikacijaUrl = "https://buylocal-heroku.herokuapp.com/";
    let seleniumStreznikUrl = "http://localhost:4445/wd/hub";
    let brskalnik, jwtZeton;

    const axios = require('axios').create({
        baseURL: aplikacijaUrl + "api/",
        timeout: 5000
    });

    // Obvladovanje napak
    process.on("unhandledRejection", (napaka) => {
        console.log(napaka);
    });

    // Počakaj določeno število sekund na zahtevani element na strani
    let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
        await brskalnik.wait(() => {
            return brskalnik.findElements(By.xpath(xpath)).then(elementi => {
                return elementi[0];
            });
        }, casVS * 1000, `Stran se ni naložila v ${casVS} s.`);
    };

    try {

        before(() => {
            brskalnik = new Builder()
                .forBrowser("chrome")
                .setChromeOptions(new chrome.Options()
                    .addArguments("start-maximized")
                    .addArguments("disable-infobars")
                    .addArguments("allow-insecure-localhost")
                    .addArguments("allow-running-insecure-content")
                )
                .usingServer(seleniumStreznikUrl)
                .build();
        });

        //test funkcionalnosti

        describe("Domača stran", function() {
            this.timeout(30 * 1000);
            // Pred začetkom testa funkcionalnosti shranimo URL naslov aplikacije
            before(() => { brskalnik.get(aplikacijaUrl); });

            it("Število naslovov na začetni strani", async () => {
                await pocakajStranNalozena(brskalnik, 10, "//h1");
                let zacetnaStran = await brskalnik.findElements(By.xpath("//h1"));
                expect(zacetnaStran).to.be.an("array").to.have.lengthOf(2);
            });

        });


        describe("Kategorije", function() {
            this.timeout(30 * 1000);
            // Pred začetkom testa funkcionalnosti shranimo URL naslov aplikacije
            before(() => { brskalnik.get(aplikacijaUrl); });

            it("Izberi stran z kategorijami", async function() {
                await pocakajStranNalozena(brskalnik, 10, "//h1");
                let povezava = await brskalnik.findElement(
                    By.xpath("//a[contains(text(), 'Nakupuj')]"));
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });

            context("Ustreznost podatkov na strani kategorij", function() {
                it("Stevilo kategorij", async function() {
                    let kategorije = await brskalnik.findElements(
                        By.xpath("//div/div/div/h5"));
                    expect(kategorije).to.be.an("array").to.have.lengthOf(5);
                });

                it("Besedilo vsebine", async function() {
                    let besedilo = await brskalnik.findElement(By.css("h4"));
                    expect(besedilo).to.not.be.empty;
                    expect(await besedilo.getText()).to.have.string(
                        "Sodelujoče kmetije"
                    );
                });

            });

        });

        describe("Podrobnosti kategorije", function() {
            this.timeout(30 * 1000);
            // Pred začetkom testa funkcionalnosti shranimo URL naslov aplikacije
            before(() => { brskalnik.get(aplikacijaUrl); });


            it("Izberi kategorijo zelenjave", async function() {
                await pocakajStranNalozena(brskalnik, 10, "//h1");
                let povezava = await brskalnik.findElement(
                    By.xpath("//div/div/div/a[1]"));
                console.log(povezava)
                expect(povezava).to.not.be.empty;
                await povezava.click();
            });

            context("Ustreznost podatkov na strani kategorije zelenjave", function() {

                it("Breadcrumbs check -> Domov / Kategorije / Zelenjava", async function() {
                    let besedilo = await brskalnik.findElements(By.css("nav"));
                    expect(besedilo).to.not.be.empty;
                    expect(await besedilo[1].getText()).to.have.string(
                        "Zelenjava"
                    );
                });

            });

        });


        // describe("Podrobnosti izdelka", function() {
        //     this.timeout(30 * 1000);
        //     // Pred začetkom testa funkcionalnosti shranimo URL naslov aplikacije
        //     before(() => { brskalnik.get(aplikacijaUrl); });
        //
        //
        //     it("Izberi prvi izdelek v kategoriji zelenjave", async function() {
        //         await pocakajStranNalozena(brskalnik, 10, "//h1");
        //         let povezava = await brskalnik.findElements(
        //             By.xpath("//a[contains(text(), 'O izdelku')]"));
        //         console.log(povezava)
        //         expect(povezava[0]).to.not.be.empty;
        //         await povezava.click();
        //     });
        //
        //     context("Ustreznost podatkov na podrobnostih", function() {
        //
        //         it("Breadcrumbs check -> Domov / Kategorije / Zelenjava", async function() {
        //             let besedilo = await brskalnik.findElements(By.css("nav"));
        //             expect(besedilo).to.not.be.empty;
        //             expect(await besedilo[1].getText()).to.have.string(
        //                 "Zelenjava"
        //             );
        //         });
        //
        //     });
        //
        //
        // });

        describe("Registracija novega uporabnika", function() {
            this.timeout(30 * 1000);
            before(async function() { await brskalnik.get(aplikacijaUrl); });

            // it("izbriši uporabnika iz podatkovne baze", async function() {
            //     let dockerAtlasBrisiUporabnika =
            //         "docker exec -i sp-edugeocache-mongodb bash -c " + "\"mongo " +
            //         "\\\"mongodb+srv://edugeocache-qfwjv.mongodb.net/EduGeoCache\\\" " +
            //         "--username app --password secure-access --eval " +
            //         "'db.Uporabniki.remove({elektronskiNaslov: \\\"janez@kranjski.net\\\"})'" + "\"";
            //     exec(dockerAtlasBrisiUporabnika).on("close", (koda) => {
            //         expect(koda).to.be.equal(0);
            //     });
            // });

            // it("prijava uporabnika", async function() {
            //     let povezava = await brskalnik.findElement(
            //         By.xpath("//a[contains(text(), 'Prodajaj')]"));
            //     expect(povezava).to.not.be.empty;
            //     await povezava.click();
            // });

            // it("izbira registracije", async function() {
            //     await pocakajStranNalozena(brskalnik, 10,
            //         "//button[contains(text(), 'Prijavi')]");
            //     let povezava = await brskalnik.findElement(
            //         By.xpath("//a[contains(text(), 'registrirajte')]"));
            //     expect(povezava).to.not.be.empty;
            //     await povezava.click();
            // });

            // it("vnos podatkov uporabnika", async function() {
            //     await pocakajStranNalozena(brskalnik, 10,
            //         "//button[contains(text(), 'Registriraj')]");
            //     let ime = await brskalnik.findElement(By.css("input[name='ime']"));
            //     expect(ime).to.not.be.empty;
            //     ime.sendKeys("Janez Kranjski");
            //     let email = await brskalnik.findElement(
            //         By.css("input[name='elektronskiNaslov']"));
            //     expect(email).to.not.be.empty;
            //     email.sendKeys("janez@kranjski.net");
            //     let geslo = await brskalnik.findElement(By.css("input[name='geslo']"));
            //     expect(geslo).to.not.be.empty;
            //     geslo.sendKeys("test");
            //     brskalnik.findElement(
            //         By.xpath("//button[contains(text(), 'Registriraj')]")).click();
            // });

            // it("preveri ali je uporabnik prijavljen", async function() {
            //     await pocakajStranNalozena(brskalnik, 10, "//h4");
            //     let uporabnik = await brskalnik.findElement(
            //         By.xpath("//a[contains(text(), 'Janez Kranjski')]"));
            //     expect(uporabnik).to.not.be.empty;
            // });

            // it("pridobi JWT žeton", async function() {
            //     jwtZeton = await brskalnik.executeScript(function() {
            //         return localStorage.getItem("buylocal-zeton");
            //     });
            //     expect(jwtZeton).to.not.be.empty;
            // });

        });


        after(async () => {
            brskalnik.quit();
        });

    } catch (napaka) {
        console.log("Med testom je prišlo do napake!");
    }
})();


import { Component, OnInit } from '@angular/core';
import { ProdajalecPodatkiService } from "../../storitve/prodajalec-podatki.service";

import { switchMap } from "rxjs/operators";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Izdelek } from "../../razredi/prodajalec";
import { Prodajalec } from "../../razredi/prodajalec";
import { AvtentikacijaService } from "../../storitve/avtentikacija.service";

@Component({
  selector: 'app-prodajalec-home',
  templateUrl: './prodajalec-home.component.html',
  styleUrls: ['./prodajalec-home.component.css']
})
export class ProdajalecHomeComponent implements OnInit {

  constructor(private prodajalecPodatkiService: ProdajalecPodatkiService,
              private avtentikacijaStoritev: AvtentikacijaService,
              private pot: ActivatedRoute) { }


  /*private pridobiProdajalca() : void {
    this.prodajalecPodatkiService.pridobiProdajalca().then(najdenProdajalec => this.prodajalec = najdenProdajalec);
  }*/

  public jePrijavljen(): boolean {
    // console.log("preverjam");
    return this.avtentikacijaStoritev.jePrijavljen();
  }

  // public vrniPodatkeIzdelkov(): string {
  //   const podatki = this.avtentikacijaStoritev.vrniPodatkeIzdelkov();
  //   return podatki ? podatki.priimek : 'Gost';
  // }

  public vrniPodatkeProdajalca(): string {
    const podatki = this.avtentikacijaStoritev.vrniPodatkeUporabnikaP();
    return podatki ? podatki.imeKmetije : 'Gost';
  }

  public vrniIdProdajalca(): string {
    const podatki = this.avtentikacijaStoritev.vrniPodatkeUporabnikaP();
    return podatki ? podatki._id : 'Gost';
  }

  prodajalec: Prodajalec;
  izdelek: Izdelek;
  sporociloObrazca: NoviIzdelki;

  // public izbrisiIzdelek(): void {
  //   this.prodajalecPodatkiService.izbrisiIzdelek(this.prodajalec._id, this.izdelek._id)
  //     // .then(rezultat => this.sporociloObrazca = rezultat).catch(rezultat => this.sporociloObrazca = rezultat);
  // }

  ngOnInit(): void {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idProdajalca = this.vrniIdProdajalca()
          // let idIzdelka = params.get('idIzdelka');
          console.log(idProdajalca);
          if (idProdajalca != undefined) {
            console.log(idProdajalca);
          } else {
            console.log("Ne najdem");
          }
          // console.log(this.prodajalecPodatkiService.pridobiProdajalca(idProdajalca));
      //    prazen objekt
      return this.prodajalecPodatkiService.pridobiProdajalca(idProdajalca);
        }))
      .subscribe((prodajalec: Prodajalec) => {
      this.prodajalec = prodajalec;

      // this.kmetija = this.prodajalec;
      // this.kmetija._id = this.prodajalec._id;
      // this.kmetija.ime = this.prodajalec.ime;
      // this.kmetija.priimek = this.prodajalec.priimek;
      // this.kmetija.imeKmetije = this.prodajalec.imeKmetije;
      // this.kmetija.naslovKmetije = this.prodajalec.naslovKmetije;
      // this.kmetija.postaKmetije = this.prodajalec.postaKmetije;
      // this.kmetija.krajKmetije = this.prodajalec.krajKmetije;
      // this.kmetija.podrocjeProdaje = this.prodajalec.podrocjeProdaje;
      // this.kmetija.email = this.prodajalec.email;
      // this.kmetija.geslo = this.prodajalec.geslo;
      // this.kmetija.telefon = this.prodajalec.telefon;
      // this.kmetija.izdelki = this.prodajalec.izdelki;
      //
      // this.kmetija.narocila = this.prodajalec.narocila;
    });
  }

  // prodajalec: Prodajalec = {
  public kmetija = {
    _id: "",
    ime: "",
    priimek: "",
    imeKmetije: "",
    naslovKmetije: "",
    postaKmetije: "",
    krajKmetije: "",
    podrocjeProdaje: "",
    email: "",
    geslo: "",
    telefon: "",
    izdelki: [{
      // _id: "",
      kategorija: "",
      ime: "",
      cena: "",
      kolicina: ""
    }],
    narocila: [{
      // _id: "",
      cena: "",
      status: "",
      seznamIzdelkov: [""]
    }]
  }

  /*izdelki: Izdelek[] = [{
    slika: "/assets/images/005-onion.png",
    ime: "Čebula",
    cena: "1 eur/kg",
    kolicina: 13
  }, {
    slika: "/assets/images/001-tomato.png",
    ime: "Paradižnik",
    cena: "1 eur/kg",
    kolicina: 20
  }]*/
}

/*export class Prodajalec {
  _id: string;
  ime: string;
  priimek: string;
  imeKmetije: string;
  naslovKmetije: string;
  postaKmetije: string;
  krajKmetije: string;
  podrocjeProdaje: string;
  email: string;
  geslo: string;
  telefon: string;
  izdelki: [{
    kategorija: string;
    ime: string;
    cena: string;
    kolicina: string;
  }]
  narocila: [{
    cena: string;
    status: string;
    seznamIzdelkov: [string];
  }]
}*/

// export class Izdelek {
//   _id: string;
//   kategorija: string;
//   ime: string;
//   cena: string
//   kolicina: number;
// }

export class NoviIzdelki {
  sporočilo: string;
}


import { Component, OnInit } from '@angular/core';
import { ProdajalecPodatkiService } from "../../storitve/prodajalec-podatki.service";
import { Prodajalec } from "../../razredi/prodajalec";
import { ActivatedRoute, ParamMap } from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-prodajalec-orders',
  templateUrl: './prodajalec-orders.component.html',
  styleUrls: ['./prodajalec-orders.component.css']
})
export class ProdajalecOrdersComponent implements OnInit {

  constructor(private prodajalecPodatkiService: ProdajalecPodatkiService,
              private pot: ActivatedRoute) { }

  prodajalec: Prodajalec;

  ngOnInit(): void {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idProdajalca = params.get('idProdajalca');

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
        this.kmetija._id = prodajalec._id;
        this.kmetija.ime = prodajalec.ime;
        this.kmetija.priimek = prodajalec.priimek;
        this.kmetija.imeKmetije = prodajalec.imeKmetije;
        this.kmetija.naslovKmetije = prodajalec.naslovKmetije;
        this.kmetija.postaKmetije = prodajalec.postaKmetije;
        this.kmetija.krajKmetije = prodajalec.krajKmetije;
        this.kmetija.podrocjeProdaje = prodajalec.podrocjeProdaje;
        this.kmetija.email = prodajalec.email;
        this.kmetija.geslo = prodajalec.geslo;
        this.kmetija.telefon = prodajalec.telefon;
        this.kmetija.izdelki = prodajalec.izdelki;

        this.kmetija.narocila = prodajalec.narocila;


        // this.kmetija.narocila.cena = prodajalec.narocila.cena;

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

}

export class ForLoop {
  fakeArray = new Array(10);
}

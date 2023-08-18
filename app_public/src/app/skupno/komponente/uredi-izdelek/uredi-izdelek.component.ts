import { Component, OnInit } from '@angular/core';
import { ProdajalecPodatkiService } from "../../storitve/prodajalec-podatki.service";

import { switchMap } from "rxjs/operators";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

// import { Prodajalec } from "../registracija-prodajalca/registracija-prodajalca.component";
// import { Izdelek } from "../registracija-prodajalca/registracija-prodajalca.component";
import {IzdelekPodatkiService} from "../../storitve/izdelek-podatki.service";
import { Prodajalec } from "../../razredi/prodajalec"
import { Izdelek } from "../../razredi/prodajalec";

@Component({
  selector: 'app-uredi-izdelek',
  templateUrl: './uredi-izdelek.component.html',
  styleUrls: ['./uredi-izdelek.component.css']
})



export class UrediIzdelekComponent implements OnInit {

  constructor(private izdelekPodatkiService: IzdelekPodatkiService,
              private prodajalecPodatkiService: ProdajalecPodatkiService,
              private router : Router,
              private pot: ActivatedRoute) { }

  public izbrisiIzdelek: Izdelek
  public prodajalec: Prodajalec


  public urediPodatke = {
    _id: '',
    kategorija: '',
    ime: '',
    cena: '',
    kolicina: '',
  }

  // public izbrisiIzdelekizBaze(): void {
  //   this.izdelekPodatkiService.izbrisiIzdelek(this.prodajalec._id, this.izdelek._id)
  //   // .then(rezultat => this.sporociloObrazca = rezultat).catch(rezultat => this.sporociloObrazca = rezultat);
  // }

  // public urediIzbraniIzdelek(): void {
  //   // console.log("id::",this.prodajalec._id);
  //     this.izdelekPodatkiService
  //       .urediIzdelek(this.izdelek.idProdajalca, this.izdelek._id, this.urediPodatke)
  //       .then(izdelek => {
  //         console.log("Izdelek posodobljen", izdelek);
  //       })
  // }

  private soPodatkiUstrezni(): boolean {
    if (this.urediPodatke.ime && this.urediPodatke.kategorija && this.urediPodatke.cena
      && this.urediPodatke.kolicina) {
      return true;
    } else {
      return false;
    }
  }

  public obrazecNapaka: string;

  // public urediIzbraniIzdelek(): void {
  //   // console.log("id::",this.prodajalec._id);
  //   this.obrazecNapaka = "";
  //   if(this.soPodatkiUstrezni()) {
  //     this.prodajalecPodatkiService
  //       .urediIzdelek(this.prodajalec._id, this.izdelek._id, this.urediPodatke)
  //       .then(prodajalec => {
  //         console.log("Prodajalec posodobljen", prodajalec);
  //         this.router.navigate(['/prodajalecHome/' + this.prodajalec._id]);
  //       })
  //   } else {
  //     this.obrazecNapaka = "Zahtevani so vsi podatki, prosim poskusite ponovno!";
  //   }
  //
  // }

  ngOnInit(): void {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idProdajalca = params.get('idProdajalca');
          let idIzdelka = params.get('idIzdelka');

          if (idProdajalca != undefined) {
            console.log("To je id", idProdajalca);
          } else {
            console.log("Ne najdem");
          }
          // console.log(this.prodajalecPodatkiService.pridobiProdajalca(idProdajalca));
          //    prazen objekt
          return this.prodajalecPodatkiService.pridobiProdajalca(idProdajalca);
        }))
      .subscribe((prodajalec : Prodajalec) => {
        this.prodajalec = prodajalec;
        // this.kmetija._id = prodajalec._id;
        // this.kmetija.ime = prodajalec.ime;
        // this.kmetija.priimek = prodajalec.priimek;
        // this.kmetija.imeKmetije = prodajalec.imeKmetije;
        // this.kmetija.naslovKmetije = prodajalec.naslovKmetije;
        // this.kmetija.postaKmetije = prodajalec.postaKmetije;
        // this.kmetija.krajKmetije = prodajalec.krajKmetije;
        // this.kmetija.podrocjeProdaje = prodajalec.podrocjeProdaje;
        // this.kmetija.email = prodajalec.email;
        // this.kmetija.geslo = prodajalec.geslo;
        // this.kmetija.telefon = prodajalec.telefon;
        // this.kmetija.izdelki = prodajalec.izdelki;
        //
        // this.kmetija.narocila = prodajalec.narocila;
      });
    // this.pot.paramMap
    //   .pipe(
    //     switchMap((params: ParamMap) => {
    //       let idProdajalca = params.get('idProdajalca');
    //       let idIzdelka = params.get('idIzdelka');
    //       // console.log(idProdajalca,"+", idIzdelka);
    //       // console.log(this.izdelekPodatkiService.pridobiIzdelek(idProdajalca, idIzdelka));
    //       return this.izdelekPodatkiService.pridobiIzdelek(idProdajalca, idIzdelka);
    //     })
    //   )
    // zakomentiran ker mi izdelek rdeče podčrta
    //   .subscribe((izdelek: Izdelek) => {
    //     this.izdelek = izdelek;
    //     this.izdelek._id = izdelek._id;
    //     this.izdelek.kategorija = izdelek.kategorija;
    //     this.izdelek.cena = izdelek.cena;
    //     this.izdelek.kolicina = izdelek.kolicina;
    //   });
  }

  public izdelek = {
    // _id: "",
    kategorija: "",
    ime: "",
    cena: "",
    kolicina: ""
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

// export class Izdelek {
//   // _id: string;
//   kategorija: string;
//   ime: string;
//   cena: string;
//   kolicina: string;
// };



import { Component, OnInit } from '@angular/core';
import { Prodajalec } from "../../razredi/prodajalec";
import { ProdajalecPodatkiService } from "../../storitve/prodajalec-podatki.service";
import { switchMap } from "rxjs/operators";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: 'app-podatki-kmetije',
  templateUrl: './podatki-kmetije.component.html',
  styleUrls: ['./podatki-kmetije.component.css']
})
export class PodatkiKmetijeComponent implements OnInit {

  constructor(private prodajalecPodatkiService: ProdajalecPodatkiService,
              private pot: ActivatedRoute,
              private router : Router) { }

  public prodajalec : Prodajalec

  public urediPodatke = {
    _id: '',
    ime: '',
    priimek: '',
    imeKmetije: '',
    naslovKmetije: '',
    postaKmetije: '',
    krajKmetije: '',
    podrocjeProdaje: '',
    email: '',
    geslo: '',
    telefon: '',
    izdelki: [],
    narocila: []
  }

  private soPodatkiUstrezni(): boolean {
    if (this.urediPodatke.ime && this.urediPodatke.priimek && this.urediPodatke.imeKmetije
      && this.urediPodatke.naslovKmetije && this.urediPodatke.krajKmetije && this.urediPodatke.postaKmetije
      && this.urediPodatke.telefon && this.urediPodatke.email) {
      return true;
    } else {
      return false;
    }
  }

  public obrazecNapaka: string;

  public urediIzbranoKmetijo(): void {
    // console.log("id::",this.prodajalec._id);
    this.obrazecNapaka = "";
    if(this.soPodatkiUstrezni()) {
      this.prodajalecPodatkiService
        .urediPodatke(this.prodajalec._id, this.urediPodatke)
        .then(prodajalec => {
          console.log("Prodajalec posodobljen", prodajalec);
          this.router.navigate(['/prodajalecHome/' + this.prodajalec._id]);
        })
    } else {
      this.obrazecNapaka = "Zahtevani so vsi podatki, prosim poskusite ponovno!";
    }

  }

  ngOnInit(): void {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idProdajalca = params.get('idProdajalca');

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
  }

  // prodajalec: Prodajalec = {
  // public kmetija = {
  //   _id: "",
  //   ime: "",
  //   priimek: "",
  //   imeKmetije: "",
  //   naslovKmetije: "",
  //   postaKmetije: "",
  //   krajKmetije: "",
  //   podrocjeProdaje: "",
  //   email: "",
  //   geslo: "",
  //   telefon: "",
  //   izdelki: [{
  //     kategorija: "",
  //     ime: "",
  //     cena: "",
  //     kolicina: ""
  //   }],
  //   narocila: [{
  //     cena: "",
  //     status: "",
  //     seznamIzdelkov: [""]
  //   }]
  // }
}

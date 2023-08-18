import { Component, OnInit } from '@angular/core';
import { Kupec} from "../../razredi/kupec1";
import { KupecPodatkiService } from "../../storitve/kupec-podatki.service";
import { switchMap } from "rxjs/operators";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AvtentikacijaService} from "../../storitve/avtentikacija.service";


@Component({
  selector: 'app-zabojcek',
  templateUrl: './zabojcek.component.html',
  styleUrls: ['./zabojcek.component.css']
})
export class ZabojcekComponent implements OnInit {

  constructor(private kupecPodatkiService:  KupecPodatkiService,
              private avtentikacijaStoritev: AvtentikacijaService,
              private pot: ActivatedRoute) { }

  kupec: Kupec;

  public vrniPodatkeKupca(): string {
    const podatki = this.avtentikacijaStoritev.vrniPodatkeUporabnika();
    this.vrniZabojcekKupca();
    return podatki ? podatki.ime : 'Gost';
  }
  public vrniZabojcekKupca(): any {
    const podatki = this.avtentikacijaStoritev.vrniPodatkeUporabnika();
    return podatki ? podatki.zabojcek : 'Za nakupovanje se je potrebno prijaviti';
  }

  public jePrijavljen(): boolean {
    // console.log("preverjam");
    return this.avtentikacijaStoritev.jePrijavljen();
  }

  ngOnInit(): void {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idKupca = params.get('idKupca');

          if (idKupca != undefined) {
            console.log(idKupca);
            console.log("Nasel sem id prodajalca!", idKupca);
            console.log(this.kupecPodatkiService.pridobiKupca(idKupca));
          }
          else {
            console.log("Ne najdem");
          }
          return this.kupecPodatkiService.pridobiKupca(idKupca);
          // ta vrne prazen čuden objekt
        }))
      .subscribe((kupec: Kupec) => {
        // this.kupec = kupec;
        // //this.zaboj._id = kupec._id;
        // this.zaboj.ime = kupec.ime;
        // this.zaboj.priimek = kupec.priimek;
        // this.zaboj.email = kupec.email;
        // this.zaboj.geslo = kupec.geslo;
        // this.zaboj.postnina = kupec.postnina;
        // this.zaboj.cena = kupec.cena;
        // this.zaboj.datumDostave = kupec.datumDostave;
        // this.zaboj.nacinPlacila = kupec.nacinPlacila;
        // this.zaboj.postnaStevilka = kupec.postnaStevilka;
        // this.zaboj.naslov = kupec.naslov;
        // this.zaboj.kraj = kupec.kraj;
        // this.zaboj.izdelkiVZabojcku = kupec.zabojcek;
      })
  }


  public zaboj = {
      _id: '',
      ime: '',
      priimek: '',
      email: '',
      geslo: '',
      postnina: '',
      cena: '',
      datumDostave: '',
      nacinPlacila: '',
      postnaStevilka: '',
      naslov: '',
      kraj: '',
      izdelkiVZabojcku: [{
          ime: '',
          kolicina: '',
          cena: '',
          imeKmetije: ''
        }]
  }


}


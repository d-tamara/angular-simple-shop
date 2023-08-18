import { Component, OnInit } from '@angular/core';
import { KupecPodatkiService} from "../../storitve/kupec-podatki.service";
import { ZgodovinaService } from '../../storitve/zgodovina.service';

import {Router} from "@angular/router";
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { Kupec } from "../../razredi/kupec1";

import { PovezavaService } from '../../storitve/povezava.service';

import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-registracija-kupca',
  templateUrl: './registracija-kupca.component.html',
  styleUrls: ['./registracija-kupca.component.css']
})

export class RegistracijaKupcaComponent implements OnInit {

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public napakaNaObrazcu: string = "";

  public novKupec : Kupec = {
    _id: "",
    ime: "",
    priimek: "",
    email: "",
    geslo: "",
    postnaStevilka: "",
    naslov: "",
    kraj: "",
    postnina: "",
    cena: "",
    datumDostave: "",
    nacinPlacila: "",
    zabojcek: []
  }


  public obrazecNapaka: string;

    private soPodatkiUstezni(): boolean {
      if(this.novKupec.ime && this.novKupec.priimek && this.novKupec.email && this.novKupec.geslo
        && this.novKupec.postnaStevilka && this.novKupec.naslov && this.novKupec.kraj) {
        return true;
      }
      else {
        return false;
      }
    }

  constructor(private kupecPodatkiService :  KupecPodatkiService,
              private router: Router,
              private avtentikacijaStoritev: AvtentikacijaService,
              private zgodovinaStoritev: ZgodovinaService,
              private povezavaStoritev: PovezavaService) { }

  //avtentikacija
  public posiljanjePodatkov(): void {
    this.napakaNaObrazcu = "";
    if (
      !this.novKupec.ime || !this.novKupec.priimek ||
      !this.novKupec.email ||
      !this.novKupec.geslo || !this.novKupec.kraj || !this.novKupec.postnaStevilka || !this.novKupec.naslov
    ) {
      this.napakaNaObrazcu = "Zahtevani so vsi podatki, prosim poskusite znova!";
    } else {
      // console.log("Pridem čez pošiljanje podatkov do izvedi");
      this.izvediRegistracijo();
    }
  }

  private izvediRegistracijo(): void {
      // console.log("izvedi registracijo"); pridem
      // console.log(this.novKupec);
    this.avtentikacijaStoritev
      .registracijaKupca(this.novKupec)
      .then(() => this.router.navigateByUrl(this.zgodovinaStoritev.vrniPredhodnjeUrlNaslove()))
      // .then(() => this.router.navigateByUrl("/"))
      .catch(sporocilo => this.napakaNaObrazcu = sporocilo);
  }

  ngOnInit(): void {
  }
}


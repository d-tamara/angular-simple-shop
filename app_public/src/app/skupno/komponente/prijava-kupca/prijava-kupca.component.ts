import { Component, OnInit } from '@angular/core';
import {Kupec} from "../../razredi/kupec1";
import {KupecPodatkiService} from "../../storitve/kupec-podatki.service";
import {Router} from "@angular/router";
import { ZgodovinaService } from '../../storitve/zgodovina.service';
import {AvtentikacijaService} from "../../storitve/avtentikacija.service";
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-prijava-kupca',
  templateUrl: './prijava-kupca.component.html',
  styleUrls: ['./prijava-kupca.component.css']
})
export class PrijavaKupcaComponent implements OnInit {

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public napakaNaObrazcu: string = "";

  public novKupec = {
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

  // public obrazecNapaka: string;

  constructor(private kupecPodatkiService :  KupecPodatkiService,
              private router: Router,
              private avtentikacijaStoritev: AvtentikacijaService,
              private zgodovinaStoritev: ZgodovinaService,
              private povezavaStoritev: PovezavaService) { }

  //avtentikacija
  public posiljanjePodatkov(): void {
    this.napakaNaObrazcu = "";
    // console.log(this.novKupec.email);
    if (
      !this.novKupec.email ||
      !this.novKupec.geslo
    ) {
      this.napakaNaObrazcu = "Zahtevani so vsi podatki, prosim poskusite znova!";
    } else {
      // console.log("Pridem čez pošiljanje podatkov do izvedi");
      this.izvediPrijavo();
    }
  }

  private izvediPrijavo(): void {
    // console.log("izvedi registracijo"); pridem
    // console.log(this.novKupec);
    this.avtentikacijaStoritev
      .prijavaKupca(this.novKupec)
      // .then(() => this.router.navigateByUrl(this.zgodovinaStoritev.vrniPredhodnjeUrlNaslove()))
      .then(() => this.router.navigateByUrl("/zabojcek"))
      .catch(sporocilo => this.napakaNaObrazcu = sporocilo);
  }

  ngOnInit(): void {
  }
}

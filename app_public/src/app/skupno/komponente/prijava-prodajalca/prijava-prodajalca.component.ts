import { Component, OnInit } from '@angular/core';
import { Prodajalec } from '../../razredi/prodajalec';
import { ProdajalecPodatkiService } from "../../storitve/prodajalec-podatki.service";
import {Kupec} from "../../razredi/kupec1";
import {Router} from "@angular/router";
import {AvtentikacijaService} from "../../storitve/avtentikacija.service";
import { ZgodovinaService } from '../../storitve/zgodovina.service';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-prijava-prodajalca',
  templateUrl: './prijava-prodajalca.component.html',
  styleUrls: ['./prijava-prodajalca.component.css']
})
export class PrijavaProdajalcaComponent implements OnInit {

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public napakaNaObrazcu: string = "";

  public novProdajalec = {
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

  // public obrazecPrikazan: boolean = false;
  // public obrazecNapaka: string;

  constructor(private prodajalecPodatkiService: ProdajalecPodatkiService,
              private router: Router,
              private avtentikacijaStoritev: AvtentikacijaService,
              private zgodovinaStoritev: ZgodovinaService,
              private povezavaStoritev: PovezavaService
  ) { }

  public posiljanjePodatkov(): void {
    this.napakaNaObrazcu = "";
    console.log(this.novProdajalec.email);
    if (
      !this.novProdajalec.email ||
      !this.novProdajalec.geslo
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
      .prijavaProdajalca(this.novProdajalec)
      .then(() => this.router.navigateByUrl(this.zgodovinaStoritev.vrniPredhodnjeUrlNaslove()))
      .catch(sporocilo => this.napakaNaObrazcu = sporocilo);
  }

  private soPodatkiUstrezni(): boolean {
    if(this.novProdajalec.email && this.novProdajalec.geslo) {
      return true;
    } else {
      return false;
    }
  }

  // public prijaviProdajalca(): void {
  //   this.obrazecNapaka = "";
  //   if(this.soPodatkiUstrezni()) {
  //     console.log(this.prijavaProdajalca);
  //   } else {
  //     this.obrazecNapaka = "Zahtevani so vsi podatki!";
  //   }
  // }

  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { ProdajalecPodatkiService } from "../../storitve/prodajalec-podatki.service";
import { Router } from "@angular/router";
//import { ActivatedRoute, Router } from "@angular/router";
import { Prodajalec } from "../../razredi/prodajalec";
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';
import { PovezavaService } from '../../storitve/povezava.service';


@Component({
  selector: 'app-registracija-prodajalca',
  templateUrl: './registracija-prodajalca.component.html',
  styleUrls: ['./registracija-prodajalca.component.css']
})
export class RegistracijaProdajalcaComponent implements OnInit {

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public napakaNaObrazcu: string = "";

  public novProdajalec: Prodajalec = {
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


  public obrazecNapaka: string;

  private soPodatkiUstezni(): boolean {
    if(this.novProdajalec.ime && this.novProdajalec.priimek && this.novProdajalec.imeKmetije &&
      this.novProdajalec.naslovKmetije && this.novProdajalec.postaKmetije && this.novProdajalec.krajKmetije
      && this.novProdajalec.podrocjeProdaje && this.novProdajalec.email && this.novProdajalec.geslo && this.novProdajalec.telefon) {
      return true;
    }
    else {
      return false;
    }
  }


  // public dodajProdajalca(): void {
  //   this.obrazecNapaka = "";
  //   if(this.soPodatkiUstezni()) {
  //     this.prodajalecPodatkiService
  //       .dodajProdajalca(this.novProdajalec)
  //       .then((prodajalec: Prodajalec) => {
  //         console.log("Prodajalec shranjen", prodajalec);
  //         this.router.navigate(['/kategorije/']);
  //       })
  //       .catch(napaka => this.obrazecNapaka = napaka);
  //   }
  //   else {
  //     this.obrazecNapaka = "Zahtevani so vsi podatki, prosim poskusite ponovno!";
  //   }
  // }

  constructor(private prodajalecPodatkiService :  ProdajalecPodatkiService,
              private router: Router,
              private avtentikacijaStoritev: AvtentikacijaService,
              private povezavaStoritev: PovezavaService) { }

  //avtentikacija
  public posiljanjePodatkov(): void {
    this.napakaNaObrazcu = "";
    if (
      !this.novProdajalec.ime || !this.novProdajalec.priimek ||
      !this.novProdajalec.email ||
      !this.novProdajalec.geslo || !this.novProdajalec.naslovKmetije
      || !this.novProdajalec.postaKmetije || !this.novProdajalec.krajKmetije ||
      !this.novProdajalec.podrocjeProdaje
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
      .registracijaProdajalca(this.novProdajalec)
      .then(() => this.router.navigateByUrl("/"))
      .catch(sporocilo => this.napakaNaObrazcu = sporocilo);
  }

 /* private idProd: string;
  public vrniIdProdajalca() : string {
    this.idProd = this.prodajalecPodatkiService.pridobiProdajalca(this.novProdajalec._id).then(dobljenProdajalec => this.novProdajalec = dobljenProdajalec);
  }*/

  ngOnInit(): void {

  }

}

import {Component, Input, OnInit} from '@angular/core';
import {ProdajalecPodatkiService} from "../../storitve/prodajalec-podatki.service";
import {Izdelek, Prodajalec} from "../../razredi/prodajalec";
import {AvtentikacijaService} from "../../storitve/avtentikacija.service";

@Component({
  selector: 'app-prodajalec-new-item',
  templateUrl: './prodajalec-new-item.component.html',
  styleUrls: ['./prodajalec-new-item.component.css']
})
export class ProdajalecNewItemComponent implements OnInit {


  public obrazecNapaka: string;

  public novIzdelek: Izdelek = {
    ime: '',
    kategorija: '',
    cena: '',
    kolicina: ''
  };

  private soPodatkiUstrezni(): boolean {
    if (this.novIzdelek.ime && this.novIzdelek.kategorija && this.novIzdelek.cena  && this.novIzdelek.kolicina ) {
      return true;
    } else {
      return false;
    }
  }

  public dodajNovIzdelek(): void {
    // console.log(this.novIzdelek);
    this.obrazecNapaka = "";
    // console.log("Id tule:", this.prodajalec._id);
    this.prodajalec = this.vrniProdajalca();
    this.prodajalec.izdelki = this.vrniUporabnikoveIzdelke();
    // const idPr = this.vrniUporabnika();
    // console.log(this.prodajalec);
    if(this.soPodatkiUstrezni()) {
      this.prodajalecPodatkiService
        .dodajIzdelekProdajalcu(this.prodajalec._id, this.novIzdelek)
        .then((izdelek: Izdelek) => {
          console.log("Izdelek dodan");
          // this.prodajalec.izdelki = this.vrniUporabnikoveIzdelke();
          // let izdelki = this.prodajalec.izdelki.slice(0);
          // // izdelki = izdelki.slice(0);
          // // console.log(this.prodajalec._id);
          // // console.log(this.prodajalec);
          // izdelki.unshift(izdelek);
          // // ko bo urejen izdelek to odkomentirej
          // this.prodajalec.izdelki = izdelki;
          // console.log(this.novIzdelek);
        })
        .catch(napaka => this.obrazecNapaka = napaka);
      } else {
        this.obrazecNapaka = "Zahtevani so vsi podatki";
      }
  }

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }

  public vrniProdajalca(): Prodajalec {
    return this.avtentikacijaStoritev.vrniTrenutnegaProdajalca();
  }

  // public vrniUporabnika(): string {
  //   const { _id } = this.avtentikacijaStoritev.vrniPodatkeUporabnikaP();
  //   return _id ? _id : 'Gost';
  // }

  public vrniUporabnikoveIzdelke(): any {
    const { izdelki } = this.avtentikacijaStoritev.vrniPodatkeUporabnikaIzdelki();
    return izdelki ? izdelki : [];
  }

  public vrniPodatkeProdajalca(): string {
    const podatki = this.avtentikacijaStoritev.vrniPodatkeUporabnikaP();
    return podatki ? podatki._id : 'Gost';
  }

  @Input() prodajalec: Prodajalec;

  constructor(private prodajalecPodatkiService: ProdajalecPodatkiService,
              private avtentikacijaStoritev: AvtentikacijaService,) { }


  ngOnInit(): void {
  }

}

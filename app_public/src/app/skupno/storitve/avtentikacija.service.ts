import { Inject, Injectable } from '@angular/core';
import { SHRAMBA_BRSKALNIKA } from '../razredi/shramba';

import { Kupec} from "../razredi/kupec1";
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import { KupecPodatkiService} from "../storitve/kupec-podatki.service";
import { ProdajalecPodatkiService} from "./prodajalec-podatki.service";
import { Prodajalec} from "../razredi/prodajalec";
import { Izdelek} from "../razredi/prodajalec";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AvtentikacijaService {

  constructor(@Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage,
              private kupecPodatkiService: KupecPodatkiService,
              private prodajalecPodatkiService: ProdajalecPodatkiService
  ) { }

  private b64Utf8(niz: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(
          atob(niz),
          (znak: string) => {
            return '%' + ('00' + znak.charCodeAt(0).toString(16)).slice(-2);
          }
        )
        .join('')
    );
  };

  public async prijavaKupca(kupec: Kupec): Promise<any> {
    console.log("Prijava:", kupec);
    return this.kupecPodatkiService
      .prijavaKupca(kupec)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"])
      });
  }

  public async registracijaKupca(kupec: Kupec): Promise<any> {
    //console.log("Pridem do avtentikacije stortiev")
    // console.log(kupec); ok
    return this.kupecPodatkiService
      .registracijaKupca(kupec)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"]);
      });
  }

  public async prijavaProdajalca(prodajalec: Prodajalec): Promise<any> {
    return this.prodajalecPodatkiService
      .prijavaProdajalca(prodajalec)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"])
      });
  }

  public async registracijaProdajalca(prodajalec: Prodajalec): Promise<any> {
    return this.prodajalecPodatkiService
      .registracijaProdajalca(prodajalec)
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["žeton"]);
      });
  }

  public jePrijavljen(): boolean {
    const zeton: string = this.vrniZeton();
    // console.log("preverjam: ",zeton);
    if (zeton) {
      // console.log("evo žeton");
      // če se pojavi error za eno bedarijo najprej daj this.odjava() pol pa še zakomentiri nazaj
      // this.odjava();
      const koristnaVsebina = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      // console.log(koristnaVsebina); dobim id tuki!
      return koristnaVsebina.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public odjava(): void {
    this.shramba.removeItem('buylocal-zeton');
  }



  public vrniZeton(): string {
    return this.shramba.getItem('buylocal-zeton');
  }

  public shraniZeton(zeton: string): void {
    this.shramba.setItem('buylocal-zeton', zeton);
  }

  public vrniTrenutnegaUporabnika(): Kupec {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const { email, ime} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      //potential napaka kaj je znotri { }
      return { email, ime } as Kupec;
    }
  }
  public vrniTrenutnegaProdajalca(): Prodajalec {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const { _id, email, ime, izdelki} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      //potential napaka kaj je znotri { }
      return {_id, email, ime, izdelki } as Prodajalec;
    }
  }

  public vrniPodatkeUporabnika(): Kupec {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const { _id, email, ime, priimek, zabojcek} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      //potential napaka kaj je znotri { }
      return { _id, email, ime, priimek, zabojcek} as Kupec;
    }
  }

  public vrniPodatkeUporabnikaP(): Prodajalec {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const { _id, email, ime, priimek, imeKmetije, naslovKmetije} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      //potential napaka kaj je znotri { }
      return { _id, email, ime, priimek, imeKmetije, naslovKmetije} as Prodajalec;
    }
  }

  public vrniPodatkeUporabnikaIzdelki(): Prodajalec {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const { _id, izdelki} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      //potential napaka kaj je znotri { }
      return { _id, izdelki } as Prodajalec;
    }
  }

  //
  // public vrniPodatkeIzdelkov(): Kupec {
  //   if (this.jePrijavljen()) {
  //     const zeton: string = this.vrniZeton();
  //     const { email, ime, priimek, izdelki, narocila} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
  //     //potential napaka kaj je znotri { }
  //     return { email, ime, priimek, izdelki, narocila} as ;
  //   }
  // }
}

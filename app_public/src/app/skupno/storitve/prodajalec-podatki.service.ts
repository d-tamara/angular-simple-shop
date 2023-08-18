import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Prodajalec } from "../razredi/prodajalec";
import { Izdelek } from "../razredi/prodajalec";
import { NoviIzdelki} from "../komponente/prodajalec-home/prodajalec-home.component";

import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import{ SHRAMBA_BRSKALNIKA } from "../razredi/shramba";

import { environment } from '../../../environments/environment';
import {RezultatBaze} from "../razredi/rezultat-baze";

@Injectable({
  providedIn: 'root'
})
export class ProdajalecPodatkiService {

  //avtentikacija
  public prijavaProdajalca(prodajalec: Prodajalec): Promise<RezultatAvtentikacije> {
    // return this.avtentikacija('prijavaProdajalec', prodajalec);
    return this.avtentikacija('prijavaProdajalec', prodajalec);
  }

  public registracijaProdajalca(prodajalec: Prodajalec): Promise<RezultatAvtentikacije> {
    // console.log("kupec-podatki service", kupec);
    // return this.avtentikacija('profil/registracijaKupca', kupec);
    return this.avtentikacija('registracijaProdajalec', prodajalec);
  }

  private avtentikacija(urlNaslov: string, prodajalec: Prodajalec): Promise<RezultatAvtentikacije> {
    const url: string = `${this.apiUrl}/${urlNaslov}`;
    // console.log("avtentikacija", prodajalec, url);
    // console.log(this.shramba.getItem('buylocal-zeton')); //null
    // console.log("pred post metoda"); //pride do sem
    // console.log(url);

    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('buylocal-zeton')}`
      })
    };

    return this.http
      .post(url, prodajalec, httpLastnosti)
      .toPromise()
      .then(rezultat => rezultat as RezultatAvtentikacije)
      .catch(this.obdelajNapako);
  }

  constructor(private http: HttpClient,
              @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage) { }
  private apiUrl = environment.apiUrl;


  // public dodajProdajalca( novProdajalec : Prodajalec ): Promise<Prodajalec> {
  //   const url: string = `${this.apiUrl}/registracijaProdajalec`;
  //
  //   return this.http
  //     .post(url, novProdajalec)
  //     .toPromise()
  //     .then(odgovor => odgovor as Prodajalec)
  //     .catch(this.obdelajNapako)
  // }

  public pridobiProdajalca(idProdajalca: any): Promise<Prodajalec> {
    const url: string = `${this.apiUrl}/prodajalecPodatki/${idProdajalca}`;

    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Prodajalec)
      .catch(this.obdelajNapako)
  }

  // public pridobiProdajalcaEmail(email: any): Promise<Prodajalec> {
  //   const url: string = `${this.apiUrl}/prodajalecPodatki/${email}`;
  //   console.log(url);
  //   return this.http
  //     .get(url)
  //     .toPromise()
  //     .then(odgovor => odgovor as Prodajalec)
  //     .catch(this.obdelajNapako)
  // }

  public dodajIzdelekProdajalcu(idProdajalca: string, podatkiObrazca: Izdelek): Promise<Izdelek> {
    const url: string = `${this.apiUrl}/prodajalecNov/${idProdajalca}`;
    // console.log(idProdajalca, podatkiObrazca);
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('buylocal-zeton')}`
      })
    };
    return this.http
      .post(url, podatkiObrazca, httpLastnosti)
      .toPromise()
      .then(odgovor => odgovor as Izdelek)
      .catch(this.obdelajNapako);
  }

  public pridobiIzdelek(idProdajalca: any, idIzdelka: any): Promise<Prodajalec> {
    const url: string = `${this.apiUrl}/prodajalecUredi/${idProdajalca}/${idIzdelka}`;

    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Izdelek)
      .catch(this.obdelajNapako)
  }

  public izbrisiIzdelek(idProdajalca: any, idIzdelka: any): Promise<Prodajalec> {
    const url: string = `${this.apiUrl}/prodajalecPodatki/${idProdajalca}/${idIzdelka}`;

    return this.http
      .delete(url)
      .toPromise()
      .then(odgovor => odgovor as NoviIzdelki)
      .catch(this.obdelajNapako)
  }

  // public urediIzdelek(idProdajalca: any, idIzdelka: any, podatkiIzdelka): Promise<Prodajalec> {
  //   const url: string = `${this.apiUrl}/prodajalecUredi/${idProdajalca}/${idIzdelka}`;
  //   return this.http
  //     .put(url, podatkiIzdelka)
  //     .toPromise()
  //     .then(odgovor => odgovor as Izdelek)
  //     .catch(this.obdelajNapako)
  // }

  public urediPodatke(idProdajalca: string, podatkiKmetije: any): Promise<any> {
    const url: string = `${this.apiUrl}/prodajalecPodatki/${idProdajalca}`;
    return this.http
      .put(url, podatkiKmetije)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako)
  }

  /*public vrniIdProdajalca(): string {
    const url: string = `${this.apiUrl}/registracijaProdajalec`;

    return this.http.get(url).toPromise().then(odgovor => );
  }*/

  public izbrisiVsebinoPodatkovneBaze(): Promise<RezultatBaze> {

    const url: string = `${this.apiUrl}/db`;

    return this.http
      .delete(url)
      .toPromise()
      .then(odgovor => odgovor as RezultatBaze)
      .catch(this.obdelajNapako);
  }

  public dodajVsebinoPodatkovneBaze(): Promise<RezultatBaze> {

    const url: string = `${this.apiUrl}/db`;

    return this.http
      .post(url, null)
      .toPromise()
      .then(odgovor => odgovor as unknown as RezultatBaze)
      .catch(this.obdelajNapako);
  }

  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka.error["sporočilo"] || napaka.error.errmsg || napaka || napaka);
    return Promise.reject(napaka.error["sporočilo"]|| napaka.error.errmsg || napaka || napaka);
  }
}

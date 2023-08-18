import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Kupec} from "../razredi/kupec1";
//conflicting import names
//import { KupecClass } from '../razredi/kupec';
import { RezultatAvtentikacije } from '../razredi/rezultat-avtentikacije';
import{ SHRAMBA_BRSKALNIKA } from "../razredi/shramba";
import {RezultatBaze} from "../razredi/rezultat-baze";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class KupecPodatkiService {

  //avtentikacija
  public prijavaKupca(kupec: Kupec): Promise<RezultatAvtentikacije> {

    return this.avtentikacija('prijavaKupec', kupec);

    // return this.avtentikacija('prijava', kupec);

  }

  public registracijaKupca(kupec: Kupec): Promise<RezultatAvtentikacije> {
    // console.log("kupec-podatki service", kupec);
    // return this.avtentikacija('profil/registracijaKupca', kupec);
    return this.avtentikacija('registracijaKupec', kupec);
  }

  private avtentikacija(urlNaslov: string, kupec: Kupec): Promise<RezultatAvtentikacije> {
    const url: string = `${this.apiUrl}/${urlNaslov}`;
    console.log("avtentikacija", kupec, url);

    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.shramba.getItem('buylocal-zeton')}`
      })
    };

    //console.log(this.shramba.getItem('buylocal-zeton')); //null
    console.log("Na naslov "+url);

    return this.http
      .post(url, kupec, httpLastnosti)
      .toPromise()
      .then(rezultat => rezultat as RezultatAvtentikacije)
      .catch(this.obdelajNapako);
    // return this.http
    //   .post(url, kupec)
    //   .toPromise()
    //   .then(rezultat => rezultat as RezultatAvtentikacije)
    //   .catch(this.obdelajNapako);
  }

  constructor(private http: HttpClient,
              @Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage) { }
  private apiUrl = environment.apiUrl;


  public pridobiKupca(idKupca: any): Promise<Kupec> {
    const url: string = `${this.apiUrl}/zabojcek/${idKupca}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Kupec)
      .catch(this.obdelajNapako);
  }

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

//dodaj obdelajNapako
  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka.error["sporočilo"] || napaka.error.errmsg || napaka || napaka);
    return Promise.reject(napaka.error["sporočilo"]|| napaka.error.errmsg || napaka || napaka);

    //
    // console.error('Prišlo je do napake', napaka);
    // return Promise.reject(napaka.message || napaka);
  }
}

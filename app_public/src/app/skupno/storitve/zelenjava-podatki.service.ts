import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //klic rest strežnika
import { Zelenjava } from "../razredi/zelenjava";
import {RezultatBaze} from "../razredi/rezultat-baze";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZelenjavaPodatkiService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  public pridobiZelenjavo(): Promise<Zelenjava[]> {
    const url: string = `${this.apiUrl}/zelenjava`;

    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Zelenjava[])
      .catch(this.obdelajNapako)
  }

  public pridobiIzdelek(idIzdelka: string): Promise<Zelenjava> {
    const url: string = `${this.apiUrl}/zelenjava/${idIzdelka}`;
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Zelenjava)
      .catch(this.obdelajNapako);
  }

  public dodajIzdelekVZabojcek(idIzdelka: string, podatkiIzdelka: any): Promise<any> {
    const url: string = `${this.apiUrl}/zelenjava/${idIzdelka}`;
    return this.http
      .post(url, podatkiIzdelka)
      .toPromise()
      .then(odgovor => odgovor as any)
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

  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }

}

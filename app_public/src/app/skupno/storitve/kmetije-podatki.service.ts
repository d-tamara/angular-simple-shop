import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kmetija} from "../razredi/kmetija";

import { environment } from '../../../environments/environment';
import {RezultatBaze} from "../razredi/rezultat-baze";

@Injectable({
  providedIn: 'root'
})
export class KmetijePodatkiService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  public pridobiKmetije(): Promise<Kmetija[]> {
    const url: string = `${this.apiUrl}/kategorije`;

    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Kmetija[])
      .catch(this.obdelajNapako)
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

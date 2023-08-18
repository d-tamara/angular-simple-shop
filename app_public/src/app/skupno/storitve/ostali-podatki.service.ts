import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ostalo } from "../razredi/ostalipridelki";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OstaliPodatkiService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  public pridobiOstale(): Promise<Ostalo[]> {
    const url: string = `${this.apiUrl}/zelenjava`;

    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Ostalo[])
      .catch(this.obdelajNapako)
  }

  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}

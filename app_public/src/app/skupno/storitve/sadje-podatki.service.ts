import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sadje } from "../razredi/sadje";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SadjePodatkiService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  public pridobiSadje(): Promise<Sadje[]> {
    const url: string = `${this.apiUrl}/zelenjava`;

    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Sadje[])
      .catch(this.obdelajNapako)
  }

  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}

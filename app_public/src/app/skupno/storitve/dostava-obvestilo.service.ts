import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Obvestilo } from '../razredi/obvestilo';

@Injectable({
  providedIn: 'root'
})

export class DostavaObvestiloService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://teaching.lavbic.net/api';

  public pridobiObvestila(): Promise<Obvestilo[]> {
    const url: string = `${this.apiUrl}/prazniki/iskanje/leto/2021`;
    return this.http.get(url).toPromise().then(odgovor => odgovor as Obvestilo[]).catch(this.obdelajNapako);
  }

  private obdelajNapako(napaka: any): Promise <any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}

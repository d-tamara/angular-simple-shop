import { Injectable } from '@angular/core';
import {Prodajalec} from "../razredi/prodajalec";
import {NoviIzdelki} from "../komponente/prodajalec-home/prodajalec-home.component";
import { Izdelek } from "../razredi/prodajalec";
import {HttpClient} from "@angular/common/http";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IzdelekPodatkiService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl;

  public pridobiIzdelek(idProdajalca: any, idIzdelka: any): Promise<Prodajalec> {
    const url: string = `${this.apiUrl}/prodajalecUredi/${idProdajalca}/${idIzdelka}`;

    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Izdelek)
      .catch(this.obdelajNapako)
  }

  public izbrisiIzdelek(idProdajalca: any, idIzdelka: any): Promise<Prodajalec> {
    const url: string = `${this.apiUrl}/prodajalecUredi/${idProdajalca}/${idIzdelka}`;

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

  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pijace } from "./../razredi/pijaca"
import {Sadje} from "./../razredi/sadje";

@Injectable({
  providedIn: 'root'
})
export class PijacaPodatkiService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api';

  public pridobiPijace(): Promise<Pijace[]> {
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

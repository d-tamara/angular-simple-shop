import { Injectable } from '@angular/core';
import {AvtentikacijaService} from "./avtentikacija.service";
import { Kupec } from "../razredi/kupec1";

@Injectable({
  providedIn: 'root'
})
export class ZabojcekService {

  constructor(
              ) { }

  // public vrniPodatkeKupca(): string {
  //   const podatki = this.avtentikacijaStoritev.vrniPodatkeUporabnika();
  //   return podatki ? podatki.priimek : 'Gost';
  // }
}

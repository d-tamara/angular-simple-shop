import { Component, OnInit } from '@angular/core';
import { Kupec } from "../../razredi/kupec1";
import { AvtentikacijaService } from "../../storitve/avtentikacija.service";
import { PovezavaService } from '../../storitve/povezava.service';
import { ZgodovinaService } from '../../storitve/zgodovina.service';

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {

  constructor(private avtentikacijaStoritev: AvtentikacijaService,
              private zgodovinaStoritev: ZgodovinaService,
              private povezavaStoritev: PovezavaService) { }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public odjava(): void {
    this.avtentikacijaStoritev.odjava();
  }

  public jePrijavljen(): boolean {
    // console.log("preverjam");
    return this.avtentikacijaStoritev.jePrijavljen();
  }

  public vrniKupca(): string {
    const uporabnik: Kupec = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    return uporabnik ? uporabnik.ime : 'Gost';
  }

  public vrniPodatkeKupca(): string {
    const podatki = this.avtentikacijaStoritev.vrniPodatkeUporabnika();
    return podatki ? podatki._id : 'Gost';
  }

  public vrniPodatkeProdajalca(): string {
    const podatki = this.avtentikacijaStoritev.vrniPodatkeUporabnikaP();
    return podatki ? podatki._id : 'Gost';
  }

  ngOnInit(): void {
  }

}

import {Component, OnInit} from '@angular/core';
import {PovezavaService} from '../../storitve/povezava.service';
import {ZelenjavaPodatkiService} from "../../storitve/zelenjava-podatki.service";
import {ProdajalecPodatkiService} from "../../storitve/prodajalec-podatki.service";
import {KupecPodatkiService} from "../../storitve/kupec-podatki.service";

import {RezultatBaze} from '../../razredi/rezultat-baze';
import {KmetijePodatkiService} from "../../storitve/kmetije-podatki.service";

@Component({
  selector: 'app-baza',
  templateUrl: './baza.component.html',
  styleUrls: ['./baza.component.css']
})
export class BazaComponent implements OnInit {

  sporociloObrazca: RezultatBaze;

  constructor(private zelenjavaPodatkiService: ZelenjavaPodatkiService,
              private prodajalecPodatkiService: ProdajalecPodatkiService,
              private kupecPodatkiService: KupecPodatkiService,
              private kmetijePodatkiService: KmetijePodatkiService,
              private povezavaStoritev: PovezavaService) {
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public izbrisiVsebinoPodatkovneBaze(): void {
    this.zelenjavaPodatkiService.izbrisiVsebinoPodatkovneBaze()
    this.prodajalecPodatkiService.izbrisiVsebinoPodatkovneBaze()
    this.kupecPodatkiService.izbrisiVsebinoPodatkovneBaze()
    this.kmetijePodatkiService.izbrisiVsebinoPodatkovneBaze()
      .then(rezultat => this.sporociloObrazca = rezultat).catch(rezultat => this.sporociloObrazca = rezultat);
  }

  public dodajVsebinoPodatkovneBaze(): void {
    this.zelenjavaPodatkiService.dodajVsebinoPodatkovneBaze()
    this.prodajalecPodatkiService.dodajVsebinoPodatkovneBaze()
    this.kupecPodatkiService.dodajVsebinoPodatkovneBaze()
    this.kmetijePodatkiService.dodajVsebinoPodatkovneBaze()
      .then(rezultat => this.sporociloObrazca = rezultat).catch(rezultat => this.sporociloObrazca = rezultat);
  }

  ngOnInit(): void {
  }

}

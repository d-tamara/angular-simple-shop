import { Component, OnInit } from '@angular/core';
import {ZelenjavaPodatkiService} from "../../storitve/zelenjava-podatki.service";
import {Ostalo} from "../../razredi/ostalipridelki";
import { Zelenjava } from "../../razredi/zelenjava";

@Component({
  selector: 'app-ostalipridelki',
  templateUrl: './ostalipridelki.component.html',
  styleUrls: ['./ostalipridelki.component.css']
})
export class OstalipridelkiComponent implements OnInit {

  public ostalipridelki: Zelenjava[];

  constructor(private zelenjavaPodatkiService : ZelenjavaPodatkiService) {
  }

  private pridobiOstaloVKomponenti() : void{
    this.zelenjavaPodatkiService.pridobiZelenjavo().then(najdeniOstali => this.ostalipridelki = najdeniOstali);
  }

  // ostalipridelki: Ostalo[] = [{
  //   imgSrc: "/assets/images/honey-jar.png",
  //   naziv: "Cvetlični med"
  // },{
  //
  //   imgSrc: "/assets/images/jam.png",
  //   naziv: "Jagodna marmelada"
  // }]

  ngOnInit(): void {
    this.pridobiOstaloVKomponenti();
  }

}

// export class Ostalo {
//   _id: string;
//   kategorija: string;
//   naziv: string;
//   imgSrc: string;
//   zaloga: boolean;
// }

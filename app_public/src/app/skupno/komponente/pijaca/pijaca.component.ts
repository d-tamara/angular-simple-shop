import { Component, OnInit } from '@angular/core';
import {PijacaPodatkiService} from "../../storitve/pijaca-podatki.service";
import { Pijace} from "../../razredi/pijaca";
import {ZelenjavaPodatkiService} from "../../storitve/zelenjava-podatki.service";
import {Ostalo} from "../../razredi/ostalipridelki";
import { Zelenjava } from "../../razredi/zelenjava";

@Component({
  selector: 'app-pijaca',
  templateUrl: './pijaca.component.html',
  styleUrls: ['./pijaca.component.css']
})
export class PijacaComponent implements OnInit {

  public pijaca: Zelenjava[];

  constructor(private zelenjavaPodatkiService :  ZelenjavaPodatkiService) {
  }

  private pridobiPijaceVKomponenti() : void{
    this.zelenjavaPodatkiService.pridobiZelenjavo().then(najdenaPijaca => this.pijaca = najdenaPijaca);
  }

  // pijaca: Pijace[] = [{
  //   imgSrc: "assets/images/orange-juice.png",
  //   naziv: "Pomarančni sok"
  // },{
  //
  //   imgSrc: "assets/images/sirup-zajbelj.png",
  //   naziv: "Sirup žajbelj"
  // }]

  ngOnInit(): void {
    this.pridobiPijaceVKomponenti();
  }

}

// export class Pijace {
//   _id: string;
//   kategorija: string;
//   naziv: string;
//   imgSrc: string;
//   zaloga: boolean;
// }

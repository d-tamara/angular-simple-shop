import { Component, OnInit } from '@angular/core';
import { ZelenjavaPodatkiService } from "../../storitve/zelenjava-podatki.service";
import { Zelenjava } from "../../razredi/zelenjava";

@Component({
  selector: 'app-zelenjava',
  templateUrl: './zelenjava.component.html',
  styleUrls: ['./zelenjava.component.css']
})
export class ZelenjavaComponent implements OnInit {

  public zelenjava: Zelenjava[];

  constructor(private zelenjavaPodatkiService :  ZelenjavaPodatkiService) {
  }

  private pridobiZelenjavo() : void{
    this.zelenjavaPodatkiService.pridobiZelenjavo().then(najdenaZelenjava => this.zelenjava = najdenaZelenjava);
  }

  // zelenjava: Zelenjava[] = [{
  //   imgSrc: "/assets/images/005-onion.png",
  //   naziv: "Čebula"
  //  },{
  //
  //   imgSrc: "/assets/images/008-leek.png",
  //   naziv: "Por"
  //   }]

  ngOnInit(): void {
    this.pridobiZelenjavo();
  }

}
// export class Zelenjava {
//     _id: string;
//     kategorija: string;
//     naziv: string;
//     imgSrc: string;
//     zaloga: [{
//       nazivKmetije: string;
//       cena: string;
//       kolicina: string;
//     }]
// }

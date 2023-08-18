import { Component, OnInit } from '@angular/core';
import {SadjePodatkiService} from "../../storitve/sadje-podatki.service";
import { Sadje } from "../../razredi/sadje";
import { Zelenjava } from "../../razredi/zelenjava";
import { ZelenjavaPodatkiService } from "../../storitve/zelenjava-podatki.service";

@Component({
  selector: 'app-sadje',
  templateUrl: './sadje.component.html',
  styleUrls: ['./sadje.component.css']
})


export class SadjeComponent implements OnInit {

  public sadje: Zelenjava[];


  constructor(private zelenjavaPodatkiService :  ZelenjavaPodatkiService) {
  }

  private pridobiSadjeVKomponenti() : void{
    this.zelenjavaPodatkiService.pridobiZelenjavo().then(najdenoSadje => this.sadje = najdenoSadje);
  }

  // sadje: Sadje[] = [{
  //   imgSrc: "/assets/images/kiwi.png",
  //   naziv: "Kivi"
  // },{
  //
  //   naziv: "Banana"
  // }]

  ngOnInit(): void {
    this.pridobiSadjeVKomponenti();
  }

}



//
// export class Sadje {
//   _id: string;
//   kategorija: string;
//   naziv: string;
//   imgSrc: string;
//   zaloga: boolean;
// }

import { Component, OnInit } from '@angular/core';
//import {Kmetije} from "../seznam-kmetij/seznam-kmetij.component";
import { KmetijePodatkiService } from "../../storitve/kmetije-podatki.service";
import { Kmetija } from "../../razredi/kmetija";

@Component({
  selector: 'app-seznam-kategorij',
  templateUrl: './seznam-kategorij.component.html',
  styleUrls: ['./seznam-kategorij.component.css']
})

export class SeznamKategorijComponent implements OnInit {

  constructor(private kmetijePodatkiService:  KmetijePodatkiService) { }

  public kmetije: Kmetija[];

  private pridobiKmetijeVkomponenti() : void{
    this.kmetijePodatkiService.pridobiKmetije().then(najdeneKmetije => this.kmetije = najdeneKmetije);
  }

  /*
  kmetije: Kmetije[] = [{
    imeKmetije: "Šalamunova kmetija",
    krajKmetije: "Šalamulandija",
    podrocjeProdaje: "Šalamunovo sadje"
  }, {
    imeKmetije: "Prešernova kmetija",
    krajKmetije: "Vrba",
    podrocjeProdaje: "Fige"
  }]
  */


  ngOnInit() {
    this.pridobiKmetijeVkomponenti();
  }
}

// export class Kmetija {
//   ime: string;
//   priimek: string;
//   imeKmetije: string;
//   naslovKmetije: string;
//   postaKmetije: string;
//   krajKmetije: string;
//   podrocjeProdaje: string;
//   email: string;
//   geslo: string;
//   telefon: string;
//   izdelki: any;
// }




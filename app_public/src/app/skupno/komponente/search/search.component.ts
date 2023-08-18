import { Component, OnInit } from '@angular/core';
import { SearchPipe} from "../../cevi/search.pipe";
import { ZelenjavaPodatkiService } from "../../storitve/zelenjava-podatki.service";
import {Zelenjava} from "../../razredi/zelenjava";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchInput: string;

  private pridobiZelenjavo() : void{
    this.zelenjavaPodatkiService.pridobiZelenjavo().then(najdenaZelenjava => this.zelenjava = najdenaZelenjava);
  }

  public pridelki = [
    'Paradižnik','Rdeča paprika','Kumare','Čebula','Por',
    'Jabolko','Hruška','Banana','Kivi','Grozdje','Jabolčni sok', 'Pomarančni sok',
    'Sirup bajželj', 'Sirup bezeg', 'Sirup meta', 'Jajca', 'Mleko', 'Cvetlični med', 'Jagodna marmelada',
    'Jogurt'
  ]

  public zelenjava: Zelenjava[];

  constructor(private zelenjavaPodatkiService :  ZelenjavaPodatkiService) {
  }

  ngOnInit(): void {
    this.pridobiZelenjavo();
  }

}

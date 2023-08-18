import { Component, OnInit } from '@angular/core';
import { DostavaObvestiloService } from "../../storitve/dostava-obvestilo.service";
import { Obvestilo } from "../../razredi/obvestilo";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})

export class WelcomePageComponent implements OnInit {

  constructor(private dostavaObvestiloService: DostavaObvestiloService) { }

  public obvestila: Obvestilo[];

  private pridobiObvestila(): void {
    this.dostavaObvestiloService.pridobiObvestila().then(dobljenaObvestila => this.obvestila = dobljenaObvestila);
  }

  ngOnInit(): void {
    this.pridobiObvestila();
  }
}

// export class Obvestilo {
//   dan: string;
//   mesec: string;
//   danVTednu: string;
//   delaProstDan: boolean;
//   imePraznika: string;
// }

import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ZelenjavaPodatkiService } from "../../storitve/zelenjava-podatki.service";
import { Zelenjava } from "../../razredi/zelenjava";
import { AvtentikacijaService } from "../../storitve/avtentikacija.service";

@Component({
  selector: 'app-podrobnosti-izdelka',
  templateUrl: './podrobnosti-izdelka.component.html',
  styleUrls: ['./podrobnosti-izdelka.component.css']
})
export class PodrobnostiIzdelkaComponent implements OnInit {

  constructor(private zelenjavaPodatkiService:  ZelenjavaPodatkiService,
              private avtentikacijaStoritev: AvtentikacijaService,
              private pot: ActivatedRoute) { }

  zelenjava: Zelenjava;
  // zelenjavaVsa: Zelenjava[];
  //
  // // _id: string;
  // // naziv: string;
  // // slika: string;
  //
  // // izdelek: Izdelek;

  // naziv: string;

  public jePrijavljen(): boolean {
    return this.avtentikacijaStoritev.jePrijavljen();
  }

  ngOnInit(): void {
    this.pot.paramMap
        .pipe(
          switchMap((params: ParamMap) => {
            let idIzdelka = params.get('idIzdelka');

            if (idIzdelka != undefined) {
              console.log(idIzdelka);
            }
            else {
              console.log("Ne najdem");
            }
            return this.zelenjavaPodatkiService.pridobiIzdelek(idIzdelka);
            // ta vrne prazen čuden objekt
          })
          )
        .subscribe((zelenjava: Zelenjava) => {
            this.zelenjava = zelenjava;
            this.izdelek._id = zelenjava._id;
            this.izdelek.naziv = `${zelenjava.naziv}`;
            this.izdelek.imgSrc = zelenjava.imgSrc;
            this.izdelek.zaloga = zelenjava.zaloga;
            this.izdelek.kategorija = zelenjava.kategorija;

      })

  }
  public dodajIzdelek(): void {
    this.zelenjavaPodatkiService.dodajIzdelekVZabojcek(this.izdelek._id, this.izdelek).then(izdelek => {
      console.log("Izdelek dodan", izdelek);
    })
      //.catch(napaka=>)
  }

  public izdelek = {
    _id: "",
    kategorija: "",
    naziv: "",
    imgSrc: "",
    zaloga: [{
      nazivKmetije: "",
      cena: "",
      kolicina: ""
    }]
  }

}

import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { Kupec } from "../../razredi/kupec1";
import { KupecPodatkiService } from "../../storitve/kupec-podatki.service";
import { switchMap } from "rxjs/operators";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-nakup',
  templateUrl: './nakup.component.html',
  styleUrls: ['./nakup.component.css']
})
export class NakupComponent implements OnInit {

  closeResult: string;


  constructor(private modalService: NgbModal,private kupecPodatkiService:  KupecPodatkiService,
              private pot: ActivatedRoute) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  kupec: Kupec;


  ngOnInit(): void {
    this.pot.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idKupca = params.get('idKupca');

          if (idKupca != undefined) {
            console.log(idKupca);
            console.log("Nasel sem id prodajalca!");
            console.log(this.kupecPodatkiService.pridobiKupca(idKupca));
          }
          else {
            console.log("Ne najdem");
          }
          return this.kupecPodatkiService.pridobiKupca(idKupca);
          // ta vrne prazen čuden objekt
        }))
      .subscribe((kupec: Kupec) => {
        this.kupec = kupec;
        //this.zaboj._id = kupec._id;
        this.zaboj.ime = kupec.ime;
        this.zaboj.priimek = kupec.priimek;
        this.zaboj.email = kupec.email;
        this.zaboj.geslo = kupec.geslo;
        this.zaboj.postnina = kupec.postnina;
        this.zaboj.cena = kupec.cena;
        this.zaboj.datumDostave = kupec.datumDostave;
        this.zaboj.nacinPlacila = kupec.nacinPlacila;
        this.zaboj.postnaStevilka = kupec.postnaStevilka;
        this.zaboj.naslov = kupec.naslov;
        this.zaboj.kraj = kupec.kraj;
        this.zaboj.izdelkiVZabojcku = kupec.zabojcek;
      })
  }

  public zaboj = {
    _id: '',
    ime: '',
    priimek: '',
    email: '',
    geslo: '',
    postnina: '',
    cena: '',
    datumDostave: '',
    nacinPlacila: '',
    postnaStevilka: '',
    naslov: '',
    kraj: '',
    izdelkiVZabojcku: [{
      ime: '',
      kolicina: '',
      cena: '',
      imeKmetije: ''
    }]
  }

}

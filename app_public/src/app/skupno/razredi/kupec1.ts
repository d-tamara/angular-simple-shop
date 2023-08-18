export class Kupec {
  _id: string;
  ime: string;
  priimek: string;
  email: string;
  geslo: string;
  postnina: string;
  cena: string;
  datumDostave: string;
  nacinPlacila: string;
  postnaStevilka: string;
  naslov: string;
  kraj: string;
  zabojcek: Zabojcek[];

}

export class Zabojcek {
  ime: string;
  cena: string;
  kolicina: string;
  imeKmetije: string;
}

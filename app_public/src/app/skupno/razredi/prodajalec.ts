export class Prodajalec {
  _id: string;
  ime: string;
  priimek: string;
  imeKmetije: string;
  naslovKmetije: string;
  postaKmetije: string;
  krajKmetije: string;
  podrocjeProdaje: string;
  email: string;
  geslo: string;
  telefon: string;
  izdelki: Izdelek[];
  narocila: Narocila[];
}

export class Izdelek {
  kategorija: string;
  ime: string;
  cena: string;
  kolicina: string;
}

export class Narocila {
  cena: string;
  status: string;
  seznamIzdelkov: [string];
}

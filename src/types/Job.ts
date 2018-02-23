export interface WorkAd {
  annonsid: string;
  platsannonsUrl: string;
  annonsrubrik: string;
  annonstext: string;
  yrkesbenamning: string;
  yrkesid: number;
  publiceraddatum: Date;
  antal_platser: string;
  kommunnamn: string;
  kommunkod: number;
  antalplatserVisa: number;
  anstallningstyp: string;
}

export interface Terms {
  varaktighet: string;
  arbetstid: string;
  arbetstidvaraktighet: string;
  lonetyp: string;
  loneform: string;
}

export interface Application {
  webbplats: string;
  sista_ansokningsdag: Date;
  ovrigt_om_ansokan: string;
}

export interface ContactPersonData {
  namn: string;
  telefonnummer: string;
  epostadress: string;
}

export interface ContactPersonList {
  kontaktpersondata: ContactPersonData[];
}

export interface Workplace {
  arbetsplatsnamn: string;
  postnummer: string;
  postadress: string;
  postort: string;
  postland: string;
  land: string;
  besoksadress: string;
  hemsida: string;
  kontaktpersonlista: ContactPersonList;
}

export interface Demand {
  egenbil: boolean;
}

export interface AdLocation {
  lat: number;
  lng: number;
}

export interface JobAd {
  annons: WorkAd;
  villkor: Terms;
  ansokan: Application;
  arbetsplats: Workplace;
  krav: Demand;
  adLocation: AdLocation;
}

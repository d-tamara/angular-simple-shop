import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
//import { RouterModule } from '@angular/router';
import { AppUsmerjanjeModule } from './moduli/app-usmerjanje/app-usmerjanje.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WelcomePageComponent } from './skupno/komponente/welcome-page/welcome-page.component';
import { SeznamKategorijComponent } from './skupno/komponente/seznam-kategorij/seznam-kategorij.component';
import { OgrodjeComponent } from './skupno/komponente/ogrodje/ogrodje.component';
import { ZelenjavaComponent } from './skupno/komponente/zelenjava/zelenjava.component';
import { SadjeComponent } from './skupno/komponente/sadje/sadje.component';
import { PijacaComponent } from './skupno/komponente/pijaca/pijaca.component';
import { OstalipridelkiComponent } from './skupno/komponente/ostalipridelki/ostalipridelki.component';
import { ProfilPrijavaComponent } from './skupno/komponente/profil-prijava/profil-prijava.component';
import { PrijavaKupcaComponent } from './skupno/komponente/prijava-kupca/prijava-kupca.component';
import { RegistracijaKupcaComponent } from './skupno/komponente/registracija-kupca/registracija-kupca.component';
import { RegistracijaProdajalcaComponent } from './skupno/komponente/registracija-prodajalca/registracija-prodajalca.component';
import { PrijavaProdajalcaComponent } from './skupno/komponente/prijava-prodajalca/prijava-prodajalca.component';

import { ProdajalecHomeComponent } from './skupno/komponente/prodajalec-home/prodajalec-home.component';
import { ProdajalecOrdersComponent } from './skupno/komponente/prodajalec-orders/prodajalec-orders.component';
import { ProdajalecNewItemComponent } from './skupno/komponente/prodajalec-new-item/prodajalec-new-item.component';

import { PodatkiKmetijeComponent } from './skupno/komponente/podatki-kmetije/podatki-kmetije.component';
import { UrediIzdelekComponent } from './skupno/komponente/uredi-izdelek/uredi-izdelek.component';
import { PodrobnostiIzdelkaComponent } from './skupno/komponente/podrobnosti-izdelka/podrobnosti-izdelka.component';
import { ZabojcekComponent } from './skupno/komponente/zabojcek/zabojcek.component';
import { NakupComponent } from './skupno/komponente/nakup/nakup.component';

import { DovoliUrlPipe } from './skupno/cevi/dovoli-url.pipe';

import { SearchComponent } from './skupno/komponente/search/search.component';
import { BarComponent } from './skupno/komponente/bar/bar.component';
import { ModalnoOknoComponent } from './skupno/komponente/modalno-okno/modalno-okno.component';

import { SearchPipe } from './skupno/cevi/search.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BazaComponent } from './skupno/komponente/baza/baza.component';



@NgModule({
  declarations: [
    //DemoPaginationBasicComponent,
    WelcomePageComponent,
    SeznamKategorijComponent,
    OgrodjeComponent,
    ZelenjavaComponent,
    SadjeComponent,
    PijacaComponent,
    OstalipridelkiComponent,

    //profil komponente
    ProfilPrijavaComponent,
    PrijavaKupcaComponent,
    RegistracijaKupcaComponent,
    RegistracijaProdajalcaComponent,
    PrijavaProdajalcaComponent,


    // SeznamKmetijComponent,
    ProdajalecHomeComponent,
    ProdajalecOrdersComponent,
    ProdajalecNewItemComponent,

    PodatkiKmetijeComponent,
    UrediIzdelekComponent,
    PodrobnostiIzdelkaComponent,
    NakupComponent,
    ZabojcekComponent,
    DovoliUrlPipe,
    SearchComponent,
    BarComponent,
    ModalnoOknoComponent,
    SearchPipe,
    BazaComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppUsmerjanjeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    /*RouterModule.forRoot([
      {
        path: '',
        component: WelcomePageComponent
      },{
        path: 'search',
        component: SearchComponent
      }, {
        path: 'kategorije',
        component: SeznamKategorijComponent
      }, {
        path: 'kategorije/zelenjava',
        component: ZelenjavaComponent
      }, {
        path: 'kategorije/sadje',
        component: SadjeComponent
      },{
        path: 'kategorije/pijaca',
        component: PijacaComponent
      },{
        path: 'kategorije/ostaliPridelki',
        component: OstalipridelkiComponent
      }, {
        path: 'kategorije/:idIzdelka',
        component: PodrobnostiIzdelkaComponent
      }, {
        path: 'profil',
        component: ProfilPrijavaComponent
      }, {
        path: 'profil/prijavaKupca',
        component: PrijavaKupcaComponent
      }, {
        path: 'profil/prijavaProdajalca',
        component: PrijavaProdajalcaComponent
      }, {
        path: 'profil/registracijaKupca',
        component: RegistracijaKupcaComponent
      }, {
        path: 'profil/registracijaProdajalca',
        component: RegistracijaProdajalcaComponent
      }, {
        path: 'prodajalecHome/:idProdajalca',
        component: ProdajalecHomeComponent
      }, {
        path: 'prodajalecHome/:idProdajalca/prodajalecOrders',
        component: ProdajalecOrdersComponent
      }, {
        path: 'prodajalecHome/:idProdajalca/newItem',
        component: ProdajalecNewItemComponent
      }, {
        path: 'prodajalecHome/:idProdajalca/podatkiKmetije',
        component: PodatkiKmetijeComponent
      }, {
        path: 'prodajalecHome/:idProdajalca/:idIzdelka',
        component: UrediIzdelekComponent
      }, {
        path: 'zabojcek/:idKupca',
        component: ZabojcekComponent
      }, {
        path: 'zabojcek/nakup/:idKupca',
        component: NakupComponent
      }
    ])*/
  ],

  providers: [],
  bootstrap: [OgrodjeComponent]
})
export class AppModule { }

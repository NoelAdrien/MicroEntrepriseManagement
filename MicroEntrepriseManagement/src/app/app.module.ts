import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { EncaissementComponent } from './facture/encaissement.component';
import { FactureFormComponent } from './facture-form/facture-form.component';

import { PricesPipe } from './shared/Pipes/PricesPipe';

import localeFr from '@angular/common/locales/fr';
import { TvaComponent } from './tva/tva.component';
import { NgxChartsModule } from '@swimlane/ngx-charts/release/ngx-charts.module';

// FireBase configuration
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { SigninComponent } from './signin/signin/signin.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    EncaissementComponent,
    PricesPipe,
    FactureFormComponent,
    TvaComponent,
    SigninComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "fr-FR" }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

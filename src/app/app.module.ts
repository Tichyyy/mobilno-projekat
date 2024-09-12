import { NgModule } from '@angular/core';

//modul za pokretanje app u pretrazivacu
import { BrowserModule } from '@angular/platform-browser';

//mehanizam za ponovno koriscenje ruta
import { RouteReuseStrategy } from '@angular/router';

//fje vezane za firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

//firebase authentication za upr korisnicima
import { provideAuth, getAuth } from '@angular/fire/auth';

//za firebase bazu
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//za http zahteve
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { PlayerService } from './player.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    provideHttpClient(),
    PlayerService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

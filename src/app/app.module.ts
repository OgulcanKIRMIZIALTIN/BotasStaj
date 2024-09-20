import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import components
import { AdminComponent } from './TheScripts/admin.component';
import { AdminGirisComponent } from './TheScripts/admingiris.component';
import { AnaSayfaComponent } from './TheScripts/anaSayfa.component';
import { AyarlamaComponent } from './TheScripts/ayarlama.component';
import { BakAyarlamaComponent } from './TheScripts/bak-ayarlama.component';
import { GirisComponent } from './TheScripts/giris.component';
import { KayitliRezervasyonlarComponent } from './TheScripts/KayitliRezervasyonlar.component';
import { RezervasyonFormComponent } from './TheScripts/rezervasyonForm.component';

@NgModule({
  declarations: [
    AppComponent,
    AnaSayfaComponent,
    AdminComponent,
    AdminGirisComponent,
    GirisComponent,
    KayitliRezervasyonlarComponent,
    RezervasyonFormComponent,
    AyarlamaComponent,
    BakAyarlamaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Add HttpClientModule here
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

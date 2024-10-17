import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KayitliRezervasyonlarComponent } from './TheScripts/KayitliRezervasyonlar.component'; // Ensure this matches the file name
import { AdminComponent } from './TheScripts/admin.component';
import { AdminGirisComponent } from './TheScripts/admingiris.component';
import { AnaSayfaComponent } from './TheScripts/anaSayfa.component';
import { AyarlamaComponent } from './TheScripts/ayarlama.component';
import { BakAyarlamaComponent } from './TheScripts/bak-ayarlama.component';
import { GirisComponent } from './TheScripts/giris.component';
import { RezervasyonFormComponent } from './TheScripts/rezervasyonForm.component';

const routes: Routes = [
  { path: 'bak-ayarlama', component: BakAyarlamaComponent  },
  { path: 'anaSayfa', component: AnaSayfaComponent },
  { path: 'rezervasyonForm', component: RezervasyonFormComponent },
  { path: 'kayitli-rezervasyonlar', component: KayitliRezervasyonlarComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admingiris', component: AdminGirisComponent },
  { path: 'giris', component: GirisComponent },
  { path: 'ayarlama', component: AyarlamaComponent },
  { path: '', redirectTo: '/anaSayfa', pathMatch: 'full' },
  { path: '**', redirectTo: '/anaSayfa' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

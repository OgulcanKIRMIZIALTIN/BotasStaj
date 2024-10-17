import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-giris',
  templateUrl: '../ThePages/giris.component.html',
  styleUrls: ['../TheStyles/giris.component.css']
})
export class GirisComponent {

  login = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  onLoginPage2(): void {
    // Navigate to reservation form page
    this.router.navigate(['/rezervasyonForm']);
  }

  goToPage1(): void {
    // Navigate to the main page
    this.router.navigate(['/anaSayfa']);
  }
}

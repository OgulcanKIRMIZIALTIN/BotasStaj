import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anaSayfa',
  templateUrl: '../ThePages/anaSayfa.component.html',
  styleUrls: ['../TheStyles/anaSayfa.component.css']
})
export class AnaSayfaComponent {

  // Constructor to inject the Router for navigation
  constructor(private router: Router) { }

  // Method to navigate to the user login page
  goToPage2(): void {
    this.router.navigate(['/giris']);
  }

  // Method to navigate to the admin login page
  goToAdminGiris(): void {
    this.router.navigate(['/admingiris']);
  }
}

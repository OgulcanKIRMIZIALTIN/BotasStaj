import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { BookingService } from '../booking/booking.service'; // Import the BookingService to add holidays

@Component({
  selector: 'app-anaSayfa',
  templateUrl: '../ThePages/anaSayfa.component.html',
  styleUrls: ['../TheStyles/anaSayfa.component.css']
})
export class AnaSayfaComponent {

  // Constructor to inject the Router for navigation and services for managing holidays
  constructor(
    private router: Router,

  ) { }
  goToPage2(): void {
    this.router.navigate(['/giris']);
  }

  goToAdminGiris(): void {
    this.router.navigate(['/admingiris']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../booking/booking.model';
import { BookingService } from '../booking/booking.service';

@Component({
  selector: 'app-admin',
  templateUrl: '../ThePages/admin.component.html',
  styleUrls: ['../TheStyles/admin.component.css']
})
export class AdminComponent implements OnInit {
  // Array to hold reservations
  reservations: Booking[] = [];

  // Object defining table capacities (table number as key, capacity as value)
  tableCapacities: { [key: number]: number } = {
    1: 4, 2: 4, 3: 4, 4: 8, 5: 4, 6: 4, 7: 6, 8: 6, 9: 6,
    10: 8, 11: 4, 12: 4, 13: 4, 14: 8, 15: 8, 16: 4, 17: 4,
    18: 12, 19: 6, 20: 6, 21: 6, 22: 6, 23: 6, 24: 6
  };

  // Constructor that injects the booking service and router
  constructor(
    private bookingService: BookingService,
    private router: Router
  ) { }

  // Lifecycle hook that triggers when the component initializes
  ngOnInit(): void {
    this.loadReservations(); // Load reservations when the component initializes
  }

  // Method to load reservations by subscribing to the BookingService
  loadReservations(): void {
    this.bookingService.getReservations().subscribe(reservations => {
      this.reservations = reservations; // Populate reservations array with the data received
    });
  }

  // Method to delete a reservation
  deleteReservation(reservation: Booking): void {
    // Confirm deletion with the user
    if (confirm('Bu rezervasyonu silmek istediğinizden emin misiniz?')) {
      // Call the BookingService to delete the reservation
      this.bookingService.deleteReservation(reservation).subscribe(() => {
        // Filter out the deleted reservation from the local reservations array
        this.reservations = this.reservations.filter(r => r !== reservation);
        alert('Rezervasyon başarıyla silindi.'); // Alert the user that the deletion was successful
      });
    }
  }

  // Navigation method to go to the reservation form page
  goToPage3(): void {
    this.router.navigate(['/rezervasyonForm']);
  }

  // Navigation method to go to the main page
  goToPage2(): void {
    this.router.navigate(['/anasayfa']);
  }

  // Navigation method to go to the settings page
  goToAyarlar(): void {
    this.router.navigate(['/ayarlama']);
  }
}

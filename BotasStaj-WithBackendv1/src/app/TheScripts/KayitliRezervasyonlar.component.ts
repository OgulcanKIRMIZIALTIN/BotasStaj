import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../booking/booking.model';
import { BookingService } from '../booking/booking.service';

@Component({
  selector: 'app-kayıtlıRezervasyonlar',
  templateUrl: '../ThePages/kayıtlıRezervasyonlar.component.html',
  styleUrls: ['../TheStyles/kayıtlıRezervasyonlar.component.css']
})
export class KayitliRezervasyonlarComponent implements OnInit {
  reservations: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.bookingService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  goToPage3(): void {
    this.router.navigate(['/rezervasyonForm']);
  }

  goToPage2(): void {
    this.router.navigate(['/anasayfa']);
  }
}

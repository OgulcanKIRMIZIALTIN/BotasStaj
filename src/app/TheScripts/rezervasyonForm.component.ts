import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../booking/booking.model'; // Adjust the path as necessary
import { BookingService } from '../booking/booking.service'; // Adjust the path as necessary
import { SpecialDaysService } from '../services1/special-days.service'; // Adjust the path as necessary

@Component({
  selector: 'app-rezervasyon-form',
  templateUrl: '../ThePages/rezervasyonForm.component.html', // Adjust path if necessary
  styleUrls: ['../TheStyles/rezervasyonForm.component.css']
})
export class RezervasyonFormComponent implements OnInit {
  reservation: Booking = {
    id: null,
    tableNumber: null,
    numPeople: null,
    date: null,
    timePeriod: null,
    description: '',
  };
  availableTables: number[] = [];
  tableCapacities: { [key: number]: number } = {
    1: 4, 2: 4, 3: 4, 4: 8, 5: 4, 6: 4, 7: 6, 8: 6, 9: 6, 10: 8,
    11: 4, 12: 4, 13: 4, 14: 8, 15: 8, 16: 4, 17: 4, 18: 12, 19: 6, 20: 6,
    21: 6, 22: 6, 23: 6, 24: 6
  };

  specialDays: { date: string, reason: string }[] = [];  // Add this line
  maintenanceDays: { date: string }[] = [];  // Add this line
  isDateSelected: boolean = false;  // Add this line

  constructor(
    private bookingService: BookingService,
    private specialDaysService: SpecialDaysService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.loadSpecialDays();  // Add this line
    this.loadMaintenanceDays();  // Add this line
  }

  onSubmit(): void {
    if (this.validateReservation()) {
      this.bookingService.createReservation(this.reservation).subscribe(() => {
        alert('Rezervasyon başarıyla oluşturuldu!');
        this.resetForm();
      });
    }
  }

  onDateChange(): void {
    this.isDateSelected = true;  // Set the flag to true when date is selected
    this.getAvailableTables();  // Optionally fetch available tables when date changes
  }

  validateReservation(): boolean {
    if (!this.reservation.date || !this.reservation.numPeople || !this.reservation.timePeriod || !this.reservation.tableNumber) {
      alert('Lütfen tüm alanları doldurunuz.');
      return false;
    }

    const tableCapacity = this.tableCapacities[this.reservation.tableNumber!];
    if (this.reservation.numPeople! > tableCapacity) {
      alert(`Bu masa en fazla ${tableCapacity} kişiliktir.`);
      return false;
    }

    return true;
  }

  getAvailableTables(): void {
    console.log('Fetching available tables...');
    if (this.reservation.date) {
      const selectedDate = new Date(this.reservation.date);

      // Check if the selected date is a maintenance day
      if (this.isMaintenanceDay(selectedDate)) {
        console.log('Maintenance day detected.');
        this.availableTables = []; // No tables available on maintenance days
      } else {
        console.log('Available on non-maintenance day.');
        // All tables are available on non-maintenance days
        this.availableTables = Object.keys(this.tableCapacities).map(Number);
      }

      console.log('Available tables:', this.availableTables);
    } else {
      this.availableTables = [];
    }
  }

  getTableCapacity(tableNumber: number): number {
    return this.tableCapacities[tableNumber] || 0;
  }

  availableTimePeriods(): string[] {
    // Define the available time periods
    return ['Sabah', 'Öğlen', 'Akşam'];
  }

  isSpecialDay(date: Date): boolean {
    const isSpecial = this.specialDays.some(day => new Date(day.date).toDateString() === date.toDateString());
    console.log('Is Special Day:', isSpecial);
    return isSpecial;
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6; // Sunday or Saturday
    console.log('Is Weekend:', isWeekend);
    return isWeekend;
  }

  isMaintenanceDay(date: Date): boolean {
    const isMaintenance = this.maintenanceDays.some(day => new Date(day.date).toDateString() === date.toDateString());
    console.log('Is Maintenance Day:', isMaintenance);
    return isMaintenance;
  }

  getTablesForWeekday(timePeriod: 'Sabah' | 'Öğlen' | 'Akşam'): number[] {
    console.log('Getting tables for time period:', timePeriod);
    if (timePeriod === 'Akşam') {
      return Object.keys(this.tableCapacities).map(Number); // All tables available in the evening
    } else {
      return []; // No tables available for morning or afternoon on regular weekdays
    }
  }

  resetForm(): void {
    this.reservation = {
      id: null,
      tableNumber: null,
      numPeople: null,
      date: null,
      timePeriod: null,
      description: '',
    };
    this.isDateSelected = false;  // Reset flag when form is reset
  }

  loadSpecialDays(): void {
    this.specialDays = this.specialDaysService.getSpecialDays();  // Fetch special days
  }

  loadMaintenanceDays(): void {
    this.maintenanceDays = this.specialDaysService.getMaintenanceDays();  // Fetch maintenance days
  }

  goToPageAnaSayfa(): void {
    this.router.navigate(['/ana-sayfa']);
  }

  goToPageRezervasyon(): void {
    this.router.navigate(['/kayitli-rezervasyonlar']);
  }
}

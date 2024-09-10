import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../booking/booking.model'; // Adjust the path as necessary
import { BookingService } from '../booking/booking.service'; // Adjust the path as necessary

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
  selectedArea: 'Balcony' | 'Main' | null = null;
  tableCapacities: { [key: number]: number } = {
    1: 4, 2: 4, 3: 4, 4: 8, 5: 4, 6: 4, 7: 6, 8: 6, 9: 6, 10: 8,
    11: 4, 12: 4, 13: 4, 14: 8, 15: 8, 16: 4, 17: 4, 18: 12, 19: 6, 20: 6,
    21: 6, 22: 6, 23: 6, 24: 6
  };
  maintenanceDays: { date: string }[] = [];
  holidaysBoth: any[] = [];
  isDateSelected: boolean = false; // Property to track if a date is selected

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMaintenanceDays();
    this.loadHolidays();
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
    this.isDateSelected = true; // Set to true when date is selected
    this.getAvailableTables(); // Fetch available tables based on the selected date
  }

  onAreaChange(): void {
    this.getAvailableTables(); // Re-fetch tables when area changes
  }

  validateReservation(): boolean {
    if (!this.reservation.date || !this.reservation.numPeople || !this.reservation.timePeriod || !this.reservation.tableNumber || !this.selectedArea) {
      alert('Lütfen tüm alanları doldurunuz.');
      return false;
    }

    if (this.isWeekday(new Date(this.reservation.date!)) && !this.isHoliday(new Date(this.reservation.date!)) && this.reservation.timePeriod !== 'Akşam') {
      alert('Hafta içi ve tatil olmayan günlerde yalnızca "Akşam" rezervasyon yapılabilir.');
      return false;
    }

    const tableCapacity = this.getTableCapacity(this.reservation.tableNumber!); // Call getTableCapacity()
    if (this.reservation.numPeople! > tableCapacity) {
      alert(`Bu masa en fazla ${tableCapacity} kişiliktir.`);
      return false;
    }

    return true;
  }

  getAvailableTables(): void {
    if (this.reservation.date) {
      const selectedDate = new Date(this.reservation.date);

      // Check if the selected date is a maintenance day
      if (this.isMaintenanceDay(selectedDate)) {
        this.availableTables = []; // No tables available on maintenance days
      } else {
        // Filter tables based on the selected area
        if (this.selectedArea === 'Balcony') {
          this.availableTables = [18, 19, 20, 21, 22, 23, 24]; // Balcony tables
        } else if (this.selectedArea === 'Main') {
          this.availableTables = Object.keys(this.tableCapacities)
            .map(Number)
            .filter(table => table >= 1 && table <= 17); // Main restaurant tables
        }
      }

      // Only allow "Akşam" if the date is a weekday and not a holiday
      if (this.isWeekday(selectedDate) && !this.isHoliday(selectedDate)) {
        this.reservation.timePeriod = 'Akşam'; // Automatically set the time period to "Akşam"
      }
    } else {
      this.availableTables = [];
    }
  }

  // Method to get the capacity of a specific table
  getTableCapacity(tableNumber: number): number {
    return this.tableCapacities[tableNumber] || 0;
  }

  // Method to get available time periods for reservation
  availableTimePeriods(): string[] {
    return ['Sabah', 'Öğlen', 'Akşam'];
  }

  // Utility methods
  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  }

  isWeekday(date: Date): boolean {
    return !this.isWeekend(date);
  }

  isHoliday(date: Date): boolean {
    return this.holidaysBoth.some(holiday => new Date(holiday.date).toDateString() === date.toDateString());
  }

  isMaintenanceDay(date: Date): boolean {
    return this.maintenanceDays.some(day => new Date(day.date).toDateString() === date.toDateString());
  }

  loadMaintenanceDays(): void {
    this.bookingService.getMaintenanceDays().subscribe((maintenanceDays: { date: string, area: 'Both' | 'Main' | 'Balcony' }[]) => {
      this.maintenanceDays = maintenanceDays.map(day => ({ date: day.date }));
    });
  }

  loadHolidays(): void {
    this.bookingService.getHolidays().subscribe((holidays: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[]) => {
      this.holidaysBoth = holidays.filter(h => h.area === 'Both' || h.area === this.selectedArea);
    });
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
    this.isDateSelected = false; // Reset the flag when form is reset
  }

  goToPageAnaSayfa(): void {
    this.router.navigate(['/ana-sayfa']);
  }

  goToPageRezervasyon(): void {
    this.router.navigate(['/kayitli-rezervasyonlar']);
  }
}

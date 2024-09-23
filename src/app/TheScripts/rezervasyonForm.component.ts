import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../booking/booking.model';
import { BookingService } from '../booking/booking.service';

@Component({
  selector: 'app-rezervasyon-form',
  templateUrl: '../ThePages/rezervasyonForm.component.html',
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
  availableTables: { tableNumber: number, maxCapacity: number }[] = [];
  allTables: { tableNumber: number, maxCapacity: number }[] = []; // To store all tables loaded from backend
  selectedArea: 'Balcony' | 'Main' | null = null;
  maintenanceDays: { date: string, area: 'Both' | 'Main' | 'Balcony' }[] = [];
  holidays: { date: string, area: 'Both' | 'Main' | 'Balcony' }[] = [];
  isDateSelected: boolean = false;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMaintenanceDays();
    this.loadHolidays();
    this.loadAvailableTables();
  }

  // Handle form submission
  onSubmit(): void {
    if (this.validateReservation()) {
      this.bookingService.createReservation(this.reservation).subscribe(() => {
        alert('Rezervasyon başarıyla oluşturuldu!');
        this.resetForm();
      });
    }
  }

  // Triggered when the date changes
  onDateChange(): void {
    this.isDateSelected = true;
    this.filterAvailableTables();
  }

  // Triggered when the selected area changes
  onAreaChange(): void {
    this.filterAvailableTables();
    this.loadMaintenanceDays();
    this.loadHolidays();
  }

  // Validates the reservation before submission
  validateReservation(): boolean {
    if (!this.reservation.date || !this.reservation.numPeople || !this.reservation.timePeriod || !this.reservation.tableNumber || !this.selectedArea) {
      alert('Lütfen tüm alanları doldurunuz.');
      return false;
    }

    const selectedDate = new Date(this.reservation.date!);

    // Restrict reservations to 'Akşam' on weekdays unless it's a holiday
    if (this.isWeekday(selectedDate) && !this.isHoliday(selectedDate, this.selectedArea!) && this.reservation.timePeriod !== 'Akşam') {
      alert('Hafta içi ve tatil olmayan günlerde yalnızca "Akşam" rezervasyon yapılabilir.');
      return false;
    }

    // Prevent reservations on maintenance days
    if (this.isMaintenanceDay(selectedDate, this.selectedArea!)) {
      alert('Bu gün bakım günü, rezervasyon yapılamaz.');
      return false;
    }

    // Inform if it's a holiday
    if (this.isHoliday(selectedDate, this.selectedArea!)) {
      alert('Bugün tatil, rezervasyon yapılabilir.');
    }

    // Check if the selected table can accommodate the number of people
    const selectedTable = this.availableTables.find(table => table.tableNumber === this.reservation.tableNumber);
    if (selectedTable && this.reservation.numPeople! > selectedTable.maxCapacity) {
      alert(`Bu masa en fazla ${selectedTable.maxCapacity} kişiliktir.`);
      return false;
    }

    return true;
  }

  // Filter available tables based on date and selected area
  filterAvailableTables(): void {
    if (!this.selectedArea) {
      this.availableTables = [];
      return;
    }

    // Initially, set availableTables to allTables loaded from backend
    this.availableTables = this.allTables;

    if (this.reservation.date) {
      const selectedDate = new Date(this.reservation.date);

      // Check if the selected date is a maintenance day
      if (this.isMaintenanceDay(selectedDate, this.selectedArea)) {
        this.availableTables = [];
      } else {
        // Apply area-based filtering on top of the existing tables
        if (this.selectedArea === 'Balcony') {
          this.availableTables = this.availableTables.filter(
            table => table.tableNumber >= 18 && table.tableNumber <= 24
          );
        } else if (this.selectedArea === 'Main') {
          this.availableTables = this.availableTables.filter(
            table => (table.tableNumber >= 1 && table.tableNumber <= 17) || table.tableNumber > 24
          );
        }

        // Automatically set the time period to 'Akşam' for weekdays that are not holidays
        if (this.isWeekday(selectedDate) && !this.isHoliday(selectedDate, this.selectedArea)) {
          this.reservation.timePeriod = 'Akşam';
        }
      }
    }
  }

  // Load available tables from the BookingService
  loadAvailableTables(): void {
    this.bookingService.getTables().subscribe(tables => {
      this.allTables = tables; // Store all tables from the backend
      this.availableTables = this.allTables; // Initially show all tables before filtering
    });
  }

  // Get the maximum capacity of a specific table
  getTableCapacity(tableNumber: number): number {
    const table = this.allTables.find(t => t.tableNumber === tableNumber);
    return table ? table.maxCapacity : 0;
  }

  // Define available time periods
  availableTimePeriods(): string[] {
    return ['Sabah', 'Öğlen', 'Akşam'];
  }

  // Check if a date is on the weekend
  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  // Check if a date is a weekday
  isWeekday(date: Date): boolean {
    return !this.isWeekend(date);
  }

  // Check if a date is a maintenance day
  isMaintenanceDay(date: Date, area: 'Both' | 'Main' | 'Balcony'): boolean {
    const dateString = date.toISOString().split('T')[0];
    return this.maintenanceDays.some(day => day.date === dateString && (day.area === area || day.area === 'Both'));
  }

  // Check if a date is a holiday
  isHoliday(date: Date, area: 'Both' | 'Main' | 'Balcony'): boolean {
    const dateString = date.toISOString().split('T')[0];
    return this.holidays.some(holiday => holiday.date === dateString && (holiday.area === area || holiday.area === 'Both'));
  }

  // Load maintenance days from the BookingService
  loadMaintenanceDays(): void {
    this.bookingService.getMaintenanceDays().subscribe((maintenanceDays: { date: string, area: 'Both' | 'Main' | 'Balcony' }[]) => {
      this.maintenanceDays = maintenanceDays;
    });
  }

  // Load holidays from the BookingService
  loadHolidays(): void {
    this.bookingService.getHolidays().subscribe((holidays: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[]) => {
      this.holidays = holidays;
    });
  }

  // Reset the reservation form to its initial state
  resetForm(): void {
    this.reservation = {
      id: null,
      tableNumber: null,
      numPeople: null,
      date: null,
      timePeriod: null,
      description: '',
    };
    this.isDateSelected = false;
    this.selectedArea = null;
    this.availableTables = this.allTables; // Reset tables to the full list
  }

  // Navigate to the home page
  goToPageAnaSayfa(): void {
    this.router.navigate(['/ana-sayfa']);
  }

  // Navigate to the reservations page
  goToPageRezervasyon(): void {
    this.router.navigate(['/kayitli-rezervasyonlar']);
  }
}

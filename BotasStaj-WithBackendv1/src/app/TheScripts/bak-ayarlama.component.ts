import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../booking/booking.service';

@Component({
  selector: 'app-bak-ayarlama',
  templateUrl: '../ThePages/bak-ayarlama.component.html',
  styleUrls: ['../TheStyles/bak-ayarlama.component.css']
})
export class BakAyarlamaComponent implements OnInit {
  maintenanceDays: { date: string, area: 'Both' | 'Main' | 'Balcony' }[] = [];
  holidays: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[] = [];
  newMaintenanceDay: { area: 'Both' | 'Main' | 'Balcony' } = { area: 'Both' };
  startDate: string | null = null;
  endDate: string | null = null;
  conflictingDays: string[] = [];

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMaintenanceDays();
    this.loadHolidays(); // Load holidays to check for conflicts
  }

  // Method to delete a maintenance day
  deleteMaintenanceDay(date: string, area: 'Both' | 'Main' | 'Balcony'): void {
    if (confirm('Bu bakım gününü silmek istediğinizden emin misiniz?')) {
      this.bookingService.deleteMaintenanceDay(date, area).subscribe(() => {
        this.maintenanceDays = this.maintenanceDays.filter(day => !(day.date === date && day.area === area));
        alert('Bakım günü başarıyla silindi.');
      });
    }
  }

  // Adding maintenance days for a range of dates
  addMaintenanceDayRange(): void {
    if (this.startDate && this.endDate) {
      const dateRange = this.getDateRange(new Date(this.startDate), new Date(this.endDate));
      const conflictingHolidays = this.checkForConflicts(dateRange, 'holiday', this.newMaintenanceDay.area);
      const conflictingMaintenance = this.checkForConflicts(dateRange, 'maintenance', this.newMaintenanceDay.area);

      // Prevent additions if there's any conflict in 'Both' or the specific area
      if (conflictingHolidays.length > 0 || conflictingMaintenance.length > 0) {
        alert(`Çakışma mevcut: ${conflictingHolidays.join(', ')} tatil günleri veya ${conflictingMaintenance.join(', ')} bakım günleri.`);
        return;
      }

      // Add maintenance days for non-conflicting dates
      const validDates = dateRange.filter(date =>
        !conflictingHolidays.includes(date) && !conflictingMaintenance.includes(date)
      );

      validDates.forEach(date => {
        const maintenanceDay = { date, area: this.newMaintenanceDay.area };
        this.bookingService.addMaintenanceDay(maintenanceDay).subscribe(() => {
          this.maintenanceDays.push(maintenanceDay);
        });
      });

      this.resetDateSelection();
    } else {
      alert('Lütfen tarih aralığını seçin.');
    }
  }

  // Method to generate a range of dates between start and end date
  getDateRange(start: Date, end: Date): string[] {
    const dateArray = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dateArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  // Check for conflicts between selected date range and existing holidays or maintenance days
  checkForConflicts(dateRange: string[], type: 'holiday' | 'maintenance', area: 'Both' | 'Main' | 'Balcony'): string[] {
    const conflictingDays: string[] = [];

    dateRange.forEach(date => {
      if (type === 'holiday') {
        const conflict = this.holidays.find(holiday => holiday.date === date);
        if (conflict) {
          // If there's a conflict in 'Both', block the addition for any area
          if (conflict.area === 'Both') {
            conflictingDays.push(date);
          }
          // If the new maintenance is for 'Main' or 'Balcony', check for conflict with 'Both' or same area
          else if (area === 'Both' || conflict.area === area) {
            conflictingDays.push(date);
          }
        }
      } else if (type === 'maintenance') {
        const conflict = this.maintenanceDays.find(day => day.date === date);
        if (conflict) {
          // If there's a conflict in 'Both', block the addition for any area
          if (conflict.area === 'Both') {
            conflictingDays.push(date);
          }
          // If the new maintenance is for 'Main' or 'Balcony', check for conflict with 'Both' or same area
          else if (area === 'Both' || conflict.area === area) {
            conflictingDays.push(date);
          }
        }
      }
    });

    return conflictingDays;
  }

  // Load all maintenance days
  loadMaintenanceDays(): void {
    this.bookingService.getMaintenanceDays().subscribe((maintenanceDays: { date: string, area: 'Both' | 'Main' | 'Balcony' }[]) => {
      this.maintenanceDays = maintenanceDays;
    });
  }

  // Load all holidays
  loadHolidays(): void {
    this.bookingService.getHolidays().subscribe((holidays: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[]) => {
      this.holidays = holidays;
    });
  }

  // Check if a date is already a maintenance day
  isMaintenanceDay(date: Date, area: 'Both' | 'Main' | 'Balcony'): boolean {
    const dateString = date.toISOString().split('T')[0];
    return this.maintenanceDays.some(day =>
      day.date === dateString &&
      (day.area === area || day.area === 'Both') // Handle conflicts with 'Both' or same area
    );
  }

  // Check if a date is already a holiday
  isHoliday(date: Date, area: 'Both' | 'Main' | 'Balcony'): boolean {
    const dateString = date.toISOString().split('T')[0];
    return this.holidays.some(holiday =>
      holiday.date === dateString &&
      (holiday.area === area || holiday.area === 'Both') // Handle conflicts with 'Both' or same area
    );
  }

  // Reset date selection fields
  resetDateSelection(): void {
    this.startDate = null;
    this.endDate = null;
    this.conflictingDays = [];
  }

  // Clear all maintenance days
  clearAllMaintenanceDays(): void {
    if (confirm('Tüm bakım günlerini silmek istediğinizden emin misiniz?')) {
      this.bookingService.deleteAllMaintenanceDays();
      this.maintenanceDays = [];
      alert('Tüm bakım günleri başarıyla silindi.');
    }
  }

  // Clear all special days (maintenance days and holidays)
  clearAllSpecialDays(): void {
    if (confirm('Tüm özel günleri (bakım ve tatil günlerini) silmek istediğinizden emin misiniz?')) {
      this.bookingService.clearAllSpecialDays();
      this.maintenanceDays = [];
      this.holidays = [];
      alert('Tüm bakım ve tatil günleri başarıyla silindi.');
    }
  }

  // Navigation to homepage
  goToPageAnaSayfa(): void {
    this.router.navigate(['/ana-sayfa']);
  }

  // Navigation to admin page
  goToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  goTootherAyarlama(): void {
    this.router.navigate(['/ayarlama']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../booking/booking.service';

@Component({
  selector: 'app-ayarlama',
  templateUrl: '../ThePages/ayarlama.component.html',
  styleUrls: ['../TheStyles/ayarlama.component.css']
})
export class AyarlamaComponent implements OnInit {
  holidays: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[] = [];
  maintenanceDays: { date: string, area: 'Both' | 'Main' | 'Balcony' }[] = [];
  newHoliday: { reason: string, area: 'Both' | 'Main' | 'Balcony' } = { reason: '', area: 'Both' };
  startDate: string | null = null;
  endDate: string | null = null;
  conflictingDays: string[] = [];

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMaintenanceDays();
    this.loadHolidays();
  }

  // Method to delete a holiday
  deleteHoliday(date: string, area: 'Both' | 'Main' | 'Balcony'): void {
    if (confirm('Bu tatili silmek istediğinizden emin misiniz?')) {
      this.bookingService.deleteHoliday(date, area).subscribe(() => {
        this.holidays = this.holidays.filter(holiday => !(holiday.date === date && holiday.area === area));
        alert('Tatil başarıyla silindi.');
      });
    }
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

  // Adding holidays for a range of dates
  addHolidayRange(): void {
    if (this.startDate && this.endDate && this.newHoliday.reason) {
      const dateRange = this.getDateRange(new Date(this.startDate), new Date(this.endDate));
      const conflictingHolidays = this.checkForConflicts(dateRange, 'holiday', this.newHoliday.area);
      const conflictingMaintenance = this.checkForConflicts(dateRange, 'maintenance', this.newHoliday.area);

      if (this.newHoliday.area === 'Both' && (conflictingHolidays.length > 0 || conflictingMaintenance.length > 0)) {
        alert(`Çakışma mevcut: ${conflictingHolidays.join(', ')} tatil günleri veya ${conflictingMaintenance.join(', ')} bakım günleri.`);
        return;
      }

      const validDates = dateRange.filter(date =>
        !conflictingHolidays.includes(date) && !conflictingMaintenance.includes(date)
      );

      validDates.forEach(date => {
        const holiday = { date, reason: this.newHoliday.reason, area: this.newHoliday.area };
        this.bookingService.addHoliday(holiday).subscribe(() => {
          this.holidays.push(holiday);
        });
      });

      this.resetDateSelection();
    } else {
      alert('Lütfen tüm alanları doldurunuz.');
    }
  }

  getDateRange(start: Date, end: Date): string[] {
    const dateArray = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dateArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  checkForConflicts(dateRange: string[], type: 'holiday' | 'maintenance', area: 'Both' | 'Main' | 'Balcony'): string[] {
    const conflictingDays: string[] = [];

    dateRange.forEach(date => {
      if (type === 'holiday') {
        const conflict = this.holidays.find(holiday => holiday.date === date);
        if (conflict && (conflict.area === 'Both' || conflict.area === area)) {
          conflictingDays.push(date);
        }
      } else if (type === 'maintenance') {
        const conflict = this.maintenanceDays.find(day => day.date === date);
        if (conflict && (conflict.area === 'Both' || conflict.area === area)) {
          conflictingDays.push(date);
        }
      }
    });

    return conflictingDays;
  }

  loadMaintenanceDays(): void {
    this.bookingService.getMaintenanceDays().subscribe((maintenanceDays: { date: string, area: 'Both' | 'Main' | 'Balcony' }[]) => {
      this.maintenanceDays = maintenanceDays;
    });
  }

  loadHolidays(): void {
    this.bookingService.getHolidays().subscribe((holidays: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[]) => {
      this.holidays = holidays;
    });
  }

  resetDateSelection(): void {
    this.startDate = null;
    this.endDate = null;
    this.conflictingDays = [];
  }

  // Method to clear all holidays
  clearAllHolidays(): void {
    if (confirm('Tüm tatil günlerini silmek istediğinizden emin misiniz?')) {
      this.bookingService.deleteAllHolidays(); // Call the service to delete all holidays
      this.holidays = []; // Clear the local holidays array
      alert('Tüm tatil günleri başarıyla silindi.');
    }
  }

  // Method to clear all special days (holidays and maintenance days)
  clearAllSpecialDays(): void {
    if (confirm('Tüm özel günleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      this.bookingService.clearAllSpecialDays();
      this.holidays = [];
      this.maintenanceDays = [];
      alert('Tüm özel günler başarıyla silindi.');
    }
  }

  goToPageAnaSayfa(): void {
    this.router.navigate(['/ana-sayfa']);
  }

  goToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  goTootherAyarlama(): void {
    this.router.navigate(['/bak-ayarlama']);
  }
}

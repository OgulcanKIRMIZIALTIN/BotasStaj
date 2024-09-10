import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../booking/booking.service'; // Only using BookingService now

@Component({
  selector: 'app-ayarlama',
  templateUrl: '../ThePages/ayarlama.component.html',
  styleUrls: ['../TheStyles/ayarlama.component.css']
})
export class AyarlamaComponent implements OnInit {
  // For managing user-defined holidays
  holidaysBoth: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[] = [];
  holidaysMain: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[] = [];
  holidaysBalcony: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[] = [];
  newHoliday: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' } = { date: '', reason: '', area: 'Both' };

  // For managing maintenance days
  maintenanceDaysBoth: { date: string, area: string }[] = [];
  maintenanceDaysMain: { date: string, area: string }[] = [];
  maintenanceDaysBalcony: { date: string, area: string }[] = [];
  newMaintenanceDay: { date: string, area: 'Both' | 'Main' | 'Balcony' } = { date: '', area: 'Both' };

  constructor(
    private bookingService: BookingService, // Used for holidays and maintenance days
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load user-defined holidays for both, main, and balcony areas
    this.bookingService.getHolidays().subscribe((holidays: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[]) => {
      this.holidaysBoth = holidays.filter(h => h.area === 'Both');
      this.holidaysMain = holidays.filter(h => h.area === 'Main');
      this.holidaysBalcony = holidays.filter(h => h.area === 'Balcony');
    });

    // Load maintenance days for both, main, and balcony areas
    this.bookingService.getMaintenanceDays().subscribe((maintenanceDays: { date: string, area: string }[]) => {
      this.maintenanceDaysBoth = maintenanceDays.filter(m => m.area === 'Both');
      this.maintenanceDaysMain = maintenanceDays.filter(m => m.area === 'Main');
      this.maintenanceDaysBalcony = maintenanceDays.filter(m => m.area === 'Balcony');
    });
  }



// Method to add a new holiday with conflict checking
addHoliday(): void {
  if (this.newHoliday.date && this.newHoliday.reason) {
    // Check for conflict with maintenance days
    if (this.isMaintenanceDay(this.newHoliday.date)) {
      alert('Bu tarih bir bakım günü olarak zaten belirlenmiş. Lütfen başka bir tarih seçin.');
      return;
    }

    // Fetch current holidays and perform conflict check
    this.bookingService.getHolidays().subscribe(existingHolidays => {
      const alreadyExists = existingHolidays.some(h => h.date === this.newHoliday.date && h.area === this.newHoliday.area);

      if (!alreadyExists) {
        const holidayCopy = { ...this.newHoliday };
        this.bookingService.addHoliday(holidayCopy).subscribe(() => {
          this.updateHolidayList(holidayCopy);
          this.newHoliday = { date: '', reason: '', area: 'Both' }; // Reset form fields
          alert('Bu tarih dolu. Lütfen başka bir tarih seçin.');
        });
      }
    });
  } else {
    alert('Lütfen tüm alanları doldurunuz.');
  }
}


// Helper method to add a new holiday without showing extra alerts
addNewHoliday(): void {
  const holidayCopy = { ...this.newHoliday };
  this.bookingService.addHoliday(holidayCopy).subscribe(() => {
    this.updateHolidayList(holidayCopy);
    this.newHoliday = { date: '', reason: '', area: 'Both' }; // Reset form fields
    // No success alert is shown, silent addition
  });
}

  // Method to add a new maintenance day with conflict checking
  addMaintenanceDay(): void {
    if (this.newMaintenanceDay.date && this.newMaintenanceDay.area) {
      // Check for conflict with holidays
      if (this.isHoliday(this.newMaintenanceDay.date)) {
        alert('Bu tarih bir tatil günü olarak zaten belirlenmiş. Lütfen başka bir tarih seçin.');
        return;
      }

      // Check if the maintenance day already exists
      if (this.isMaintenanceDay(this.newMaintenanceDay.date)) {
        alert('Bu bakım günü zaten var.');
        return;
      }

      const maintenanceDayCopy = { ...this.newMaintenanceDay };
      this.bookingService.addMaintenanceDay(maintenanceDayCopy).subscribe(() => {
        this.updateMaintenanceList(maintenanceDayCopy);
        this.newMaintenanceDay = { date: '', area: 'Both' }; // Reset form fields
        alert('Bakım günü başarıyla eklendi.');
      });
    } else {
      alert('Lütfen tarih ve bölge seçin.');
    }
  }

  // Method to check if the given date is already a maintenance day
  isMaintenanceDay(date: string): boolean {
    return this.maintenanceDaysBoth.some(day => day.date === date) ||
           this.maintenanceDaysMain.some(day => day.date === date) ||
           this.maintenanceDaysBalcony.some(day => day.date === date);
  }

  // Method to check if the given date is already a holiday
  isHoliday(date: string): boolean {
    return this.holidaysBoth.some(holiday => holiday.date === date) ||
           this.holidaysMain.some(holiday => holiday.date === date) ||
           this.holidaysBalcony.some(holiday => holiday.date === date);
  }

  // Method to delete a holiday
  deleteHoliday(date: string, area: 'Both' | 'Main' | 'Balcony'): void {
    if (confirm('Bu tatili silmek istediğinizden emin misiniz?')) {
      this.bookingService.deleteHoliday(date, area).subscribe(() => {
        this.removeHolidayFromList(date, area);
        alert('Tatil başarıyla silindi.');
      });
    }
  }

  // Method to delete a maintenance day
  deleteMaintenanceDay(date: string, area: 'Both' | 'Main' | 'Balcony'): void {
    if (confirm('Bu bakım gününü silmek istediğinizden emin misiniz?')) {
      this.bookingService.deleteMaintenanceDay(date, area).subscribe(() => {
        this.removeMaintenanceFromList(date, area);
        alert('Bakım günü başarıyla silindi.');
      });
    }
  }

  // Clear all user-defined special days (holidays and maintenance days)
  clearAllSpecialDays(): void {
    if (confirm('Tüm özel günleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      this.bookingService.clearAllSpecialDays();
      this.holidaysBoth = [];
      this.holidaysMain = [];
      this.holidaysBalcony = [];
      this.maintenanceDaysBoth = [];
      this.maintenanceDaysMain = [];
      this.maintenanceDaysBalcony = [];
      alert('Tüm özel günler başarıyla silindi.');
    }
  }

  // Helper method to update the holiday lists
  private updateHolidayList(holidayCopy: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }) {
    if (holidayCopy.area === 'Both') {
      this.holidaysBoth.push(holidayCopy);
    } else if (holidayCopy.area === 'Main') {
      this.holidaysMain.push(holidayCopy);
    } else if (holidayCopy.area === 'Balcony') {
      this.holidaysBalcony.push(holidayCopy);
    }
  }

  // Helper method to update the maintenance lists
  private updateMaintenanceList(maintenanceDayCopy: { date: string, area: 'Both' | 'Main' | 'Balcony' }) {
    if (maintenanceDayCopy.area === 'Both') {
      this.maintenanceDaysBoth.push(maintenanceDayCopy);
    } else if (maintenanceDayCopy.area === 'Main') {
      this.maintenanceDaysMain.push(maintenanceDayCopy);
    } else if (maintenanceDayCopy.area === 'Balcony') {
      this.maintenanceDaysBalcony.push(maintenanceDayCopy);
    }
  }

  // Helper method to remove a holiday from the lists
  private removeHolidayFromList(date: string, area: 'Both' | 'Main' | 'Balcony') {
    if (area === 'Both') {
      this.holidaysBoth = this.holidaysBoth.filter(holiday => holiday.date !== date);
    } else if (area === 'Main') {
      this.holidaysMain = this.holidaysMain.filter(holiday => holiday.date !== date);
    } else if (area === 'Balcony') {
      this.holidaysBalcony = this.holidaysBalcony.filter(holiday => holiday.date !== date);
    }
  }

  // Helper method to remove a maintenance day from the lists
  private removeMaintenanceFromList(date: string, area: 'Both' | 'Main' | 'Balcony') {
    if (area === 'Both') {
      this.maintenanceDaysBoth = this.maintenanceDaysBoth.filter(day => day.date !== date);
    } else if (area === 'Main') {
      this.maintenanceDaysMain = this.maintenanceDaysMain.filter(day => day.date !== date);
    } else if (area === 'Balcony') {
      this.maintenanceDaysBalcony = this.maintenanceDaysBalcony.filter(day => day.date !== date);
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
}

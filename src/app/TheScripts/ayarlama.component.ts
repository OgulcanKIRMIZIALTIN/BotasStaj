import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialDaysService } from '../services1/special-days.service'; // Adjust the path as needed

@Component({
  selector: 'app-ayarlama',
  templateUrl: '../ThePages/ayarlama.component.html',
  styleUrls: ['../TheStyles/ayarlama.component.css']
})
export class AyarlamaComponent implements OnInit {
  specialDays: { date: string, reason: string }[] = [];
  maintenanceDays: { date: string }[] = [];
  newSpecialDay: { date: string, reason: string } = { date: '', reason: '' };
  newMaintenanceDay: { date: string } = { date: '' };

  constructor(private specialDaysService: SpecialDaysService, private router: Router) { }

  ngOnInit(): void {
    this.specialDays = this.specialDaysService.getSpecialDays();
    this.maintenanceDays = this.specialDaysService.getMaintenanceDays();
  }

  goToPage2(): void {
    this.router.navigate(['/anasayfa']);
  }
  goToAdmin(): void {
    this.router.navigate(['/admin']);
  }
  addSpecialDay(): void {
    if (this.newSpecialDay.date && this.newSpecialDay.reason) {
      this.specialDaysService.addSpecialDay(this.newSpecialDay);
      this.newSpecialDay = { date: '', reason: '' };
      alert('Özel gün eklendi.');
    } else {
      alert('Lütfen tüm alanları doldurun.');
    }
  }

  addMaintenanceDay(): void {
    if (this.newMaintenanceDay.date) {
      this.specialDaysService.addMaintenanceDay(this.newMaintenanceDay);
      this.newMaintenanceDay = { date: '' };
      alert('Bakım günü eklendi.');
    } else {
      alert('Lütfen tarih girin.');
    }
  }

  deleteSpecialDay(date: string): void {
    if (confirm('Bu özel günü silmek istediğinizden emin misiniz?')) {
      this.specialDaysService.deleteSpecialDay(date);
      alert('Özel gün başarıyla silindi.');
    }
  }

  deleteMaintenanceDay(date: string): void {
    if (confirm('Bu bakım gününü silmek istediğinizden emin misiniz?')) {
      this.specialDaysService.deleteMaintenanceDay(date);
      alert('Bakım günü başarıyla silindi.');
    }
  }
}

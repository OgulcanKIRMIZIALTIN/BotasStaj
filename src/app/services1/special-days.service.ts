import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LinkedList } from '../data-structures/linked-list.model'; // Adjust path as necessary

@Injectable({
  providedIn: 'root'
})
export class SpecialDaysService {
  private specialDaysList = new LinkedList<{ date: string, reason: string }>();
  private maintenanceDaysList = new LinkedList<{ date: string }>();

  private specialDaysSubject = new BehaviorSubject<{ date: string, reason: string }[]>(this.specialDaysList.toArray());
  private maintenanceDaysSubject = new BehaviorSubject<{ date: string }[]>(this.maintenanceDaysList.toArray());

  getSpecialDays(): { date: string, reason: string }[] {
    return this.specialDaysList.toArray();
  }

  getMaintenanceDays(): { date: string }[] {
    return this.maintenanceDaysList.toArray();
  }

  addSpecialDay(day: { date: string, reason: string }): void {
    this.specialDaysList.add(day);
    this.specialDaysSubject.next(this.specialDaysList.toArray());
    this.saveToLocalStorage();
  }

  deleteSpecialDay(date: string): void {
    this.specialDaysList.delete({ date, reason: '' }, (a, b) => a.date === b.date);
    this.specialDaysSubject.next(this.specialDaysList.toArray());
    this.saveToLocalStorage();
  }

  addMaintenanceDay(day: { date: string }): void {
    this.maintenanceDaysList.add(day);
    this.maintenanceDaysSubject.next(this.maintenanceDaysList.toArray());
    this.saveToLocalStorage();
  }

  deleteMaintenanceDay(date: string): void {
    this.maintenanceDaysList.delete({ date }, (a, b) => a.date === b.date);
    this.maintenanceDaysSubject.next(this.maintenanceDaysList.toArray());
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('specialDays', JSON.stringify(this.specialDaysList.toArray()));
    localStorage.setItem('maintenanceDays', JSON.stringify(this.maintenanceDaysList.toArray()));
  }
  isSpecialDay(date: Date): boolean {
    const specialDays = this.getSpecialDays();
    return specialDays.some(day => new Date(day.date).toDateString() === date.toDateString());
  }
  private loadFromLocalStorage(): void {
    const specialDays = JSON.parse(localStorage.getItem('specialDays') ?? '[]');
    const maintenanceDays = JSON.parse(localStorage.getItem('maintenanceDays') ?? '[]');

    specialDays.forEach((day: { date: string, reason: string }) => this.specialDaysList.add(day));
    maintenanceDays.forEach((day: { date: string }) => this.maintenanceDaysList.add(day));

    this.specialDaysSubject.next(this.specialDaysList.toArray());
    this.maintenanceDaysSubject.next(this.maintenanceDaysList.toArray());
  }

  constructor() {
    this.loadFromLocalStorage();
    console.log('Special Days:', this.getSpecialDays());
  }
}

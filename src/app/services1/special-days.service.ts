import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialDaysService {
  // Keys for storing maintenance days and holidays in local storage
  private maintenanceStorageKey = 'maintenanceDays';
  private holidaysStorageKey = 'holidays';

  // BehaviorSubjects to store and update maintenance days and holidays
  private maintenanceDaysSubject = new BehaviorSubject<{ date: string, area: 'Both' | 'Main' | 'Balcony' }[]>([]);
  private holidaysSubject = new BehaviorSubject<{ date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[]>([]);

  constructor() {
    // Load data from local storage when the service is initialized
    this.loadFromLocalStorage();
  }

  // Methods for Maintenance Days

  /**
   * Gets all maintenance days as an Observable.
   */
  getMaintenanceDays(): Observable<{ date: string, area: 'Both' | 'Main' | 'Balcony' }[]> {
    return this.maintenanceDaysSubject.asObservable();
  }

  /**
   * Adds a new maintenance day and saves to local storage.
   */
  addMaintenanceDay(day: { date: string; area: 'Both' | 'Main' | 'Balcony'; }, area: string): Observable<void> {
    const currentDays = this.maintenanceDaysSubject.getValue();
    currentDays.push(day);
    this.maintenanceDaysSubject.next(currentDays);
    this.saveToLocalStorage();
    return of();
  }

  /**
   * Deletes a maintenance day based on date and area, then saves to local storage.
   */
  deleteMaintenanceDay(date: string, area: 'Both' | 'Main' | 'Balcony'): Observable<void> {
    let currentDays = this.maintenanceDaysSubject.getValue();
    currentDays = currentDays.filter(day => !(day.date === date && day.area === area));
    this.maintenanceDaysSubject.next(currentDays);
    this.saveToLocalStorage();
    return of();
  }

  // Methods for Holidays

  /**
   * Gets all holidays as an Observable.
   */
  getHolidays(): Observable<{ date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[]> {
    return this.holidaysSubject.asObservable();
  }

  /**
   * Adds a new holiday and saves to local storage.
   */
  addHoliday(holiday: { date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }): Observable<void> {
    const currentHolidays = this.holidaysSubject.getValue();
    currentHolidays.push(holiday);
    this.holidaysSubject.next(currentHolidays);
    this.saveToLocalStorage();
    return of();
  }

  /**
   * Deletes a holiday based on date and area, then saves to local storage.
   */
  deleteHoliday(date: string, area: 'Both' | 'Main' | 'Balcony'): Observable<void> {
    let currentHolidays = this.holidaysSubject.getValue();
    currentHolidays = currentHolidays.filter(holiday => !(holiday.date === date && holiday.area === area));
    this.holidaysSubject.next(currentHolidays);
    this.saveToLocalStorage();
    return of();
  }

  // Methods to Clear Special Days

  /**
   * Clears all special days (maintenance days and holidays) from local storage.
   */
  clearAllSpecialDays(): void {
    localStorage.removeItem(this.maintenanceStorageKey); // Clear maintenance days
    localStorage.removeItem(this.holidaysStorageKey); // Clear holidays

    // Reset the BehaviorSubjects
    this.maintenanceDaysSubject.next([]);
    this.holidaysSubject.next([]);
    console.log('All special days cleared from local storage.');
  }

  // Methods to Handle Local Storage

  /**
   * Saves the current maintenance days and holidays to local storage.
   */
  private saveToLocalStorage(): void {
    try {
      const maintenanceDays = this.maintenanceDaysSubject.getValue();
      const holidays = this.holidaysSubject.getValue();

      // Save maintenance days
      localStorage.setItem(this.maintenanceStorageKey, JSON.stringify(maintenanceDays));

      // Save holidays
      localStorage.setItem(this.holidaysStorageKey, JSON.stringify(holidays));
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }

  /**
   * Loads the maintenance days and holidays from local storage and updates the BehaviorSubjects.
   */
  private loadFromLocalStorage(): void {
    try {
      // Load and update maintenance days
      const storedMaintenanceDays = localStorage.getItem(this.maintenanceStorageKey);
      if (storedMaintenanceDays) {
        this.maintenanceDaysSubject.next(JSON.parse(storedMaintenanceDays));
      }

      // Load and update holidays
      const storedHolidays = localStorage.getItem(this.holidaysStorageKey);
      if (storedHolidays) {
        this.holidaysSubject.next(JSON.parse(storedHolidays));
      }
    } catch (error) {
      console.error('Error loading from local storage:', error);
    }
  }
}

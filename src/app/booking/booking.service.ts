import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Booking } from './booking.model'; // Import the Booking model

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // Keys for storing maintenance days, holidays, and reservations in local storage
  private maintenanceStorageKey = 'maintenanceDays';
  private holidaysStorageKey = 'holidays';
  private reservationsStorageKey = 'reservations';

  // BehaviorSubjects to store and update maintenance days, holidays, and reservations
  private maintenanceDaysSubject = new BehaviorSubject<{ date: string, area: 'Both' | 'Main' | 'Balcony' }[]>([]);
  private holidaysSubject = new BehaviorSubject<{ date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[]>([]);
  private reservationsSubject = new BehaviorSubject<Booking[]>([]);

  constructor() {
    // Load data from local storage when the service is initialized
    this.loadFromLocalStorage();
  }

  // Methods for Maintenance Days

  getMaintenanceDays(): Observable<{ date: string, area: 'Both' | 'Main' | 'Balcony' }[]> {
    return this.maintenanceDaysSubject.asObservable();
  }

  addMaintenanceDay(day: { date: string; area: 'Both' | 'Main' | 'Balcony'; }): Observable<void> {
    const currentDays = this.maintenanceDaysSubject.getValue();
    currentDays.push(day);
    this.maintenanceDaysSubject.next(currentDays);
    this.saveToLocalStorage();
    return of();
  }

  deleteMaintenanceDay(date: string, area: 'Both' | 'Main' | 'Balcony'): Observable<void> {
    let currentDays = this.maintenanceDaysSubject.getValue();
    currentDays = currentDays.filter(day => !(day.date === date && day.area === area));
    this.maintenanceDaysSubject.next(currentDays);
    this.saveToLocalStorage();
    return of();
  }

  // Methods for Holidays

  getHolidays(): Observable<{ date: string, reason: string, area: 'Both' | 'Main' | 'Balcony' }[]> {
    return this.holidaysSubject.asObservable();
  }

  addHoliday(holiday: { date: string; reason: string; area: 'Both' | 'Main' | 'Balcony'; }): Observable<void> {
    const currentHolidays = this.holidaysSubject.getValue();
    currentHolidays.push(holiday);
    this.holidaysSubject.next(currentHolidays);
    this.saveToLocalStorage();
    return of();
  }

  deleteHoliday(date: string, area: 'Both' | 'Main' | 'Balcony'): Observable<void> {
    let currentHolidays = this.holidaysSubject.getValue();
    currentHolidays = currentHolidays.filter(holiday => !(holiday.date === date && holiday.area === area));
    this.holidaysSubject.next(currentHolidays);
    this.saveToLocalStorage();
    return of();
  }

  // Methods for Reservations

  getReservations(): Observable<Booking[]> {
    return this.reservationsSubject.asObservable();
  }

  createReservation(reservation: Booking): Observable<void> {
    const currentReservations = this.reservationsSubject.getValue();
    reservation.id = currentReservations.length + 1; // Assign a new unique ID
    currentReservations.push(reservation);
    this.reservationsSubject.next(currentReservations);
    this.saveToLocalStorage();
    return of();
  }

  deleteReservation(reservation: Booking): Observable<void> {
    let currentReservations = this.reservationsSubject.getValue();
    currentReservations = currentReservations.filter(r => r.id !== reservation.id);
    this.reservationsSubject.next(currentReservations);
    this.saveToLocalStorage();
    return of();
  }

  // Method to Clear All Special Days

  clearAllSpecialDays(): void {
    localStorage.removeItem(this.maintenanceStorageKey);
    localStorage.removeItem(this.holidaysStorageKey);

    // Reset BehaviorSubjects
    this.maintenanceDaysSubject.next([]);
    this.holidaysSubject.next([]);
    console.log('All special days cleared from local storage.');
  }

  // Methods to Handle Local Storage

  private saveToLocalStorage(): void {
    try {
      const maintenanceDays = this.maintenanceDaysSubject.getValue();
      const holidays = this.holidaysSubject.getValue();
      const reservations = this.reservationsSubject.getValue();

      // Save maintenance days
      localStorage.setItem(this.maintenanceStorageKey, JSON.stringify(maintenanceDays));

      // Save holidays
      localStorage.setItem(this.holidaysStorageKey, JSON.stringify(holidays));

      // Save reservations
      localStorage.setItem(this.reservationsStorageKey, JSON.stringify(reservations));
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }

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

      // Load and update reservations
      const storedReservations = localStorage.getItem(this.reservationsStorageKey);
      if (storedReservations) {
        this.reservationsSubject.next(JSON.parse(storedReservations));
      }
    } catch (error) {
      console.error('Error loading from local storage:', error);
    }
  }
}

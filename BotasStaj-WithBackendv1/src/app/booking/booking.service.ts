import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:9090/api'; // Base URL for the backend API

  // BehaviorSubjects to store and manage data for maintenance days, holidays, reservations, and tables
  private maintenanceDaysSubject = new BehaviorSubject<{ date: string; area: 'Both' | 'Main' | 'Balcony' }[]>([]);
  private holidaysSubject = new BehaviorSubject<{ date: string; reason: string; area: 'Both' | 'Main' | 'Balcony' }[]>([]);
  private reservationsSubject = new BehaviorSubject<Booking[]>([]);
  private tablesSubject = new BehaviorSubject<{ tableNumber: number; maxCapacity: number }[]>([]);

  constructor(private http: HttpClient) {
    // Load data when the service is initialized
    this.loadMaintenanceDays();
    this.loadHolidays();
    this.loadReservations();
    this.loadTables();
  }

  // Methods for Maintenance Days
  getMaintenanceDays(): Observable<{ date: string; area: 'Both' | 'Main' | 'Balcony' }[]> {
    return this.maintenanceDaysSubject.asObservable();
  }

  loadMaintenanceDays(): void {
this.http.get<{ date: string, area: 'Both' | 'Main' | 'Balcony' }[]>(`${this.apiUrl}/maintenanceDays`)
      .pipe(
        tap(maintenanceDays => this.maintenanceDaysSubject.next(maintenanceDays)),
        catchError(error => {
          console.error('Error loading maintenance days:', error);
          return of([]);
        })
      ).subscribe();
  }

  addMaintenanceDay(day: { date: string; area: 'Both' | 'Main' | 'Balcony' }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/maintenanceDays`, day)
      .pipe(
        tap(() => this.loadMaintenanceDays()), // Reload maintenance days after adding
        catchError(error => {
          console.error('Error adding maintenance day:', error);
          return of();
        })
      );
  }

  deleteMaintenanceDay(date: string, area: 'Both' | 'Main' | 'Balcony'): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/maintenanceDays?date=${date}&area=${area}`)
      .pipe(
        tap(() => this.loadMaintenanceDays()), // Reload maintenance days after deletion
        catchError(error => {
          console.error('Error deleting maintenance day:', error);
          return of();
        })
      );
  }

  deleteAllMaintenanceDays(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/maintenanceDays/all`)
      .pipe(
        tap(() => this.loadMaintenanceDays()),
        catchError(error => {
          console.error('Error clearing all maintenance days:', error);
          return of();
        })
      );
  }

  // Methods for Holidays
  getHolidays(): Observable<{ date: string; reason: string; area: 'Both' | 'Main' | 'Balcony' }[]> {
    return this.holidaysSubject.asObservable();
  }

  loadHolidays(): void {
    this.http.get<{ date: string; reason: string; area: 'Both' | 'Main' | 'Balcony' }[]>(`${this.apiUrl}/holidays`)
      .pipe(
        tap(holidays => this.holidaysSubject.next(holidays)),
        catchError(error => {
          console.error('Error loading holidays:', error);
          return of([]);
        })
      ).subscribe();
  }

  addHoliday(holiday: { date: string; reason: string; area: 'Both' | 'Main' | 'Balcony' }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/holidays`, holiday)
      .pipe(
        tap(() => this.loadHolidays()), // Reload holidays after adding
        catchError(error => {
          console.error('Error adding holiday:', error);
          return of();
        })
      );
  }

  deleteHoliday(date: string, area: 'Both' | 'Main' | 'Balcony'): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/holidays?date=${date}&area=${area}`)
      .pipe(
        tap(() => this.loadHolidays()), // Reload holidays after deletion
        catchError(error => {
          console.error('Error deleting holiday:', error);
          return of();
        })
      );
  }

  deleteAllHolidays(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/holidays/all`)
      .pipe(
        tap(() => this.loadHolidays()),
        catchError(error => {
          console.error('Error clearing all holidays:', error);
          return of();
        })
      );
  }

  // Methods for Reservations
  getReservations(): Observable<Booking[]> {
    return this.reservationsSubject.asObservable();
  }

  loadReservations(): void {
    this.http.get<Booking[]>(`${this.apiUrl}/bookings`)
      .pipe(
        tap(reservations => this.reservationsSubject.next(reservations)),
        catchError(error => {
          console.error('Error loading reservations:', error);
          return of([]);
        })
      ).subscribe();
  }

  createReservation(newBooking: Booking): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/bookings`, newBooking)
      .pipe(
        tap(() => this.loadReservations()), // Reload reservations after adding
        catchError(error => {
          console.error('Error creating reservation:', error);
          return of();
        })
      );
  }

  deleteReservation(reservation: Booking): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bookings/${reservation.id}`)
      .pipe(
        tap(() => this.loadReservations()), // Reload reservations after deletion
        catchError(error => {
          console.error('Error deleting reservation:', error);
          return of();
        })
      );
  }

  // Methods for Tables
  getTables(): Observable<{ tableNumber: number; maxCapacity: number }[]> {
    return this.tablesSubject.asObservable();
  }

  loadTables(): void {
    this.http.get<{ tableNumber: number; maxCapacity: number }[]>(`${this.apiUrl}/tables`)
      .pipe(
        tap(tables => this.tablesSubject.next(tables)),
        catchError(error => {
          console.error('Error loading tables:', error);
          return of([]);
        })
      ).subscribe();
  }

  // Clear All Special Days
  clearAllSpecialDays(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/specialDays/all`)
      .pipe(
        tap(() => {
          this.loadMaintenanceDays();
          this.loadHolidays();
        }),
        catchError(error => {
          console.error('Error clearing all special days:', error);
          return of();
        })
      );
  }
}

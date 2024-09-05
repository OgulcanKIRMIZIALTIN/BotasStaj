import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LinkedList } from '../data-structures/linked-list.model'; // Adjust the path as necessary
import { Booking } from './booking.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // Linked list to store reservations
  private reservations: LinkedList<Booking> = new LinkedList();

  // Linked lists to store special days and maintenance days
  private specialDays: LinkedList<{ date: string, reason: string }> = new LinkedList();
  private maintenanceDays: LinkedList<{ date: string }> = new LinkedList();

  constructor() {
    // Initialize with empty linked lists
  }

  /**
   * Retrieves all reservations.
   * @returns An Observable containing an array of all reservations.
   */
  getReservations(): Observable<Booking[]> {
    return of(this.reservations.toArray());
  }

  /**
   * Creates a new reservation.
   * @param newBooking The booking details to be added.
   * @returns An Observable indicating the completion of the operation.
   */
  createReservation(newBooking: Booking): Observable<void> {
    const selectedDate = new Date(newBooking.date!);

    // Check if the date is a maintenance day
    if (this.isMaintenanceDay(selectedDate)) {
      alert('Seçilen tarih bakım günüdür, rezervasyon yapılamaz.');
      return of();
    }

    // Ensure timePeriod is not null before validating
    if (!newBooking.timePeriod || !this.isTimePeriodValid(newBooking.timePeriod, selectedDate)) {
      alert('Geçersiz zaman dilimi seçildi.');
      return of();
    }

    // Check if the booking is valid
    if (this.isBookingValid(newBooking.date!, newBooking.timePeriod!, newBooking.tableNumber!)) {
      const newId = this.generateNewId();
      const reservationWithId: Booking = { ...newBooking, id: newId };
      this.reservations.add(reservationWithId);
      return of();
    } else {
      alert('Seçilen zaman diliminde ve masada zaten bir rezervasyon mevcut.');
      return of();
    }
  }

  /**
   * Checks if a booking is valid based on date and time period.
   * @param date The booking date.
   * @param timePeriod The time period of the booking.
   * @returns True if no conflicting reservation exists, otherwise false.
   */
  isBookingValid(date: string, timePeriod: 'Sabah' | 'Öğlen' | 'Akşam', tableNumber: number): boolean {
    const selectedDate = new Date(date);

    if (this.isMaintenanceDay(selectedDate)) {
      return false;
    }

    // Check for conflicting reservations
    const conflictingReservation = this.reservations.find((reservation: Booking) =>
      reservation.date === date &&
      reservation.timePeriod === timePeriod &&
      reservation.tableNumber === tableNumber
    );

    return !conflictingReservation;
  }

  /**
   * Checks if the date is a special day.
   * @param date The date to check.
   * @returns True if the date is a special day, otherwise false.
   */
  isSpecialDay(date: Date): boolean {
    const dateString = this.formatDate(date);
    return !!this.specialDays.find((day: { date: string }) => day.date === dateString);
  }

  /**
   * Checks if the date is a maintenance day.
   * @param date The date to check.
   * @returns True if the date is a maintenance day, otherwise false.
   */
  isMaintenanceDay(date: Date): boolean {
    const dateString = this.formatDate(date);
    return !!this.maintenanceDays.find((day: { date: string }) => day.date === dateString);
  }

  /**
   * Checks if the date falls on a weekend.
   * @param date The date to check.
   * @returns True if the date is a weekend, otherwise false.
   */
  isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 = Sunday, 6 = Saturday
  }

  /**
   * Checks if the date is a holiday.
   * @param date The date to check.
   * @returns True if the date is a holiday, otherwise false.
   */
  isHoliday(date: Date): boolean {
    const dateString = this.formatDate(date).slice(5); // 'MM-dd' format
    const holidays = ['08-30']; // Example: August 30th as a holiday, add more as needed
    return holidays.includes(dateString);
  }

  /**
   * Validates if the time period is valid based on the date.
   * @param timePeriod The time period to validate.
   * @param date The date to validate against.
   * @returns True if the time period is valid, otherwise false.
   */
  isTimePeriodValid(timePeriod: 'Sabah' | 'Öğlen' | 'Akşam', date: Date): boolean {
    if (this.isSpecialDay(date) || this.isWeekend(date) || this.isHoliday(date)) {
      return ['Sabah', 'Öğlen', 'Akşam'].includes(timePeriod); // Allow all periods on special days, weekends, and holidays
    } else {
      return timePeriod === 'Akşam'; // Only evening period is valid on regular weekdays
    }
  }

  /**
   * Retrieves all special days.
   * @returns An Observable containing an array of special days.
   */
  getSpecialDays(): Observable<{ date: string, reason: string }[]> {
    return of(this.specialDays.toArray());
  }

  /**
   * Adds a new special day.
   * @param day The special day to add.
   * @returns An Observable indicating the completion of the operation.
   */
  addSpecialDay(day: { date: string, reason: string }): Observable<void> {
    this.specialDays.add(day);
    return of();
  }

  /**
   * Deletes a special day based on the date.
   * @param date The date of the special day to delete.
   * @returns An Observable indicating the completion of the operation.
   */
  deleteSpecialDay(date: string): Observable<void> {
    this.specialDays.delete(
      { date, reason: '' },
      (a, b) => a.date === b.date
    );
    return of();
  }

  /**
   * Retrieves all maintenance days.
   * @returns An Observable containing an array of maintenance days.
   */
  getMaintenanceDays(): Observable<{ date: string }[]> {
    return of(this.maintenanceDays.toArray());
  }

  /**
   * Adds a new maintenance day.
   * @param day The maintenance day to add.
   * @returns An Observable indicating the completion of the operation.
   */
  addMaintenanceDay(day: { date: string }): Observable<void> {
    this.maintenanceDays.add(day);
    return of();
  }

  /**
   * Deletes a maintenance day based on the date.
   * @param date The date of the maintenance day to delete.
   * @returns An Observable indicating the completion of the operation.
   */
  deleteMaintenanceDay(date: string): Observable<void> {
    this.maintenanceDays.delete(
      { date },
      (a, b) => a.date === b.date
    );
    return of();
  }

  /**
   * Deletes a reservation.
   * @param reservation The reservation to delete.
   * @returns An Observable indicating the completion of the operation.
   */
  deleteReservation(reservation: Booking): Observable<void> {
    this.reservations.delete(
      reservation,
      (a, b) => a.id === b.id // Assuming `id` is used to uniquely identify reservations
    );
    return of();
  }

  /**
   * Generates a new unique ID for a reservation.
   * @returns A new unique ID.
   */
  private generateNewId(): number {
    const existingIds = this.reservations.toArray().map(res => res.id!);
    return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  }

  /**
   * Formats a date as a string in the format 'yyyy-MM-dd'.
   * @param date The date to format.
   * @returns The formatted date string.
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}

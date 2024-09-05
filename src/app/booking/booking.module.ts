import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookingService } from './booking.service'; // Ensure this path is correct

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BookingService
  ],
  exports: []
})
export class BookingModule { }

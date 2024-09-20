import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookingService } from './booking.service';
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

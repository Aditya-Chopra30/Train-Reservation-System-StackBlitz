import { Component } from '@angular/core';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seats: any[] = [];
  bookedSeats: number[] = [];
  requestedSeats: number = 0;

  constructor(private bookingService: BookingService) {
    this.seats = this.bookingService.getSeats();
  }

  bookSeats() {
    if (this.requestedSeats <= 7 && this.requestedSeats > 0) {
      this.bookedSeats = this.bookingService.bookSeats(this.requestedSeats);
    }
  }

  // Get seat status (booked or available)
  getSeatStatus(seat: any) {
    return seat.booked ? 'booked' : 'available';
  }
}

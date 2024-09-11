import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  seats: Array<{ id: number, booked: boolean }> = [];

  constructor() {
    // Initialize 80 seats and mark some seats as pre-booked (1-25 are booked in your scenario)
    for (let i = 1; i <= 80; i++) {
      if (i <= 37) {
        this.seats.push({ id: i, booked: true });  // Seats 1-25 are booked
      } else {
        this.seats.push({ id: i, booked: false });
      }
    }
  }

  // Method to book seats with priority to book them in one row
  bookSeats(requestedSeats: number): number[] {
    let bookedSeats: number[] = [];
    let seatsLeftToBook = requestedSeats;

    // First, try to book all requested seats in one row
    for (let row = 0; row < 11; row++) {
      const start = row * 7;  // Get the starting index of each row
      const rowSeats = this.seats.slice(start, start + 7);

      // Find available seats in this row
      const availableSeats = rowSeats.filter(seat => !seat.booked);

      // If the row has enough available seats for the request
      if (availableSeats.length >= seatsLeftToBook) {
        availableSeats.slice(0, seatsLeftToBook).forEach(seat => {
          this.seats[seat.id - 1].booked = true;
          bookedSeats.push(seat.id);
        });
        return bookedSeats; // Return as booking is completed in one row
      }
    }

    // If it's not possible to book all in one row, book nearby seats across rows
    for (let row = 0; row < 11; row++) {
      const start = row * 7;
      const rowSeats = this.seats.slice(start, start + 7);
      const availableSeats = rowSeats.filter(seat => !seat.booked);

      if (availableSeats.length > 0) {
        availableSeats.slice(0, seatsLeftToBook).forEach(seat => {
          this.seats[seat.id - 1].booked = true;
          bookedSeats.push(seat.id);
        });
        seatsLeftToBook -= availableSeats.length;  // Decrease remaining seats to book
      }

      if (seatsLeftToBook <= 0) {
        return bookedSeats;
      }
    }

    // Handle the last row (3 seats)
    if (seatsLeftToBook > 0) {
      const lastRowSeats = this.seats.slice(77, 80);
      const availableSeats = lastRowSeats.filter(seat => !seat.booked);

      availableSeats.slice(0, seatsLeftToBook).forEach(seat => {
        this.seats[seat.id - 1].booked = true;
        bookedSeats.push(seat.id);
      });
    }

    return bookedSeats;
  }

  // Method to get all seats
  getSeats() {
    return this.seats;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  seatArrangement: number[][] = [...Array(11)].map(() => Array(7).fill(0));

  // Function to check if the required number of seats are available together in one row
  checkSeatsAvailable(numSeats: number): number[] | null {
    for (let row = 0; row < this.seatArrangement.length; row++) {
      for (
        let i = 0;
        i < this.seatArrangement[row].length - numSeats + 1;
        i++
      ) {
        const seats = this.seatArrangement[row].slice(i, i + numSeats);
        if (seats.every((seat) => seat === 0)) {
          return seats.map((_, index) => row * 7 + i + index + 1);
        }
      }
    }
    return null; // Return null if required seats are not available together
  }

  // Function to reserve the seats
  reserveSeats(seats: number[]): void {
    for (const seat of seats) {
      const row = Math.floor((seat - 1) / 7);
      const col = (seat - 1) % 7;
      this.seatArrangement[row][col] = seat; // Reserve the seat by marking it with the seat number
    }
  }

  // Function to display the seat arrangement
  displaySeatArrangement(): number[][] {
    return this.seatArrangement;
  }

  // Function to handle the reservation process
  reserve(numSeats: number): void {
    const seats = this.checkSeatsAvailable(numSeats);
    if (seats) {
      this.reserveSeats(seats);
      alert(`Seats ${seats.join(', ')} have been reserved.`);
    } else {
      alert('Seats are not available together in one row.');
    }
  }
}

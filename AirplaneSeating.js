const {isValid2dArray, isValidPassengers} = require('./helper/validator.js');

 class AirplaneSeating {
   
  constructor(seats, passengers = 0) {
    this.seats = this.createSeats(seats);
    this.passengers = isValidPassengers(passengers);
    this.remainingPassengers = this.passengers;
    this.assignedSeats = this.seats;
  }

  nextSeatNumber = 1;

  createSeats(input) {
    if (!isValid2dArray(input)) {
      throw new Error('Invalid seat input. Expected 2d array of numbers.');
    }
    const maxColumns = Math.max(...input.map(arr => arr[1]));
    let seats = [];
    for (let colI = 0; colI < maxColumns; colI++) {
      let block = [];

      input.forEach(arr => {
        const row = arr[0];
        let col = arr[1];

        for (let i = 0; i < row; i++) {
          if (col - colI > 0) {
            block.push('seat');
          } else {
            block.push('empty');
          }
        }
        block.push('aisle');
      });
      block = block.slice(0, -1);
      seats.push(block);
    }
    // console.log(seats)
    return seats;
  }

  get autoAssignedSeats() {
    this.assignAllSeats();
    return {
      seats: this.assignedSeats,
      remainingPassengers: this.remainingPassengers?this.remainingPassengers:0,
    };
  }

  assignAllSeats() {
    // Assign aisle seats first
    this.asignAisleSeats();
    // then assign window seats
    this.assignWindowSeats();
    // then assign middle seats
    this.asignMiddleSeats();
  }

  asignAisleSeats() {
    let seats = [...this.seats];

    seats.forEach((row, rowI) => {
      row.forEach((seat, seatI) => {
        if (this.remainingPassengers < 1) {
          return;
        }
        if (seatI > 0 && seatI < row.length) {
          if (seat === 'seat' && (row[seatI - 1] === 'aisle' || row[seatI + 1] === 'aisle')) {
            seats[rowI][seatI] = this.nextSeatNumber;
            this.nextSeatNumber++;
            this.remainingPassengers--;
          }
        }
      });
    });
    this.assignedSeats = seats;
  }

  assignWindowSeats() {
    let seats = [...this.seats];

    seats.forEach((row, rowI) => {
      row.forEach((seat, seatI) => {
        if (this.remainingPassengers < 1) {
          return;
        }
        if (seat === 'seat' && (seatI === 0 || seatI === row.length - 1)) {
          seats[rowI][seatI] = this.nextSeatNumber;
          this.nextSeatNumber++;
          this.remainingPassengers--;
        }
      });
    });
    this.assignedSeats = seats;
  }

  asignMiddleSeats() {
    let seats = [...this.seats];

    seats.forEach((row, rowI) => {
      row.forEach((seat, seatI) => {
        if (this.remainingPassengers < 1) {
          return;
        }
        if (
          seat === 'seat' &&
          !(
            seatI === 0 ||
            seatI === row.length - 1 ||
            row[seatI - 1] === 'aisle' ||
            row[seatI + 1] === 'aisle'
          )
        ) {
          seats[rowI][seatI] = this.nextSeatNumber;
          this.nextSeatNumber++;
          this.remainingPassengers--;
        }
      });
    });
    this.assignedSeats = seats;
  }
}

module.exports = AirplaneSeating;
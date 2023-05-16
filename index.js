
const AirplaneSeating =  require('./AirplaneSeating');
const prompt = require("readline-sync");

module.exports.createAirplaneSeating = () => {
  console.log(" AIRPLANE SEATING ALGORITHM  ✈️ ")
  let  inputSeats = prompt.question("Enter 2D array rows and columns : ")
  const inputPassengers = prompt.question("Enter number of passengers  waiting in queue : ")
  let inputs = inputSeats.substr(0, inputSeats.length - 1).substr(1).split(',').map((item) => parseInt(item.replace("[", '').replace("]", '')));
  const newArr = []
  while (inputs.length) newArr.push(inputs.splice(0, 2));
    inputSeats = newArr;
  const airplane = new AirplaneSeating(inputSeats,
    inputPassengers?parseInt(inputPassengers):30);
    const seatingData = airplane.autoAssignedSeats;
    console.log(seatingData)
}

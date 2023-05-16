const _throwError = function (message) {
  throw new Error(message);
}

// const chunkArray = (arr) => { 
//  var chunkSize = parseInt(arr.length / 2);
//   arr = arr.substr(0, arr.length - 1).substr(1).split(',').map((item) => parseInt(item.replace("[", '').replace("]", '')));
//   var chunkLength = 4;
//   var chunks = [];
//    for (var i = 0; i < chunkSize; i++) {
//          if(chunkLength*(i+1)<=arr.length)chunks.push(arr.slice(chunkLength*i, chunkLength*(i+1)));
//      }
//   return chunks; 
  
// }
  // Validate input is 2D array of non-negative integers
const isValid2dArray = (input, optCondition, ...optConParams) => {
    if (
      !(
      input.length > 0 &&
      input.constructor === Array &&
      input[0][0] &&
      input[0].constructor === Array
    )
  ) {
    return false;
   }
  //  console.log("OptCondition",optCondition);
  if (optCondition) {
    return input.every(
      arr =>
        arr.length === 2 &&
        arr.every(number => isNonNegativeInteger(number)) &&
        optCondition(arr[0], arr[1], ...optConParams),
    );
  }
  return input.every(arr => arr.length === 2 && arr.every(number => isNonNegativeInteger(number)));
}

const isNonNegativeInteger = input =>  Number.isInteger(input) && input >= 0;

 const isRowsAndColsLessThan = (rows, cols, rowNumber, colNumber) => rows && cols ? rows<rowNumber && cols<colNumber : false;

const isValidPassengers = input =>   isNonNegativeInteger(input) ? input : _throwError('Invalid passenger input. Must be a non-negative number.')

module.exports ={isNonNegativeInteger,isValid2dArray,isValidPassengers,isRowsAndColsLessThan}
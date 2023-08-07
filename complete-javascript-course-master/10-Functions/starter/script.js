"use strict";
const bookings = [];
const createBooking = function(
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price
  };
  console.log(booking);
  bookings.push(booking);
};

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);
// createBooking('LH123', undefined, 1000);

const flight = "LH234";
const jonas = {
  name: "Jonas Smith",
  passport: 23467879978
};

const checkIn = function(flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;
  if (passenger.passport === 23467879978) {
    alert("Checked In");
  } else {
    alert("Wrong Passport !");
  }
};
// checkIn(flight,jonas);

// console.log(flight);
// console.log(jonas);
const passportLib = new Set();
const newPassport = function(person) {
  var checkNRep = true;
  while (checkNRep) {
    let numTempPass = Math.trunc(Math.random()) * 1000000000000;
    if (!passportLib.has(numTempPass)) {
      passportLib.add(numTempPass);
      person.passport = numTempPass;
      checkNRep = false;
    }
  }
};

const oneWord = function(str) {
  return str.replace(/ /g, "").toLowerCase();
};
const upperFirstWord = function() {
  const [first, ...other] = str.split(" ");
  return [first.toUpperCase(), ...other].join(" ");
};
const transformer = function(str, fn) {
  console.log(`Original Function: ${str}`);
  console.log(`Transfromed string: ${fn(str)}`);
  console.log(`transformed by: ${fn.name}`);
};
const high5 = function() {
  console.log("👋");
};
document.body.addEventListener("click", high5);

const greet = function(greeting) {
  return function(tile, name) {
    return function(age) {
      console.log(`${greeting} ${tile} ${name} ${age}`);
    };
  };
};
const greets = greeting => (tile, name) => age =>
  console.log(`${greeting} ${tile} ${name} ${age}`);
greets("Hello")("Mr", "Henry")(35);
const lufthansa = {
  airline: "lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this
        .iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}` });
  }
};
const eurowings = {
  airline: "eurowings",
  iataCode: "EW",
  bookings: []
};
const book = lufthansa.book;
const swiss = {
  airline: "Swiss Airline",
  iataCode: "LX",
  bookings: []
};
const flightData = [536, "George Cooper"];
book.call(eurowings, 23, "Sarah William");
book.call(lufthansa, 234, "Mary Cooper");
// console.log(eurowings);
// console.log(lufthansa);
book.call(swiss, ...flightData);
// BIND methods
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);

bookEW(23,"Lucis Nahan");
const bookEW23 = book.bind(eurowings,23);
bookEW23("kim Han")

lufthansa.planes = 300;
lufthansa.buyPlane = function(){
  console.log(this);
  this.planes++;
  console.log(this.planes);
}
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))
// partial application 
const addTax = (rate, value)=>value +value*rate
// console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(100));
const addTaxRate = function(rate){
  return function(value){
    return value + value* rate;
  }
}
const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));


// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the 
  array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. 
The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. 
If type is 'array', simply display the results array as it is, using console.log(). 
This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/


const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer(){
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);
    // Register Answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
   
   
  },
  displayResult(type='array'){
    if (type ==='array'){
      console.log(this.answers);
    }else if (type === 'string'){
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }

  }
 };
document.querySelector('.poll').addEventListener('click',poll.registerNewAnswer.bind(poll) )

poll.displayResult.call({answers:[5,2,4]}, )


// CLOSURE 
let f;
const g = function(){
  const a = 23;
  f = function(){
    console.log(a*2);
  }
}
const h = function () {
  const b = 223;
  f = function () {
    console.log(b * 2);
  };
};
// g();f();
// console.dir(f);
// h();
// f();
// console.dir(f);
const boardPassenger = function(n , wait){
  const perGroup = n/3;
  setTimeout(function(){
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait*1000);
  console.log(`Will start boarding in ${wait} seconds`);



};

const perGroup = 1000;
boardPassenger(120,2);
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/


(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function(){
    header.style.color= 'blue';
  });

})();

'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const openingHours = {
  thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // ES6 enhanced object literals
  openingHours,
  order(starterIndex, mainIndex){
    return[this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({starterIndex=1, mainIndex = 0,time ='20:00', address}){
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },
  
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
    orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
const orderSet = new Set([
   'Pasta',
   'Pizza',
    'Pizza',
    'Risotto', 
]);
// console.log(orderSet);
// console.log(orderSet.size);
// console.log(orderSet.has('Pizza'));
// orderSet.add('Bread');
// orderSet.delete('Risotto');
// orderSet.delete('Risotto');
// console.log(orderSet);

// console.log(restaurant.openingHours?.mon?.open);

// const days = ['mon','tue','wed','thu','fri','sat','sun'];
// for (const day of days ){
//   console.log(day);
//   const open = restaurant.openingHours[day]?.open || 'closed'
//   console.log(`On ${day} we open at ${open}`);
// }


// console.log(restaurant.order?.(0,1) ?? 'Method does not Exist')
// console.log(restaurant.orderRisotto?.(0,1) ?? 'Method does not Exist');


// const users = [{name:'Jonas', email:'hello@jonas.io'}];
// console.log(users[0]?.name ?? 'User array empty');
// if (users.length>0) console.log(users[0].name);
// else console.log('User array empty If function');
// const properties = Object.keys(openingHours);
// // console.log(properties);
// let openStr =  `We are open pn ${properties.length} days: `;
// for (const day of properties){
//   openStr += `${day}, `;
// }
// console.log(openStr);
// const values = Object.values(openingHours)
// // console.log(values);


// const entries = Object.entries(openingHours);
// console.log(entries);

// for(const [key,{open,close}] of entries){
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }






const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
const [player1, player2] = game.players;
// console.log(player1, player2);

const [gk, ...fieldPlayers] = player1;
// console.log(fieldPlayers);
// .4
const players1Final = [...player1, 'Thiago', 'Coutinho', 'Periscic']
const {odds:{team1, x:draw, team2}} = game
// console.log(team1, draw, team2);

const printGoals = function(...players){
  console.log(players);
  console.log(`${players.length} goals were scored`);
};
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

// const events = [...new Set(gameEvents.values())];
// console.log(events);
// gameEvents.delete(64);
// console.log(gameEvents);
// const time = [...gameEvents.keys()].pop();
// console.log(`An event happened, on average, every ${time/gameEvents.size}  minutes`);
// for (const [min, event] of gameEvents){
//   if (min <= 45){
//   console.log(`[$HALF] ${min}: ${event}`);
//   }
// }

// code challenger #1
// printGoals('Davies', 'Muller', 'Lewandowski', 'kimchi');
// printGoals('Davies', 'Muller')
// printGoals(...game.scored)

// team1 < team2 && console.log('Team 1 is more likely to win the game');
// for(const player of player1) console.log(player);
// for(const player of player1){

// // }

// for (const [goal, player] of game.scored.entries()){
//   console.log(`Goal ${goal +1}: ${player}`);
// }
// let average = 0;
// const odds = Object.values(game.odds)
// for(const odd of odds){
//   average +=odd;}

// average /= odds.length;
// console.log(average);
// for (const [team, odd] of Object.entries(game.odds)){
//   const teamStr = team ==='x' ? 'draw':`victory ${game[team]}`;
//   console.log(`Odd of ${teamStr} ${odd}`);
// }

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")

2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/


const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, "java"],
  [2, 'python'],
  [3,'JavaScript'],
  ['Correct', 3],
  [true, 'Correct'],
  [false, 'Try Again']
]);
// console.log(question.get('question'));
for (const [key,value] of question){
  if(typeof key === 'number'){
    // console.log(`Answer ${key} : ${value}`);
  }
}
// const answer = Number(prompt('Your Answer'));
// console.log(answer);
// console.log(question.get(question.get('correct') === answer));
// converse map to 🚡 
// console.log([...question]);
// console.log(question.entries());

// Coding Challenge #4
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
document.querySelector('button').addEventListener('click', function(){
    const text = document.querySelector('textarea').value;
    const rows = text.split('\n');
    for (const [i, row] of rows.entries()){
      const[first, second] = row.toLowerCase().trim().split('_');
      const output = `${first}${second.replace(second[0],second[0].toUpperCase())}`;
    
    console.log(`${output.padEnd(20)}${'✅'.repeat(i+1)}`);
    }

});




// const camelCase = function(underscore){
//   arr = underscore.replaceAll(' ', '').split('_');
  

// }

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

const checkMiddleSeat = function(seat){
  //B and E are middle seats
  const s = seat.slice(-1);
  if (s=== 'B' || s==='C'){
    console.log('You goty middle seat ');
  }else{
    console.log('You goty lUcky');
  }
}

const checkBaggage = function(items){
  const baggage = items.toLowerCase();
  if(baggage.includes('knife') || baggage .includes('gun'))
      console.log('You are Not Allow to on board');
  else{
    console.log('Welcome aboard');
  }
}



const [firstName, lastName] = "Jonas Smith".split(' ');
// console.log(firstName,lastName);
const capitalizeName = function(name){
  const names = name.split(' ');
  const namesUppercase = []
  for(name of names){
     namesUppercase.push( name[0].toUpperCase() + name.slice(1));
      
  }
  console.log(namesUppercase);
}
// capitalizeName('jessica ohn luis peter');
// capitalizeName('john smiths');

const message = " Go to gate 23 ";
// console.log(message.padStart(23,"+").padEnd(30,'+'));
// console.log(' Jonas '.padStart(23,"+").padEnd(30,"+"));

const maskCreditCard = function(number){
  const str = String(number);
  const last  = str.slice(-4);
  return last.padStart(str.length,"*");

}

// flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)
const getCode = str => str.slice(0,3).toUpperCase();
const flightDisplay = function(flights){
for (const flight of flights.split('+')) {
  const [event, from, to, time] = flight.split(';');
  const outPut = `${event.startsWith('_Delayed') ? '🔴' : ''}${event.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
  console.log(outPut);
}
}

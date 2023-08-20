'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--deposit ${type}"> ${
      i + 1
    }</div>
          <div class="movements__value">${mov} $</div>
        </div> 
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);
// console.log(accounts);
const calcDislayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} $`;
};
const calcDisplaySumary = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const expands = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * account.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income} $`;
  labelSumOut.textContent = `${expands} $`;
  labelSumInterest.textContent = `${interest} $`;
};

// calcDislayBalance(account1.movements);

// calcDisplaySumary(account1.movements);

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUserNames(accounts);
const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDislayBalance(acc);
  calcDisplaySumary(acc);
};
// Event Handle
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    updateUI(currentAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  console.log(amount, receiverAcc);
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    //UPDATE UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index, 1);
    //HIde UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

/////////////////////////////////////////////////
let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice());
// console.log([...arr]);
// SPLICE
arr.splice(1, 2);
// console.log(arr);
//REVERSE is mutate
const arr2 = ['g', 'h', 'j', 'k', 'l'];

// CONCAT
const letter = arr.concat(arr2);
// console.log(letter);
// console.log([...arr,...arr2]);
//JOIN
// LOOP
/*
for (const item of items){

}
items.foreach(function(item){
  
})
*/

const checkDogs = function (dogsJulia, dogsKate) {
  const dogOnlyJulia = dogsJulia.slice();
  dogOnlyJulia.splice(0, 1);
  dogOnlyJulia.splice(-2);
  const allDogs = dogOnlyJulia.concat(dogsKate);
  // console.log(allDogs);
  allDogs.forEach(function (age, i) {
    if (age >= 5) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
const eurToUsd = 1.1;
const movementsUSD = movements.map(mov => mov * eurToUsd);
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
const withdrawals = movements.filter(mov => mov < 0);

const balance = movements.reduce((acc, cur) => acc + cur, 0);
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);
// console.log(movements);
// console.log(movementsUSD);
// console.log(movementsUSDfor);
// console.log(movementsDescriptions);
// console.log(deposits);
// console.log(withdrawals);
// console.log(balance);
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. 
This time, they want to convert dog ages to human
 ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', 
which accepts an arrays of dog's ages ('ages'),
 and does the following things in order:

1. Calculate the dog age in human years using the following formula:
 if the dog is <= 2 years old, humanAge = 2 * dogAge.
  If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human 
years old (which is the same as keeping dogs that 
  are at least 18 years old)
3. Calculate the average human age of all adult
 dogs (you should already know from other challenges
   how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const calAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);
// console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
//SOME
// console.log(movements);
// console.log(movements.includes(-130));
const anyDeposit = movements.some(mov => mov > 0);
// console.log(anyDeposit);
//EVERy
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));
const deposit = mov => mov > 0;
// console.log(movements.every(deposit));
arr = [[1, 2, 3], [4, 5, 6], [7, 8], 9, 10];
// console.log(arr.flat()); // one level deep to the array
const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
const allMovements = accountMovements.flat();
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

// flat map replace for map().flat()
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance, overalBalance2);
// sort method in array is converse all element in array to strings anh sort 🇮🇹

// console.log(
//   movements.sort((a, b) => {
//     if (a > b) return 1; // return > 0 A, B keep order:
//     if (b > a) return -1; // return < 0 B, A switch order:
//   })
// );
// Fill
arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 2, 6);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8));
const x = new Array(7);
// Array.from
const y = Array.from({ length: 7 }, () => 1);
const z = Array.from({ length: 7 }, (_, i) => i + 1);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('$', ''))
  );
  console.log(movementsUI);
});

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
// console.log(bankDepositSum);
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov > 1000).length;
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// console.log(accounts.flatMap(acc => acc.movements).filter(mov => mov >=1000 ));
// console.log(numDeposits1000);
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

// console.log(sums);
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const expections = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (expections.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};
// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));
////////////////////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, 
 calculate the recommended food portion and add it to the object as a new property. 
 Do NOT create a new array, simply loop over the array.
 Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array,
 and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') 
and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: 
"Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:


GOOD LUCK 😀
*/
const recommendedFoodCal = function (weight) {
  return Math.trunc(weight ** 0.75 * 28);
};

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => (dog.recommendedFood = recommendedFoodCal(dog.weight)));
console.log(dogs);
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating ${
    dogSarah.recommendedFood > dogSarah.curFood ? 'too litle' : 'too much'
  }`
);
const ownersEatTooMuch = dogs
  .filter(dog => dog.recommendedFood < dog.curFood)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => dog.recommendedFood > dog.curFood)
  .flatMap(dog => dog.owners);
console.log(dogs.some(dog => dog.recommendedFood === dog.curFood));
const checkEatOkay = dog =>
  dog.recommendedFood * 0.9 < dog.curFood &&
  dog.curFood < dog.recommendedFood * 1.1;
console.log(dogs.some(checkEatOkay));
const dogEatOkayFood = dogs.filter(checkEatOkay);
console.log(dogEatOkayFood);
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);
const dogsSorted = dogs.slice().sort((a,b)=> a.curFood-b.curFood);
console.log(dogsSorted);

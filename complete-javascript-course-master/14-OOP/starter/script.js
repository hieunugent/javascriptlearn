'use strict';
/*
1. OOP is a programming paradigm based on the concept of object
2. we use objects to model real-world or abstract feature :
3. Objects may contain data adn code. by using object s, we pack data and the corresponding behavior into one block 
4. in OOP, objects are self-contained pieces/blocks of code 
5. Objects are building blocks of applications, and interact with one another 
6. Interactions happen through a public interface (API) : methods that the code outside of the object can access and use to communicate with the object
7. OOP was developed with the goal of organizing code , to make it more flexible and easier to maintain 
using class to create as many instant as needed 
8. four function that is fundamentals principle of OOP : 
Abstraction: Ignoring  or hiding details that don't matter, allowing us to get an overview perspective of the thing we're implementing ,
Encapsulation: keeping properties and method s private inside the class , so they are not accessible form outside the class. some methods can be exposed as a public API- external code can not manipulate the internal code, isolate the internal with external code
Inheritance: parent class inherit by others. making all properties and methods of a certain class available to a child class. forming a hierarchical relationship between classes. this allows us to reuse common logic and to model real-world relationships
Polymorphism: a child class can overwrite a method it inherit from a parent class.
*/

const Person = function(fullName, birthYear){
   this.fullName = fullName;
   this.birthYear = birthYear;
   // never create method inside function
   /*
    this.calcAge = function(){
        console.log(2037 - this.birthYear);
    }
   */ 
}
const jonas = new Person('Jonas',1991);
const jay = "jay"
// console.log(jonas);
//1. new() is created  
//2. function is called this = {}
//3. {} linked to property
//4. function automatically return {}
// console.log(jonas instanceof person);
// console.log(jay instanceof person);
//prototypes 
Person.prototype.calcAge = function(){
    console.log(2023-this.birthYear);
}
//jonas.calcAge();

// console.log(jonas.__proto__ === Person.prototype);

// console.log(Person.prototype.isPrototypeOf(jonas));
//.prototypeOfLinkedObjects

Person.prototype.species = "Homo Sapiens";
// console.log(jonas.species);
// console.log(jonas.hasOwnProperty("firstName"));
/*
the new operator :(how it work with function constructors and ES6 classes)
an empty object is created 
this keyword in constructor function call is set to the new object 
the new object is linked (__proto__property) to the constructor function's prototype property
the new object is returned from the constructor function call

*/
// console.log(jonas.__proto__.__proto__);
// console.log(jonas.__proto__.__proto__.__proto__);

// Add new method to prototype: Should not do this because nee JS version may have same method with different function, or in the big team will do the same method which will break your code later
const arr = [1,2,3,4,5,6,4,5,6,4,5,6,7,8 ,9];
Array.prototype.unique = function(){
    return [...new Set(this)];
}
// console.log(arr.unique());
///////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
// Object 

//
const Car = function (make, speed){
    this.make = make;
    this.speed = speed;
}
Car.prototype.accelerate = function(){
    this.speed +=10;
    console.log(`${this.name} is going at speed ${this.speed}`);
}
Car.prototype.break = function(){
    this.speed -=5;
    console.log(`${this.name} is going at speed ${this.speed}`);
}
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 90);

// class expression
// const PersionCl = class{}
// class declaration 
class PersionCl{
    constructor(fullname, birthYear){
        this.fullname = fullname;
        this.birthYear = birthYear;
    }
    // methods will be add to .prototype property
    calcAge(){
        console.log(2023 - this.birthYear);
    }
    set fullname (name) {
        if (name.includes(' ')){
            this._fullName = name;
        }else{
            alert(`${name} is not fullname`)
        }
    }
    get fullname(){
        return this._fullName;
    }
    static hey(){
        console.log('Hey There ✋');
        console.log(this);
    }
}
Person.hey = function(){
     console.log('Hey There ✋');
     console.log(this);
}
const jessica = new PersionCl('Jessica Wall', 1996);
jessica.calcAge()

PersionCl.prototype.greet = function(){
    console.log(`Hey ${this.fullname}`);
}
// jessica.greet();
// 1. classes are not Hoisted
// 2. class are first class citizens
// 3. classes are executed in strict mode
// SETTER AND GETTER

const account = {
    owner: 'Jonas',
    movements : [200,530,120,300],
    get latest(){
        return this.movements.slice(-1).pop();
    },
    set latest(mov){
        this.movements.push(mov)
    }
}
// console.log(account.latest);
account.latest = 50;
// console.log(account.movements);
// Person.hey();
// PersionCl.hey();
const PersonProto = {

    calcAge(){
        console.log(2023 - this.birthYear);
    },
    init(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
}
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'steven';
steven.birthYear = 2003;
steven.calcAge();
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
class CarCL {
    constructor(make, speed){
 this.make = make;
 this.speed = speed;
    }

accelerate() {
  this.speed += 10;
  console.log(`${this.name} is going at speed ${this.speed}`);
}
break() {
  this.speed -= 5;
  console.log(`${this.name} is going at speed ${this.speed}`);
}
get speedUS(){
    return this.speed/1.6;
}
set speedUS(speed){
    this.speed = speed *1.6;
}
};

const ford = new CarCL('FORD',120);
console.log(ford.speed);
console.log(ford.speedUS);



// Inheritance Person 
const Student = function(fullName, birthYear, course){
    Person.call(this, fullName,birthYear);
    this.course = course;
}
//linking prototype 
Student.prototype = Object.create(Person.prototype)


Student.prototype.introduce = function(){
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
}
const mike = new Student('Mike', 2011, 'Computer Science');
// mike.calcAge();
//////////////////////////////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
const EV = function(make,speed, charge){
    Car.call(this, make,speed);
    this.charge = charge;
};
EV.prototype = Object.create(Car.prototype)
EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
}
EV.prototype.accelerate = function () {
  this.speed +=20;
  this.charge--;
  console.log(`${this.make} is going at ${this.speed} km/h, with charge of ${this.charge}`);
};


// inheritance class 

class StudentCl extends PersionCl{
    constructor(fullName, birthYear, course){
        super(fullName, birthYear);
        this.course = course;
    }
    introduce(){
        console.log(`My Name is ${this.fullname}, and I study ${this.course}`);
    }
    calcAge(){
        console.log(
          `I'm ${
            2023 - this.birthYear
          } years old, but as a student i feel more like ${
            2023 - this.birthYear +10
          } `
        );
    }
}


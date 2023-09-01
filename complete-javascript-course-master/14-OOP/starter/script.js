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

const person = function(firstName, birthYear){
   this.firstName = firstName;
   this.birthYear = birthYear;
   // never create method inside function
   /*
    this.calcAge = function(){
        console.log(2037 - this.birthYear);
    }
   */ 
}
const jonas = new person('Jonas',1991);
const jay = "jay"
console.log(jonas);
//1. new() is created  
//2. function is called this = {}
//3. {} linked to property
//4. function automatically return {}
console.log(jonas instanceof person);
console.log(jay instanceof person);
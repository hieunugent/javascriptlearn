'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/* 

most code is synchronous 
synchronous code is executed line by line
each line of code waits for previous line to finish
Asynchronous code is executed  after a task that run in the background finishes;
Asynchronous code is non-blocking 
Execution doesn't wait for an asynchronous task to finish its wordBreak: 
Callback functions alone do not make code asynchronous 

AJAX
Asynchronous JS And XML: allow us to communicate with remote web servers 
in an asynchronous way. With AJAX calls, we can request data from web 
servers dynamically 
Application Programming Interface: Piece of software that can be used by 
another piece of software, in order to allow application to talk to each 
other;
There are be many types of APIs on web development: DOM API, Geolocation 
API
https://countries-api-836d.onrender.com/countries/


What is promiseS?
    Promise: an Object that is used as a placeholder for the future result of an asynchronous opreration 
    Promise a container for an asynchrously delivered value 
    promise a container for a fulture value 
    we no longer need to reply on events and callbacks passed into asynchronous functions to handle asynchronous resuls 
    instead of nesting callbacks, we can chain promises for a sequence asynchronous operations: 
    escaping callback hell 
The promise LifeCycle:

*/
///////////////////////////////////////
const renderCountry = function (data, className = '') {
  const [currency] = Object.keys(data.currencies);
  const [language] = Object.keys(data.languages);
  const html = `
         <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} M. people</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[language]
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[currency].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbor = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);
    //Get Neighbor country
    const [...neighbors] = data.borders;
    if (!neighbors) return;

    console.log(neighbors);
    neighbors.forEach(neighbor => {
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
      request2.send();
      request2.addEventListener('load', function () {
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2, 'neighbour');
      });
    });
  });
};
// getCountryAndNeighbor('china');
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (res) {
//       console.log(res);
//       return res.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };
const getJSON = function(url){

}
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res =>{ 
      console.log(res);
      // if (!res.ok){
      //   throw new Error(`Country not Found (${res.status})`)
      // }
      return res.json()})
    .then(data => {
      renderCountry(data[0]);
      const [...neighbors] = data[0].borders;
      console.log(neighbors);
      if (!neighbors) return;
      // country 2

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbors[0]}`);
    })
    .then(res => res.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(`${err}🔖 🌖`);
      renderError(`Something went wrong 🤯 🤯 ${err} Try again!`);
    }).finally(()=>{
      console.log('Ending call ');
    });
};

btn.addEventListener('click', function () {
  getCountryData('china');
});
getCountryData("hongkong")
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

*/
///////////////////////////////////////

const getCountryData = function(country){
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
request.send();
request.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText);
  const currency = Object.keys(data.currencies)[0]
  const language = Object.keys(data.languages)[0]
  
  const html = `
         <article class="country">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} M. people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[language]}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[currency].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
});
}
getCountryData('vietnam');
getCountryData('usa');
getCountryData('british')
getCountryData('spain')
getCountryData('germany');

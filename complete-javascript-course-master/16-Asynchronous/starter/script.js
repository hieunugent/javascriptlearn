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
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not Found')
    .then(data => {
      renderCountry(data[0]);
      const [...neighbors] = data[0].borders;
      console.log(neighbors);
      if (!neighbors) throw new Error('No neighbor found!');
      // country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbors[0]}`,
        'Country Not Found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(`${err}🔖 🌖`);
      renderError(`Something went wrong 🤯 🤯 ${err} Try again!`);
    })
    .finally(() => {
      console.log('Ending call ');
    });
};
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res =>{
//       console.log(res);
//       // if (!res.ok){
//       //   throw new Error(`Country not Found (${res.status})`)
//       // }
//       return res.json()})
//     .then(data => {
//       renderCountry(data[0]);
//       const [...neighbors] = data[0].borders;
//       console.log(neighbors);
//       if (!neighbors) return;
//       // country 2

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbors[0]}`);
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(`${err}🔖 🌖`);
//       renderError(`Something went wrong 🤯 🤯 ${err} Try again!`);
//     }).finally(()=>{
//       console.log('Ending call ');
//     });
// };

// btn.addEventListener('click', function () {
//   // do nothing now
//   whereAmI();
// });
// // challenger 1:
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI =async function (lat, lng) {
//  getPosition().then(pos => {
//     const { lat= latitude, lng= longitude } = pos.coords;

//   });
//   const url =
//     `https://google-maps-geocoding.p.rapidapi.com/geocode/json?latlng=${lat}%2C${lng}&language=en`;

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': "",
// 		'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
// }

// const imgContainer = document.querySelector('.images')
//  const createImage = function(imgPath){
//   return new Promise(function(resolve, reject){
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', function(){
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function(){
//       reject(new Error('Image not Found'))
//     });

//   });
//  }
//  const wait = function (ms) {
//    return new Promise(resolve => setTimeout(resolve, ms*1000))
//  };
//   let currentImg
//  createImage('img/img-1.jpg').then(img => {
//    currentImg = img;
//    console.log('Image 1 loaded');
//    return wait(2);
//  }).then(()=>{
//   currentImg.style.display = 'none';
//   return createImage('img/img-2.jpg')

//  }).then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//  }).then(()=> {
//   currentImg.style.display = 'none';
//  }).catch(err => console.error(err));

// (async function () {
//   try {
//     console.log('this is try statement');
//   } catch (err) {
//     console.error('this is error');
//   }
//   console.log('after the try catch ');
// })();
// Promise All work as paralel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    const data  = await Promise.all(
      [getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),]
    );
    console.log(data.map(d => String(d[0].capital)));
    // console.log(data1.capital, data2.capital, data3.capital);
  } catch (err) {
    console.error(err);
  }
};
get3Countries('portugal', 'canada', 'vietnam')

// Promise.race same as all but each promise will race with one another then 
const timeout = function(sec){
  return new Promise(function (_, reject){
    setTimeout(function(){
      reject(new Error('Request Took to long!'));
    }, sec*1000)
  })
}
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/vietnam`),
  timeout(5),
]).then(res => console.log(res[0])).catch(err => console.log(err))
// Promise.allSettled
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res)).catch(err => console.error(err))
// Promise.any 

Promise.any([
  Promise.resolve('success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
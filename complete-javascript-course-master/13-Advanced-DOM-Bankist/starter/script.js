'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log(allSections);
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// console.log(document.getElementsByClassName('btn'));
// creating and insert element
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookie for improve functionality and analytics.';
message.innerHTML =
  'We use cookie for improve functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';
// message is live element only appear in one place
// header.prepend(message);
header.append(message);
// header.before(message)
// header.after(message)
// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
//STyles
message.style.backgroundColor = '#37382d';
message.style.width = '120%';

// can not  log in to style like we set and create
// because this is inline program code

// console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');
// for standard
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo);
// for non-standard // using the getAttribute
const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));
// data attribute 
// console.log(logo.dataset.versionNumber);
// Classes 
// logo.classList.add('c','j');
// logo.classList.remove('c','j');
// logo.classList.toggle('c');d
// logo.classList.contains('c');
// console.log(logo.classList);

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (x/y)',window.pageXOffset,window.pageYOffset);
  console.log('height/width viewport', document.documentElement.clientHeight,document.documentElement.clientWidth)
  window.scrollTo(s1coords);
})
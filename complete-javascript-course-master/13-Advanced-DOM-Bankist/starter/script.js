'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//TAP Components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

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

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // window.scrollTo(
  //   {left: s1coords.left + window.pageXOffset,
  //   top:  s1coords.top + window.pageYOffset,
  //   behavior:"smooth"
  // }
  // );
  section1.scrollIntoView({ behavior: 'smooth' });
});
// page navigation
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   })
// })
//1. add event listener to common parent element
//2/ determine what elemenet originated the event
// MATCHING STRATEGY
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// // const header = document.querySelector('.header');
// // const allSections = document.querySelectorAll('.section');
// // console.log(allSections);
// // document.getElementById('section--1');
// // const allButtons = document.getElementsByTagName('button');
// // // console.log(allButtons);
// // console.log(document.getElementsByClassName('btn'));
// // creating and insert element
// // .insertAdjacentHTML
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookie for improve functionality and analytics.';
// message.innerHTML =
//   'We use cookie for improve functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';
// // message is live element only appear in one place
// // header.prepend(message);
// header.append(message);
// // header.before(message)
// // header.after(message)
// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });
// //STyles
// message.style.backgroundColor = '#37382d';
// message.style.width = '120%';

// // can not  log in to style like we set and create
// // because this is inline program code

// // console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// const logo = document.querySelector('.nav__logo');
// // for standard
// // console.log(logo.alt);
// // console.log(logo.src);
// // console.log(logo.className);
// // console.log(logo);
// // for non-standard // using the getAttribute
// const link = document.querySelector('.nav__link--btn');
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

// const h1 = document.querySelector('h1');
// // this is new way to do
// const alertH1 = h1.addEventListener('mouseenter', function () {
//   alert('addEventlistener: reading the heading');

//   // only want to listen even one do remove the even here
//   h1.removeEventListener('mouseenter', alertH1);
// });
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// this is old way to do
// h1.onmouseenter =function(){
//   alert('addEventlistener: reading the heading')
// }
// create randome color rgb(255,255,255)
// the even listener is happen at the root the travel down this target
// and buble up so it on so happen at this parents
// so its even at the child parent also be affected

// const randomInt  =(min,max) => Math.floor(Math.random() * (max -min +1)+min);
// const randomColor = ()=> `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`
// // console.log(randomColor());
// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();

//   // stop propagation: so it is nolonger effect their parent
//   // e.stopPropagation();

// });
// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
// });
// TRAVERSING DOM
const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'white';

h1.closest('h1').style.background = 'var(--gradient-primary:)';
// going sideways siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

// this is not good practice because it will slowdown the page
// tabs.forEach(t => t.addEventListener('click',()=> console.log('TAB')));
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  clicked.classList.add('operations__tab--active');
  // Active content area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// Menu fade animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(this, e.currentTarget);
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


const header = document.querySelector('.header');
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entries);
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-40px',
});
headerObserver.observe(header);
// reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//Lazy Load images
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

// slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

  const gotoSlice = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else curSlide++;
    gotoSlice(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    gotoSlice(curSlide);
    activateDot(curSlide);
  };
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const init = function () {
    gotoSlice(0);

    createDots();

    activateDot(0);
  };
  init();
  // next slice
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    console.log(e);
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset.slide;
      gotoSlice(slide);
      activateDot(slide);
    }
  });
};
slider();
// Sticky navigation

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function(e){
//   console.log(window.scrollY);
//  if(this.window.scrollY > initialCoords.top){
//   nav.classList.add('sticky');

// }else{
//   nav.classList.remove('sticky');
// }
// });
// Sticky Navigation: intersection Observer API:
// const obsCallback = function(entries, observer){
//     entries.forEach(entry=> {
//       console.log(entry);
//     })
// }
// const  obsOptions = {
//   root:null,
//   rootMargin:"0.0px",
//   threshold:[0,0.2]
// };
// const observer = new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);
document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML parsed and DOM tree build!', e);
});
window.addEventListener('load', function(e){
  console.log('window is fully loaded', e);
});
// only use when the page is need to save before living
// window.addEventListener('beforeunload', function(e){
//   e.preventDefault();
//   console.log(e);
//   e.returnValue='';
// });
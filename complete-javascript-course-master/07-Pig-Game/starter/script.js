'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current1El = document.querySelector('#current--1');
const current0El = document.querySelector('#current--0');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold =document.querySelector('.btn--hold');


// helping function 


let scores =[0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// starting condition 
const reset = function (){
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    document.querySelector(".player--1").classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');



}

reset();
const switchPlayer = function () {
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   document
     .querySelector(`.player--${activePlayer}`)
     .classList.toggle('player--active');

   activePlayer = activePlayer === 0 ? 1 : 0;
   document
     .querySelector(`.player--${activePlayer}`)
     .classList.toggle('player--active');
    currentScore = 0;
 };
btnRoll.addEventListener('click', function(){
    if(playing){
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
    //add score to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
    switchPlayer();
    }}
    
});
//check dice one 

// hold the score 
btnHold.addEventListener('click', function(){
    // add score to player 
    if(playing){
        scores[activePlayer] += currentScore;
    // winning condition 
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
        playing = false
    }else{
             switchPlayer();

    }}
    // switch player 
})
btnNew.addEventListener('click', function(){
    reset();
})





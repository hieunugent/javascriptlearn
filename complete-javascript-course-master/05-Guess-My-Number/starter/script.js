'use strict';
let actualValue = Math.trunc(Math.random()*20) + 1;
let score = 20
let highscore = 0;
document.querySelector('.check').addEventListener('click', function(){
    const guess = document.querySelector('.guess').value;
    
    console.log(typeof guess)
    if (score >1){
    if (! guess ){
        document.querySelector('.message').textContent = 'No Number is Enter !';    
    }
    else if(Number(guess) < actualValue){
        document.querySelector('.message').textContent ='Too Low';
        score--;
        document.querySelector('.score').textContent = score;
    }
    else if(Number(guess) > actualValue){
        document.querySelector('.message').textContent ='Too Hight';
        score--;
        document.querySelector('.score').textContent = score;
    }
    else{
        document.querySelector('.message').textContent ="Correct !!!";
        document.querySelector('.number').textContent = guess;
        document.querySelector('body').style.backgroundColor="#60b347";
        document.querySelector('.number').style.width = '30rem';
        if (highscore < score){
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    }
    }
    else {
        document.querySelector('.message').textContent = 'you Lose!'; 
        score = 0
        document.querySelector('.score').textContent = score;
 
    }
    
})
document.querySelector('.again').addEventListener('click', function(){
    actualValue = Math.trunc(Math.random()*20) + 1;
    document.querySelector('.guess').value='';
    document.querySelector('.message').textContent ='Start Guessing...';
    document.querySelector('.score').textContent = 20;
    document.querySelector('.number').textContent='?';
    document.querySelector('body').style.backgroundColor="#222";
    document.querySelector('.number').style.width = '15rem';    

})
let timerId;
let posId;
const timing = document.querySelector('.timer');
const ball = document.querySelector('.ball');
const totalScore = document.querySelector('.score').lastElementChild;
const gameBoard = document.querySelector('.game-board');
let isStarted = false;
let gameEnd = false;
let ballWidth = ball?.clientWidth;
let ballHeight = ball?.clientHeight;
let width = (gameBoard?.clientWidth - (ballWidth));
let height = (gameBoard?.clientHeight - (ballHeight));
const dropdown = document.querySelector('h2');
const sign = document.querySelector('.sign');
const prevScore = document.querySelector('.prevScore');

const list =document.querySelector('ol');
const scoreList = document.querySelector('.highscore');

dropdown.addEventListener('click', function(){
    list.classList.toggle('hide');
    sign.classList.toggle('turn');
})

let times;

let posX;
let posY;

let score = 0;
let lastScore;

let highscoresList = []
highscoresList = JSON.parse(localStorage.getItem('score'));
if(highscoresList == null) {
    highscoresList = [{user:"anas", score:32}];
}
storeScore();


function changePos() {
    posX = Math.floor(Math.random()*width) + 26;
    posY = Math.floor(Math.random()*height) + 26;
    
    ball.style.top = posY.toString() + 'px';
    ball.style.left = posX.toString() + 'px';    
}

function storeScore() {
    localStorage.setItem('score', JSON.stringify(highscoresList));
    let scores = JSON.parse(localStorage.getItem('score'));
    console.log(scores);
    if(scores != null) {
        list.innerHTML = scores.map( score =>{
            if(score.user == null || score.user.trim() =='') score.user = "anonymous"
            return `<li>${score.user} <strong>${score.score}</strong></li>`;
        }).join("");
    }
}


function timer() {
    times = 30;
    
    function startTimer() {

        times -= 0.01;
        timing.textContent = times.toFixed(1).toString().padStart(3,0).concat('s');
        // gameRunning = true;
        if(times < 0.01) {
            isStarted = false;
            secondClick = true;
            clearInterval(timerId);
            clearInterval(posId);
            scoreList.classList.remove('hide')

            if(!gameEnd) {
                let username = window.prompt("enter username: ");
                gameEnd = true;
                prevScore.textContent = lastScore;

                let user = {
                    score : lastScore,
                    user : username
                }
    
                highscoresList = JSON.parse(localStorage.getItem('score'));
                highscoresList.push(user);
                highscoresList.sort((a,b)=>b.score - a.score)
                storeScore();
            }
            

        }
    }

    function resetTime() {
        gameEnd = false;
        times = 30;
        timing.textContent = times.toFixed(1).toString().concat('s');
        ball.style.top = "50%";
        ball.style.left = "50%"; 
    }

    return {startTimer, resetTime}
}

const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');

const time = timer();

time.startTimer();


startButton.addEventListener('click', function(){
    if(!isStarted){
        scoreList.classList.add('hide');
        secondClick = false;
        changePos();
        timerId = setInterval(time.startTimer, 10);
        posId = setInterval(changePos, 1500);
        isStarted = true;
    }else {
        console.log('The time has been started!');
    }
})

stopButton.addEventListener('click', function(){
    scoreList.classList.remove('hide')
    clearInterval(timerId);
    clearInterval(posId);
    isStarted = false;
    secondClick = true;
})

resetButton.addEventListener('click', function(){
    scoreList.classList.remove('hide')
    clearInterval(timerId);
    clearInterval(posId);
    isStarted = false;
    time.resetTime();
    score = 0;
    currX = 0;
    currY = 0;
    totalScore.textContent = 0;
})


let secondClick = false;

ball.addEventListener('click', function(){
    if(!secondClick && isStarted && !gameEnd) {
        secondClick = true;
        setTimeout(()=>{
        score += 1;
        lastScore = score;
        totalScore.textContent = score;
        secondClick = false;
        },250)  
    }      
})


let timerId;
let posId;
const timing = document.querySelector('.timer');
const ball = document.querySelector('.ball');
const totalScore = document.querySelector('.score').lastElementChild;
const gameBoard = document.querySelector('.game-board');
let isStarted = false;
let ballWidth = ball?.clientWidth;
let ballHeight = ball?.clientHeight;
let width = (gameBoard?.clientWidth - (ballWidth / 2));
let height = (gameBoard?.clientHeight - (ballHeight / 2));
let times;

let posX;
let posY;

let score = 0;

function changePos() {
    posX = Math.floor(Math.random()*width) + 26;
    posY = Math.floor(Math.random()*height) + 26;

    ball.style.top = posY.toString() + 'px';
    ball.style.left = posX.toString() + 'px';    
}


function timer() {
    times = 30;

    function startTimer() {
        times -= 0.01;
        timing.textContent = times.toFixed(1).toString().padStart(3,0).concat('s');
        if(times < 0.01) {
            isStarted = false;
            secondClick = true;
            clearInterval(timerId);
            clearInterval(posId);
        }
    }

    function resetTime() {
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
        secondClick = false;
        timerId = setInterval(time.startTimer, 10);
        posId = setInterval(changePos, 1500);
        isStarted = true;
    }else {
        console.log('The time has been started!');
    }
})

stopButton.addEventListener('click', function(){
    clearInterval(timerId);
    clearInterval(posId);
    isStarted = false;
    secondClick = true;
})

resetButton.addEventListener('click', function(){
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
    console.log(isStarted);
    console.log(secondClick);
    if(!secondClick && isStarted) {
        secondClick = true;
        setTimeout(()=>{
        score += 1;
        totalScore.textContent = score;
        secondClick = false;
        },250)  
    }      
})


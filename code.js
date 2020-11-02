
const newGame = document.querySelector('.newgame');
const highScoreBoard = document.querySelector('.highscore p');
const scoreBoard = document.querySelector('.score p');
const levelBoard = document.querySelector('.level p');
const game = document.querySelector('.game');
const windows = document.querySelectorAll('.window');
const enemyes = document.querySelectorAll('.enemy');
const blood = document.querySelector('.blood');

let lastWindow;
let gameDuration = 30000;
let enemyKilled = false;
let score = 0;
let timeIsOwer = true;
let myTimeout;
let level = 1;
//Listeners
newGame.addEventListener('click', startGame);
game.addEventListener('click', (e) => {
    // console.log(e.target);
    checkShoot(e);
});

//Functions
function getRandomTime(min = 600, max = 1500) {
    return Math.round(Math.random() * (max - min) + min) - 100 * level;
}

function getRandomWindow() {
    const rnd = Math.floor(Math.random() * windows.length);
    const randomWindow = windows[rnd];
    if (randomWindow === lastWindow) {
        return getRandomWindow();
    }
    lastWindow = randomWindow;
    return randomWindow;
}

function showEnemy() {
    const time = getRandomTime();
    const window = getRandomWindow();
    enemyKilled = false;
    window.classList.add('up');
    setTimeout(() => {
        window.classList.remove('up');
        if (timeIsOwer === false ) {
            showEnemy();
        }
    }, time);
}

function hideAllEnemyes() {
    windows.forEach((window) => {
        window.classList.remove('up');
    });
}

function checkShoot(e) {
    if (!e.isTrusted) return;
    if (e.target.classList.contains('enemy') && enemyKilled === false) {
        score++;
        scoreBoard.textContent = `Current score: ${score}`;
        showBlood(e);
        enemyKilled = true;
        if(score % 5 === 0) {
            levelUp();
            console.log(level);
        }
    }
}

function showBlood(e) {
    console.log('Nice shoot');
    blood.style.top = e.clientY - 35 + 'px';
    blood.style.left = e.clientX - 35 + 'px';
    setTimeout(() => {
        blood.style.top = '-100px';
        blood.style.left = '-100px';
    }, 400);
}

function setHighScore() {
    if(!localStorage.highscore) {
        localStorage.setItem('highscore', score);
        console.log(highScore);
    } else if(localStorage.highscore < score) {
        localStorage.highscore = score;
    } 
}

function showHighScore() {
    let msg = `Highscore: ${localStorage.highscore}`;
    highScoreBoard.textContent = msg;
}

function levelUp() {
    level++;
    let msg = `Level: ${level}`;
    levelBoard.textContent = msg;
}

function startGame() {
    clearTimeout(myTimeout);
    hideAllEnemyes();
    setHighScore();
    showHighScore();
    score = 0;
    level = 1;
    scoreBoard.textContent = `Current score: 0`;
    levelBoard.textContent = `Level: 1`;
    timeIsOwer = false;
    showEnemy();
    myTimeout = setTimeout(() => {
        enemyKilled = true;
        timeIsOwer = true;
        scoreBoard.textContent = `Time is ower. You score is ${score}`;
        setHighScore();
    }, gameDuration)
}

setHighScore();
showHighScore();
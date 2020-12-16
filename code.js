
const newGame = document.querySelector('.newgame');
const highScoreBoard = document.querySelector('.highscore p');
const scoreBoard = document.querySelector('.score p');
const levelBoard = document.querySelector('.level p');
const settingsBoard = document.querySelector('.settings-board');
const settingsButton = document.querySelector('.settings img');
const saveSettingsButton = document.getElementById('save-settings');
const resetHighScoreButton = document.getElementById('reset-highscore');
const setDuration = document.getElementById('game-duration');
const setEnemy = document.getElementById('enemy_name');
const game = document.querySelector('.game');
const windows = document.querySelectorAll('.window');
const enemyes = document.querySelectorAll('.enemy');
const blood = document.querySelector('.blood');

let lastWindow;
let gameDuration = 30000;
let enemyKilled = false;
let score = 0;
let timeIsOwer = true;
let gameIsStarted = false;
let myTimeout;
let level = 1;
let enemyName;
//Listeners
newGame.addEventListener('click', startGame);
game.addEventListener('mousedown', (e) => {
    checkShoot(e);
});
settingsButton.addEventListener('click', (e) => {
    settingsBoard.style.top = e.clientY + 'px';
    settingsBoard.style.left = e.clientX - 200 + 'px';
});
saveSettingsButton.addEventListener('click', saveSettings);
resetHighScoreButton.addEventListener('click', resetHighScore);

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
        if (timeIsOwer === false) {
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
        if (score % 5 === 0) {
            levelUp();
        }
    }
}

function showBlood(e) {
    blood.style.top = e.clientY - 35 + 'px';
    blood.style.left = e.clientX - 35 + 'px';
    setTimeout(() => {
        blood.style.top = '-100px';
        blood.style.left = '-100px';
    }, 400);
}

function setHighScore() {
    if (!localStorage.highscore) {
        localStorage.setItem('highscore', score);
    } else if (localStorage.highscore < score) {
        localStorage.highscore = score;
    }
}

function showHighScore() {
    let msg = `Highscore: ${localStorage.highscore}`;
    highScoreBoard.textContent = msg;
}

function resetHighScore() {
    localStorage.clear();
    score = 0;
    highScoreBoard.textContent = 'Highscore: 0';
}

function levelUp() {
    level++;
    let msg = `Level: ${level}`;
    levelBoard.textContent = msg;
}

function saveSettings() {
    // if (Number.isInteger(+setDuration.value) && setDuration.value <= 300) {
    //     gameDuration = setDuration.value * 1000;
    // } else {
    //     alert(`Game duration value must be from 0 to 300`);
    //     return;
    // }

    if (isNaN(setDuration.value) || setDuration.value >= 300) {
        alert(`Game duration value must be from 0 to 300`);
    } else {
        gameDuration = setDuration.value * 1000;
        enemyName = setEnemy.value;
        saveEnemy(enemyName);
        hideSettingsPanel();
    }

    enemyName = setEnemy.value;
    saveEnemy(enemyName);
    hideSettingsPanel();
}

function saveEnemy(name) {
    enemyes.forEach((enemy) => {
        enemy.style.background = `url('./images/${name}.png') top center no-repeat`;
    });
}

function hideSettingsPanel() {
    settingsBoard.style.top = '-300px';
    settingsBoard.style.left = '-300px';
}

function startGame() {
    if (gameIsStarted === false) {

        gameIsStarted = true;
        newGame.style.opacity = '0.1';
        clearTimeout(myTimeout);
        hideSettingsPanel();
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
            scoreBoard.textContent = `Time is over. Your score is ${score}`;
            setHighScore();
            gameIsStarted = false;
            newGame.style.opacity = '1';
        }, gameDuration);
    }

}

setHighScore();
showHighScore();

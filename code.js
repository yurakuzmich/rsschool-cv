// import {Raindrop} from './raindrop.js';

//Gameplay Elements
const keyboard = document.getElementById('keyboard');
const display = document.querySelector('.keyboard__display');
const settingsPanel = document.querySelector('.settings-panel');
//Counters
const counterScores = document.getElementById('scores-counter');
const counterLevel = document.getElementById('level-counter');

//Buttons
const buttonNewGame = document.getElementById('new-game-button');
const buttonSettings = document.getElementById('settings-button');
const buttonSaveSettings = document.getElementById('save-settings-button');
const buttonCloseSettings = document.querySelector('.settings-panel__close');
const buttonStop = document.getElementById('stop-button');

//Buttons for mobile layout
const buttonNewGameMobile = document.getElementById('new-game-button-mobile');
const buttonSettingsMobile = document.getElementById('settings-button-mobile');
const buttonCloseSettingsMobile = document.querySelector('.settings-panel__close');
const buttonStopMobile = document.getElementById('stop-button-mobile');



let game;
let raindropMove = false;
let enteringNewAnswer = false;
let intervalForRaindrops;
display.value = 0;
//Event Listeners
window.addEventListener('keydown', keyBoardKeyPress);
keyboard.addEventListener('click', (e) => {
    keyboardClick(e);
});

//Desctop layout
buttonNewGame.addEventListener('click', startNewGame);
buttonSettings.addEventListener('click', toggleSettingsPanel);
buttonSaveSettings.addEventListener('click', toggleSettingsPanel);
buttonCloseSettings.addEventListener('click', toggleSettingsPanel);
buttonStop.addEventListener('click', endGame);
//Mobile layout
buttonNewGameMobile.addEventListener('click', startNewGame);
buttonSettingsMobile.addEventListener('click', toggleSettingsPanel);
buttonStopMobile.addEventListener('click', endGame);


//functions
function keyboardClick(e) {
    let clicked = e.target;
    if (clicked.classList.contains('keyboard__button-number')) {
        if (display.value === '0' || enteringNewAnswer === true) {
            display.value = clicked.textContent;
            enteringNewAnswer = false;
        } else {
            display.value += clicked.textContent;
        }
    } else if (clicked.textContent === 'Clear') {
        display.value = '0';
    } else if (clicked.textContent === 'Del') {
        let val = display.value.slice(0, -1);
        val === '' ? display.value = '0' : display.value = val;
    } else if (clicked.textContent === 'Enter') {
        checkAnswer();
        enteringNewAnswer = true;
    }
}

function keyBoardKeyPress(e) {
    e.preventDefault();
    if (e.keyCode >= 96 && e.keyCode <= 105) {
        if (display.value === '0' || enteringNewAnswer === true) {
            display.value = e.key;
            enteringNewAnswer = false;
        } else {
            display.value += e.key;
        }
    } else if (e.keyCode === 8) {
        let val = display.value.slice(0, -1);
        val === '' ? display.value = '0' : display.value = val;
    } else if (e.keyCode === 46) {
        display.value = '0';
    } else if (e.keyCode === 13) {
        checkAnswer();
        enteringNewAnswer = true;
    }
}

function startNewGame() {
    endGame();
    game = new Game();
    updateScoreboard(game.currentScore, game.level);
    intervalForRaindrops = setInterval(() => {
        newRaindrop();
    }, 2000);

}

function endGame() {
    clearInterval(intervalForRaindrops);
    let allRainDrops = document.querySelectorAll('.raindrop');
    allRainDrops.forEach(raindrop => raindrop.remove());
}

function checkAnswer() {
    let answer = +display.value;
    let allRainDrops = document.querySelectorAll('.raindrop');

    allRainDrops.forEach(raindrop => {
        if (+raindrop.dataset.answer === answer) {
            raindrop.remove();
            game.currentScore++;
            if(game.currentScore % 21 === 0) {
                game.level++;
            }
            updateScoreboard(game.currentScore, game.level);
        }
        console.log(raindrop.dataset.answer);
    });
}

function updateScoreboard(scores, level) {
    counterScores.innerHTML = scores;
    counterLevel.innerHTML = level;
}

function toggleSettingsPanel() {
    settingsPanel.style.display === 'flex' ? settingsPanel.style.display = 'none' : settingsPanel.style.display = 'flex';
}

function newRaindrop() {
    let rainDrop = new Raindrop();

    rainDrop.interval = setInterval(() => { rainDrop.move(3 * game.level / 10) }, 10);
    rainDrop.addToScreen();

}

function applyBonus() {

    console.log("BONUS");
}

class Game {
    constructor() {
        this.currentScore = 0;
        this.failed = 0;
        this.level = 1;
        this.gameMode = 'all';
    }

    endGame() { }

    setHighScore() { }
}

class Raindrop {
    constructor() {
        this.properties = {
            top: 0,
            left: 0,
            isBonus: false,
            index: 0
        };
        this.task = {
            firstOperand: 0,
            secondOperand: 0,
            operation: '+',
            answer: 0,
        };
        this.raindropBody = document.createElement("div");
        this.parentNode = document.querySelector('.game');
        this.generateBonus();
        this._setProperties();
        this._generateTask();
    }

    _setProperties() {
        this.properties.top = 50;
        this.properties.left = Math.ceil((this.parentNode.offsetWidth - 50) * Math.random());
    }

    addToScreen() {
        this.raindropBody.classList.add('raindrop');
        this.raindropBody.dataset.answer = this.task.answer;
        if (this.properties.isBonus === true) {
            this.raindropBody.classList.add('bonus');
        }
        this.raindropBody.style.top = this.properties.top + 'px';
        this.raindropBody.style.left = this.properties.left + 'px';
        this.raindropBody.innerHTML = `${this.task.firstOperand} ${this.task.operation} ${this.task.secondOperand}<br>${this.task.answer}`;
        this.parentNode.appendChild(this.raindropBody);
    }

    toStartPosition() {
        this.properties.left = Math.ceil((this.parentNode.offsetWidth - 50) * Math.random());
        this.raindropBody.style.top = 0;
    }

    move(speed) {
        let coord = +this.raindropBody.style.top.slice(0, -2);
        if (coord < this.parentNode.offsetHeight - 100) {
            coord += speed;
        } else {
            coord = 0;
            // this.toStartPosition();
            clearInterval(this.interval);
            this.delete();
        };

        this.raindropBody.style.top = +coord + 'px';
        this.raindropBody.style.left = this.properties.left + 'px';
    }

    _generateTask() {
        this.task.firstOperand = Math.round(Math.random() * 100);
        this.task.secondOperand = Math.round(Math.random() * 100);

        let opRandom = 20 * Math.random();
        switch (true) {
            case (opRandom <= 5):
                this.task.operation = '+';
                break;
            case (opRandom > 5 && opRandom <= 10):
                this.task.operation = '-';
                break;
            case (opRandom > 10 && opRandom <= 15):
                this.task.operation = '*';
                break;
            case (opRandom > 15 && opRandom <= 20):
                this.task.operation = '/';
                break;
        }

        switch (this.task.operation) {
            case ('+'):
                this.task.firstOperand = Math.round(Math.random() * 100);
                this.task.secondOperand = Math.round(Math.random() * 100);
                this.task.answer = this.task.firstOperand + this.task.secondOperand;
                break;
            case ('-'):
                this.task.firstOperand = Math.round(Math.random() * 100);
                this.task.secondOperand = Math.round(Math.random() * 100);
                if (this.task.firstOperand > this.task.secondOperand) {
                    this.task.answer = this.task.firstOperand - this.task.secondOperand;
                } else {
                    let num = this.task.firstOperand;
                    this.task.firstOperand = this.task.secondOperand;
                    this.task.secondOperand = num;
                    this.task.answer = this.task.firstOperand - this.task.secondOperand;
                }
                break;
            case ('*'):
                this.task.firstOperand = Math.round(Math.random() * 10);
                this.task.secondOperand = Math.round(Math.random() * 10);
                this.task.answer = this.task.firstOperand * this.task.secondOperand;
                break;
            case ('/'):
                this.task.firstOperand = Math.round(Math.random() * 10);
                this.task.secondOperand = Math.round(Math.random() * 10);
                if (this.task.secondOperand === 0) {
                    this.task.secondOperand = 1;
                }
                let preRes = this.task.firstOperand * this.task.secondOperand;
                this.task.firstOperand = preRes;
                this.task.answer = preRes / this.task.secondOperand;
        }
    }

    generateBonus() {
        let randValue = Math.round(10 * Math.random());
        if (randValue > 3 && randValue < 6) {
            this.properties.isBonus = true;
        } else {
            this.properties.isBonus = false;
        }
    }

    checkAnswer(answer) {
        if (answer === this.task.answer && this.properties.isBonus === true) {
            console.log('CORRECT BONUS ANSWER');
            display.value = '0';
            // this.raindropBody.remove();
            applyBonus();
            return true;
        } else if (answer === this.task.answer) {
            console.log('CORRECT  ANSWER');
            display.value = '0';
            // this.raindropBody.remove();
            return true;
        } else {
            console.log('Something wrong');
            return false;
        }
    }

    delete() {
        console.log(`raindrop ${this.task.answer} deleted`);
        this.raindropBody.remove()
    }
}





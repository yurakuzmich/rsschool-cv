// import {Raindrop} from './raindrop.js';

//Gameplay Elements
const myCanvasParent = document.querySelector('.game');
const myCanvas = document.getElementById('game-canvas');
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


let enteringNewAnswer = true;

display.value = 0;
//Event Listeners
window.addEventListener('keydown', keyBoardKeyPress);
keyboard.addEventListener('click', (e) => {
    keyboardClick(e);
});

//Desctop layout
// buttonNewGame.addEventListener('click', startNewGame);
buttonSettings.addEventListener('click', toggleSettingsPanel);
buttonSaveSettings.addEventListener('click', toggleSettingsPanel);
buttonCloseSettings.addEventListener('click', toggleSettingsPanel);
// buttonStop.addEventListener('click', endGame);
//Mobile layout
// buttonNewGameMobile.addEventListener('click', startNewGame);
buttonSettingsMobile.addEventListener('click', toggleSettingsPanel);
// buttonStopMobile.addEventListener('click', endGame);


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
        enteringNewAnswer = true;
    }
}

function toggleSettingsPanel() {
    settingsPanel.style.display === 'flex' ? settingsPanel.style.display = 'none' : settingsPanel.style.display = 'flex';
}

class GameWindow {
    constructor(parentElement, canvas) {
        this.parent = parentElement;
        this.width = parentElement.offsetWidth - 25;
        this.height = parentElement.offsetHeight - 25;
        canvas.width = this.width;
        canvas.height = this.height;
        this.ctx = canvas.getContext('2d');
        this.clearCanvas();
        this.renderBackground();
        this.renderWawe();
        console.log(`Game created with width of ${this.width} and height of ${this.height}\n ctx is ${this.ctx}`);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    renderBackground(img = 0) {
        if (img === 0) {
            let bgGradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
            bgGradient.addColorStop(0, "#88DDFF");
            bgGradient.addColorStop(1, "white");
            this.ctx.fillStyle = bgGradient;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    }

    renderWawe() {
        this.ctx.strokeStyle = "blue";
        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0.9 * this.height);
        this.ctx.bezierCurveTo(0.4 *this.width, 0.7 * this.height, 0.8 *this.width, this.height, this.width, 0.9 * this.height);
        this.ctx.lineTo(this.width, this.height);
        this.ctx.lineTo(0, this.height);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
    }
}

let gameWindow = new GameWindow(myCanvasParent, myCanvas);



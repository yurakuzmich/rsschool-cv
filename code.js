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

let game = {};
let gameWindow = {};

let enteringNewAnswer = true;
let globalId;
let gameIsStarted = false;

display.value = 0;
//Event Listeners
window.addEventListener('keydown', keyBoardKeyPress);
keyboard.addEventListener('click', (e) => {
    keyboardClick(e);
});

//Desctop layout
buttonNewGame.addEventListener('click', () => {
    if (gameIsStarted === false) {
        newGame();
        buttonStop.textContent = 'Остановить игру';
        gameIsStarted = true;
    }
});
buttonSettings.addEventListener('click', toggleSettingsPanel);
buttonSaveSettings.addEventListener('click', toggleSettingsPanel);
buttonCloseSettings.addEventListener('click', toggleSettingsPanel);
buttonStop.addEventListener('click', () => {
    if (gameIsStarted === true) {
        cancelAnimationFrame(globalId);
        buttonStop.textContent = "Продолжить игру";
        gameIsStarted = false;
    } else {
        animate();
        buttonStop.textContent = 'Остановить игру';
        gameIsStarted = true;
    }


});
//Mobile layout
buttonNewGameMobile.addEventListener('click', () => {
    if (gameIsStarted === false) {
        newGame();
        buttonStop.textContent = 'Остановить игру';
        gameIsStarted = true;
    }
});
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
        gameWindow.checkAnswer(display.value);
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
        gameWindow.checkAnswer(display.value);
    }
}

function toggleSettingsPanel() {
    settingsPanel.style.display === 'flex' ? settingsPanel.style.display = 'none' : settingsPanel.style.display = 'flex';
}

function newGame() {
    game = {};
    gameWindow = {};

    game = new Game();
    gameWindow = new GameWindow(myCanvasParent, myCanvas);
    animate();
}

function animate() {
    gameWindow.renderFrame();
    globalId = requestAnimationFrame(animate);
}

class Game {
    constructor() {
        this.score = 0;
        this.level = 1;
    }
}
class GameWindow {
    rainDrops = [];

    constructor(parentElement, canvas) {
        this.parent = parentElement;
        this.width = parentElement.offsetWidth - 25;
        this.height = parentElement.offsetHeight - 25;
        canvas.width = this.width;
        canvas.height = this.height;
        this.ctx = canvas.getContext('2d');

        //raindrops


        //wave animation properties
        this.waves = [
            { x1: 0.3, y1: 0.7, x2: 0.7, y2: 0.9, x3: 1.0, y3: 0.8, height: 0.8, maxHeight: 1, minHeight: 0.5, speed: 0.003, color: '#0D56A6' },
            { x1: 0.4, y1: 0.9, x2: 0.6, y2: 0.7, x3: 1.0, y3: 0.85, height: 0.85, maxHeight: 1, minHeight: 0.5, speed: 0.003, color: '#4186D3' },
            { x1: 0.3, y1: 0.8, x2: 0.65, y2: 0.9, x3: 1.0, y3: 0.9, height: 0.9, maxHeight: 1, minHeight: 0.5, speed: 0.002, color: '#689AD3' },
        ];

        this.clearCanvas();
        this.renderBackground();
        this.renderWaves();
        this.renderRaindrops();
        this.addRaindrop();
        console.log(`Game created with width of ${this.width} and height of ${this.height}\n ctx is ${this.ctx}`);
    }

    renderFrame() {
        this.clearCanvas();
        this.renderBackground();
        this.renderWaves();
        if (this.rainDrops.length === 0) {
            this.addRaindrop();
        }
        this.renderRaindrops();
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

    renderWaves() {
        this.waves.forEach((wave) => {
            this.ctx.fillStyle = wave.color;
            this.ctx.beginPath();
            this.ctx.moveTo(0, wave.height * this.height);
            this.ctx.bezierCurveTo(wave.x1 * this.width, wave.y1 * this.height, wave.x2 * this.width, wave.y2 * this.height, wave.x3 * this.width, wave.y3 * this.height);
            this.ctx.lineTo(this.width, this.height);
            this.ctx.lineTo(0, this.height);
            this.ctx.closePath();
            this.ctx.fill();
        });
        this.animateWaves();
    }

    animateWaves() {
        this.waves.forEach((wave) => {
            wave.y1 += wave.speed;
            wave.y2 -= wave.speed;
            // wave.y3 += wave.speed;
            // wave.height -= wave.speed;
            if ((wave.y1 > wave.maxHeight || wave.y1 < wave.minHeight) || (wave.y2 > wave.maxHeight || wave.y2 < wave.minHeight)) {
                wave.speed *= -1;
            }
        });
    }

    addRaindrop(x = Math.round(Math.random() * this.width), y = 0, radius = 30, color = '#0D56A6') {
        let rainDrop = new Raindrop(x, y, radius, color);
        // this.rainDrops = [...this.rainDrops, rainDrop];
        this.rainDrops.push(rainDrop);
    }

    renderRaindrops() {
        this.rainDrops.forEach((rainDrop) => {
            this.ctx.fillStyle = rainDrop.color;
            this.ctx.beginPath();
            this.ctx.arc(rainDrop.x, rainDrop.y, rainDrop.radius, 0, 2 * Math.PI);
            this.ctx.fill();
        });
        this.renderRaindropsText();
        this.animateRainDrops(1);
    }

    renderRaindropsText() {
        this.rainDrops.forEach((rainDrop) => {
            this.ctx.fillStyle = '#000000';
            this.ctx.font = rainDrop.font;
            this.ctx.fillText(`${rainDrop.operandOne} + ${rainDrop.operandTwo}`, rainDrop.x - 0.8 * rainDrop.radius, rainDrop.y + 5);
        });
    }

    animateRainDrops(speed) {
        this.rainDrops.forEach((rainDrop, index) => {
            rainDrop.y += speed;
            if (rainDrop.y > this.waves[0].height * this.height) {
                this.rainDrops.splice(index, 1);
                this.addRaindrop();
            }
        });
    }

    checkAnswer(answer) {
        this.rainDrops.forEach((rainDrop, index) => {
            if (rainDrop.answer === +answer) {
                this.rainDrops.splice(index, 1);
            }
        });
    }


}

class Raindrop {
    constructor(x, y, radius, color, font = '15px Verdana') {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.color = color;
        this.font = font;
        this.generateTask();
    }

    generateTask() {
        this.operandOne = Math.round(10 * Math.random());
        this.operandTwo = Math.round(10 * Math.random());
        this.answer = this.operandOne + this.operandTwo;
    }

    generateOperation() {

    }

}






// import {Raindrop} from './raindrop.js';

//Gameplay Elements
const myCanvasParent = document.querySelector('.game');
const myCanvas = document.getElementById('game-canvas');
const keyboard = document.getElementById('keyboard');
const display = document.querySelector('.keyboard__display');
const settingsPanel = document.querySelector('.settings-panel');
const music = document.getElementById('music');
const soundSuccess = document.getElementById('sound__success');
//Counters
const counterScores = document.getElementById('scores-counter');
const counterMistakes = document.getElementById('mistakes-counter');
const counterLevel = document.getElementById('level-counter');

//Buttons
const buttonNewGame = document.getElementById('new-game-button');
const buttonSettings = document.getElementById('settings-button');
const buttonSaveSettings = document.getElementById('save-settings-button');
const buttonCloseSettings = document.querySelector('.settings-panel__close');
const buttonStop = document.getElementById('stop-button');
const buttonStopAll = document.getElementById('stop-all-button');

//Buttons for mobile layout
const buttonNewGameMobile = document.getElementById('new-game-button-mobile');
const buttonSettingsMobile = document.getElementById('settings-button-mobile');
const buttonCloseSettingsMobile = document.querySelector('.settings-panel__close');
const buttonStopMobile = document.getElementById('stop-button-mobile');

let gameWindow;
let timerForRaindrops;

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
buttonNewGame.addEventListener('click', newGame);
buttonSettings.addEventListener('click', toggleSettingsPanel);
buttonSaveSettings.addEventListener('click', toggleSettingsPanel);
buttonCloseSettings.addEventListener('click', toggleSettingsPanel);
buttonStop.addEventListener('click', pauseGame);
buttonStopAll.addEventListener('click', endGame);

//Mobile layout
buttonNewGameMobile.addEventListener('click', () => {
    if (gameIsStarted === false) {
        newGame();
        buttonStop.textContent = 'Остановить игру';
        gameIsStarted = true;
    }
});
buttonSettingsMobile.addEventListener('click', toggleSettingsPanel);
buttonStopMobile.addEventListener('click', pauseGame);


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
    if (!gameWindow) {
        gameWindow = new GameWindow(myCanvasParent, myCanvas);
    }
    endGame();
    buttonStop.textContent = 'Остановить игру';
    gameIsStarted = true;
    display.value = 0;
    animate();
    setTimerForRaindrops();
    music.play();
}

function pauseGame() {
    if (gameIsStarted === true) {
        buttonStop.textContent = "Продолжить игру";
        buttonStopMobile.textContent = "Продолжить игру";
        music.pause();
        gameIsStarted = false;
    } else {
        buttonStop.textContent = 'Остановить игру';
        buttonStopMobile.textContent = "Остановить игру";
        music.play();
        gameIsStarted = true;
    }
}

function endGame() {
    gameWindow.endGame();
    // gameWindow = {};
}

function animate() {
    gameWindow.renderFrame();
    globalId = requestAnimationFrame(animate);
}

function setTimerForRaindrops() {
    timerForRaindrops = setTimeout(() => {
        if (gameWindow.rainDrops.length < gameWindow.maxRainDropsAmount) {
            gameWindow.addRaindrop();
        }
        if (gameIsStarted) setTimerForRaindrops();
    }, gameWindow.newRainDropDelay);
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

        //
        this.tempScore = 10;
        this.score = 0;
        this.incorrects = 0;
        this.mistakes = 0;
        this.level = 1;
        this.maxRainDropsAmount = 5;
        this.newRainDropDelay = 2000;
        this.rainDropSpeed = 0.5;


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
        if (gameIsStarted) {
            this.clearCanvas();
            this.renderBackground();
            this.renderWaves();
            if (this.rainDrops.length === 0) {
                this.addRaindrop();
            }
            this.renderRaindrops();
        }

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
            if ((wave.y1 > wave.maxHeight || wave.y1 < wave.minHeight) || (wave.y2 > wave.maxHeight || wave.y2 < wave.minHeight)) {
                wave.speed *= -1;
            }
        });
    }

    addRaindrop(x = Math.round(Math.random() * 0.8 * this.width), y = 0, radius = 35, color = 'rgba(13, 86, 166, 0.9)') {
        let rainDrop = new Raindrop(2 * radius + x, y, radius, color);
        this.rainDrops = [...this.rainDrops, rainDrop];
        // this.rainDrops.push(rainDrop);
    }

    renderRaindrops() {
        this.rainDrops.forEach((rainDrop) => {
            this.ctx.fillStyle = rainDrop.color;
            this.ctx.beginPath();
            this.ctx.arc(rainDrop.x, rainDrop.y, rainDrop.radius, 0, 2 * Math.PI);
            this.ctx.fill();
        });
        this.renderRaindropsText();
        this.animateRainDrops(this.rainDropSpeed);
    }

    renderRaindropsText() {
        this.rainDrops.forEach((rainDrop) => {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = rainDrop.font;
            if (rainDrop.operandOne >= rainDrop.operandTwo) {
                this.ctx.fillText(`${rainDrop.operandOne} ${rainDrop.operation} ${rainDrop.operandTwo}`, rainDrop.x - 0.9 * rainDrop.radius, rainDrop.y + 5);
            } else {
                this.ctx.fillText(`${rainDrop.operandTwo} ${rainDrop.operation} ${rainDrop.operandOne}`, rainDrop.x - 0.9 * rainDrop.radius, rainDrop.y + 5);
            }

        });
    }

    animateRainDrops(speed) {
        this.rainDrops.forEach((rainDrop, index) => {
            rainDrop.y += speed;
            if (rainDrop.y > this.waves[0].height * this.height) {
                this.rainDrops.splice(index, 1);
                this.mistakesUp();
            }
        });
    }

    checkAnswer(answer) {
        this.rainDrops.forEach((rainDrop, index) => {
            if (rainDrop.answer === +answer) {
                soundSuccess.pause();
                soundSuccess.currentTime = 0;
                soundSuccess.play();
                this.rainDrops.splice(index, 1);
                this.scoreUp();
                this.renderScoreBoard();
                if (this.score % 10 === 0) {
                    this.level++;
                    this.rainDropSpeed += 0.3 * this.rainDropSpeed;
                }
            } else {
                this.incorrects++;
            }
        });
    }

    scoreUp() {
        this.score += this.tempScore;
        this.tempScore++;
    }

    mistakesUp() {
        if (this.mistakes >= 3) {
            endGame();
        }
        this.mistakes++;
        this.renderScoreBoard();
        this.waves.forEach((wave) => {
            wave.y3 -= 0.1;
            wave.height -= 0.1;
        });
    }

    renderScoreBoard() {
        counterScores.textContent = this.score;
        counterMistakes.textContent = this.mistakes
        counterLevel.textContent = this.level;
    }

    renderFinalScore() {
        this.clearCanvas();
        this.ctx.fillStyle = '#000000';
        this.ctx.font = '20px Verdana';
        this.ctx.fillText(`Игра окончена.`, 20, this.height / 2 - 40);
        this.ctx.fillText(`Набрано очков: ${this.score}`, 20, this.height / 2);
        this.ctx.fillText(`Допущено ошибок: ${this.incorrects}`, 20, this.height / 2 + 40);
    }

    endGame() {
        gameIsStarted = false;
        timerForRaindrops = null;
        music.pause();
        music.currentTime = 0;
        this.renderFinalScore();
        this.rainDrops = [];
        this.score = 0;
        this.incorrects = 0
        this.level = 0;
        this.mistakes = 0;
        this.renderScoreBoard();
        this.waves = [
            { x1: 0.3, y1: 0.7, x2: 0.7, y2: 0.9, x3: 1.0, y3: 0.8, height: 0.8, maxHeight: 1, minHeight: 0.5, speed: 0.003, color: '#0D56A6' },
            { x1: 0.4, y1: 0.9, x2: 0.6, y2: 0.7, x3: 1.0, y3: 0.85, height: 0.85, maxHeight: 1, minHeight: 0.5, speed: 0.003, color: '#4186D3' },
            { x1: 0.3, y1: 0.8, x2: 0.65, y2: 0.9, x3: 1.0, y3: 0.9, height: 0.9, maxHeight: 1, minHeight: 0.5, speed: 0.002, color: '#689AD3' },
        ];

        cancelAnimationFrame(globalId);
    }
}

class Raindrop {
    constructor(x, y, radius, color, font = '15px Verdana') {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.color = color;
        this.font = font;
        this.operation
        this.operations = ['+', '-', '*', '/'];
        this.generateTask();
    }

    generateTask() {
        this.operandOne = Math.round(100 * Math.random());
        this.operandTwo = Math.round(100 * Math.random());
        this.generateOperation();
        switch (this.operation) {
            case '+':
                this.answer = this.operandOne + this.operandTwo;
                break;
            case '-':
                if (this.operandOne >= this.operandTwo) {
                    this.answer = this.operandOne - this.operandTwo;
                } else {
                    this.answer = this.operandTwo - this.operandOne;
                };
                break;
            case '*':
                this.operandOne = Math.round(10 * Math.random());
                this.operandTwo = Math.round(10 * Math.random());
                this.answer = this.operandOne * this.operandTwo;
                break;
            case '/':
                this.operandOne = Math.round(10 * Math.random());
                this.operandTwo = Math.round(10 * Math.random());
                if (this.operandTwo === 0) {
                    this.operandTwo = 1;
                }
                let tempRes = this.operandOne * this.operandTwo;
                this.answer = this.operandOne;
                this.operandOne = tempRes;
        }
    }

    generateOperation() {
        let opNum = Math.floor(this.operations.length * Math.random());
        this.operation = this.operations[opNum];
    }

}






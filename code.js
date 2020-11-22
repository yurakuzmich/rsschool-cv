

const keyboard = document.getElementById('keyboard');
const display = document.querySelector('.keyboard__display');
const settingsPanel = document.querySelector('.settings-panel');
const buttonNewGame = document.getElementById('new-game-button');
const buttonSettings = document.getElementById('settings-button');
const buttonSaveSettings = document.getElementById('save-settings-button');
const buttonCloseSettings = document.querySelector('.settings-panel__close');
const buttonTest = document.getElementById('test-button');


let game;
let rainDrops = [];
let raindropMove = false;
display.value = 0;
//Event Listeners
window.addEventListener('keydown', keyBoardKeyPress);
keyboard.addEventListener('click', (e) => {
    keyboardClick(e);
});

buttonNewGame.addEventListener('click', startNewGame);
buttonSettings.addEventListener('click', toggleSettingsPanel);
buttonSaveSettings.addEventListener('click', toggleSettingsPanel);
buttonCloseSettings.addEventListener('click', toggleSettingsPanel);
buttonTest.addEventListener('click', () => { });

//functions
function keyboardClick(e) {
    let clicked = e.target;
    if (clicked.classList.contains('keyboard__button-number')) {
        if (display.value === '0') {
            display.value = clicked.textContent;
        } else {
            display.value += clicked.textContent;
        }
    } else if (clicked.textContent === 'Clear') {
        display.value = '0';
    } else if (clicked.textContent === 'Del') {
        let val = display.value.slice(0, -1);
        val === '' ? display.value = '0' : display.value = val;
    } else if (clicked.textContent === 'Enter') {
        let answer = display.value;
        rainDrops.forEach((raindrop, index) => {
            if (raindrop.checkAnswer(answer)) {
                rainDrops.splice(index, 1);
            };
        });
    }
}

function keyBoardKeyPress(e) {
    console.log(e);
    if (e.keyCode >= 96 && e.keyCode <= 105) {
        if (display.value === '0') {
            display.value = e.key;
        } else {
            display.value += e.key;
        }
    } else if (e.keyCode === 8) {
        let val = display.value.slice(0, -1);
        val === '' ? display.value = '0' : display.value = val;
    } else if (e.keyCode === 46) {
        display.value = '0';
    } else if (e.keyCode === 13) {
        let answer = display.value;
        rainDrops.forEach((raindrop, index) => {
            if (raindrop.checkAnswer(answer)) {
                rainDrops.splice(index, 1);
            };
        });
    }
}

function startNewGame() {
    game = new Game();
    setInterval(() => {
        newRaindrop();
    }, 4000);

}

function toggleSettingsPanel() {
    console.log(settingsPanel);
    settingsPanel.style.display === 'flex' ? settingsPanel.style.display = 'none' : settingsPanel.style.display = 'flex';
}

function newRaindrop() {
    let rainDrop = new Raindrop();
    rainDrop.addToScreen();
    setInterval(() => { rainDrop.move(10) }, 100);
    rainDrops.push(rainDrop);
    console.log(rainDrops);
}

class Game {
    constructor() {
        this.currentScore = 0;
        this.currentMistakes = 0;
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
            isBonus: false
        };
        this.task = {
            firstOperand: 0,
            secondOperand: 0,
            operation: '+',
            answer: 0,
        };
        this.raindropBody = document.createElement("div");
        this.parentNode = document.querySelector('.game');
        // console.log(this.parentNode.offsetWidth);
        // console.log(this.parentNode.offsetHeight);
        this._setProperties();
        this._generateTask();
    }

    _setProperties() {
        // let gameWindow = document.querySelector('.game');
        this.properties.top = 50;
        this.properties.left = Math.ceil((this.parentNode.offsetWidth - 50) * Math.random());
    }

    addToScreen() {
        this.raindropBody.classList.add('raindrop');
        this.raindropBody.style.top = this.properties.top + 'px';
        this.raindropBody.style.left = this.properties.left + 'px';
        this.raindropBody.innerHTML = `${this.task.firstOperand} ${this.task.operation} ${this.task.secondOperand}`;
        this.parentNode.appendChild(this.raindropBody);
    }

    toStartPosition() {
        this.properties.left = Math.ceil((this.parentNode.offsetWidth - 50) * Math.random());
        this.raindropBody.style.top = 0;
        // this.raindropBody.style.left = this.properties.left + 'px';
    }

    move(speed) {
        // console.log(this.raindropBody.style.top);
        let coord = +this.raindropBody.style.top.slice(0, -2);
        // console.log(coord);
        if (coord < this.parentNode.offsetHeight - 100) {
            coord += speed;
        } else {
            coord = 0;
            this.toStartPosition();
            // coord = 0;
            // this.properties.left = Math.ceil((this.parentNode.offsetWidth - 50) * Math.random());
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

    checkAnswer(answer) {
        if (+answer === +this.task.answer) {
            console.log('CORRECT ANSWER');
            display.value = '0';
            this.raindropBody.remove();
            return true;
        }
        return false;
    }

    delete() {

    }
}






const keyboard = document.getElementById('keyboard');
const settingsPanel = document.querySelector('.settings-panel');
const buttonNewGame = document.getElementById('newGameButton');
const buttonSettings = document.getElementById('settings-button');
const buttonSaveSettings = document.getElementById('save-settings-button');
const buttonCloseSettings = document.querySelector('.settings-panel__close');
const buttonTest = document.getElementById('test-button');


let game;
let rainDrops = [];
let raindropMove = false;
//Event Listeners
keyboard.addEventListener('click', (e) => {
    keyboardClick(e);
});

buttonSettings.addEventListener('click', toggleSettingsPanel);
buttonSaveSettings.addEventListener('click', toggleSettingsPanel);
buttonCloseSettings.addEventListener('click', toggleSettingsPanel);
buttonTest.addEventListener('click', () => { });

//functions
function keyboardClick(e) {
    console.log(e.target.textContent);
}

function startNewGame() {
    game = new Game();
}

function toggleSettingsPanel() {
    console.log(settingsPanel);
    settingsPanel.style.display === 'flex' ? settingsPanel.style.display = 'none' : settingsPanel.style.display = 'flex';
}

function newRaindrop() {
    let rainDrop = new Raindrop();
    rainDrops.push(rainDrop);
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
        if (coord < this.parentNode.offsetHeight) {
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
                if(this.task.firstOperand > this.task.secondOperand) {
                    this.task.answer = this.task.firstOperand - this.task.secondOperand;
                } else {
                    this.task.answer = this.task.secondOperand - this.task.firstOperand;
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
                let preRes = this.task.firstOperand * this.task.secondOperand;
                this.task.firstOperand = preRes;
                this.task.answer = preRes / this.task.secondOperand;
        }
    }

    delete() {

    }
}


// let raindrop = new Raindrop();
// raindrop.addToScreen();

for(let i = 0; i < 3; i++) {
    newRaindrop();
}

rainDrops.forEach(raindrop => {
    raindrop.addToScreen();
    setInterval(() => {
        raindrop.move(Math.round(Math.random() * 10));
    }, 100);
});

// raindropMove = setInterval(() => {
//     raindrop.move(10);
// }, 100);

// setInterval(() => {new Raindrop();}, 1000);
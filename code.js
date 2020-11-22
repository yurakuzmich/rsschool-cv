const keyboard = document.getElementById('keyboard');
const settingsPanel = document.querySelector('.settings-panel');
const buttonNewGame = document.getElementById('newGameButton');
const buttonSettings = document.getElementById('settings-button');
const buttonSaveSettings = document.getElementById('save-settings-button');
const buttonCloseSettings = document.querySelector('.settings-panel__close');
const buttonTest = document.getElementById('test-button');


let game;
let raindropMove = false;
//Event Listeners
keyboard.addEventListener('click', (e) => {
    keyboardClick(e);
});

buttonSettings.addEventListener('click', toggleSettingsPanel);
buttonSaveSettings.addEventListener('click', toggleSettingsPanel);
buttonCloseSettings.addEventListener('click', toggleSettingsPanel);
buttonTest.addEventListener('click', () => {});

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


//Classes
class Game {
    constructor() {
        this.currentScore = 0;
        this.currentMistakes = 0;
        this.level = 1;
        this.gameMode = 'all';
    }

    endGame() {}

    setHighScore() {}
}

class Raindrop {
    constructor() {
        this.properties = {
            top: 0,
            left: 0,
        };
        this.raindropBody = document.createElement("div");
        this.parentNode = document.querySelector('.game');
        console.log(this.parentNode.offsetWidth);
        console.log(this.parentNode.offsetHeight);
        this._setProperties();
    }

    _setProperties() {
        let gameWindow = document.querySelector('.game');
        this.properties.top = 50;
        this.properties.left = Math.ceil((gameWindow.offsetWidth - 50) * Math.random());
    }

    addToScreen() {
        this.raindropBody.classList.add('raindrop');
        this.raindropBody.style.top = this.properties.top + 'px';
        this.raindropBody.style.left = this.properties.left + 'px';
        this.raindropBody.innerHTML = 'iuius';
        this.parentNode.appendChild(this.raindropBody);
    }

    move(speed) {
        console.log(this.raindropBody.style.top);
        let coord = +this.raindropBody.style.top.slice(0, -2);
        console.log(coord);
        if (coord < this.parentNode.offsetHeight) {
            coord += speed;
        } else {
            coord = 0;
            this.properties.left = Math.ceil((this.parentNode.offsetWidth - 50) * Math.random());
        };
        this.raindropBody.style.top = +coord + 'px';
        this.raindropBody.style.left = this.properties.left + 'px';
    }
}

// let raindrop = new Raindrop();
// raindrop.addToScreen();


// function raindropMove() {
//     raindropMove = setInterval(() => {
//     raindrop.move(10);
// }, 100);
// }

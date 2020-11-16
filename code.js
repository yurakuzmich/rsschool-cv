const keyboard = document.getElementById('keyboard');


keyboard.addEventListener('click', (e) => {
    keyboardClick(e);
});

//functions
function keyboardClick(e) {
    console.log(e.target.textContent);
}


//Classes
class Game {
    constructor() {
        this.isStarted = false;
        this.currentScore = 0;
        this.level = 1;
        this.gameMode = 'all';
    }
}

class Raindrop {
    constructor() {
        this.properties = {
            top: 0,
            left: 0,
        };
        this.raindropBody = document.createElement("div");
        this._setProperties();
    }

    _setProperties() {
        let gameWindow = document.querySelector('.game');
        this.properties.top = 50;
        this.properties.left = Math.ceil((gameWindow.offsetWidth - 50) * Math.random());
    }

    addToScreen(parentNode) {
        this.raindropBody.classList.add('raindrop');
        this.raindropBody.style.top = this.properties.top + 'px';
        this.raindropBody.style.left = this.properties.left + 'px';
        this.raindropBody.innerHTML = 'iuius';
        parentNode.appendChild(this.raindropBody);
    }
}

let raindrop = new Raindrop();
const gameWindow = document.querySelector('.game');
raindrop.addToScreen(gameWindow);
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

let raindrop = new Raindrop();
raindrop.addToScreen();
setInterval(() => {
    raindrop.move(10);
}, 100);
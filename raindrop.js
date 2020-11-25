export class Raindrop {
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
        this._setProperties();
        this._generateTask();
    }

    _setProperties() {
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
    }

    move(speed) {
        let coord = +this.raindropBody.style.top.slice(0, -2);
        if (coord < this.parentNode.offsetHeight - 100) {
            coord += speed;
        } else {
            coord = 0;
            this.toStartPosition();
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
        if (answer === this.task.answer) {
            console.log('CORRECT ANSWER');
            display.value = '0';
            this.raindropBody.remove();
            // game.currentScore++;
            // updateScoreboard(game.currentScore, game.currentMistakes, 0);
            return true;
        } else {
            // game.currentMistakes++;
            // updateScoreboard(game.currentScore, game.currentMistakes, 0);
            console.log('WRONG ANSWER');
            return false;
        }
    }

    delete() {

    }
}
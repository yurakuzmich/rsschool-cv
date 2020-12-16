const display = document.getElementById('calculator__display');

const CEButton = document.getElementById('ce');
const CButton = document.getElementById('c');
const actionButtons = document.querySelectorAll('.math_action');
const numbersButtons = document.querySelectorAll('.number');
const commaButton = document.getElementById('comma');
const percentButton = document.getElementById('percent');
const howToButton = document.getElementById('howitwork-button');
const aboutButton = document.getElementById('about-button');
const myModal = document.getElementById('modal__wrapper');
const myModalClose = document.getElementById('modal_close');

const myModalHeader = document.getElementById('modal__header');
const myModalText = document.getElementById('modal__text');

const howToHeader = 'Руководство пользователя';
const howToManual = '<p>C - полный сброс</p>' +
    '<p>CE - очистка дисплея. Число в памяти сохраняется</p>';

const aboutHeader = 'О программе';
const aboutText = '<p>Мощный, быстрый, продвинутый калькулятор.</p>' +
    '<p>Надежные, сверхсовременные алгоритмы позволяют складывать, отнимать, умножать делить небольшие числа с небывалой точность!</p>';

const percentHeader = 'К сожалению, кнопка не работает';
const percentText = '<p>Я долго пытался понять логику работы этой кнопки на простом калькуляторе, но понял только для сложения и вычитания.</p>' +
    '<p>Поэтому я просто взял и отключил ее к чертям. Ну и вывел это чудесное модальное окошко.</p>';


let clculator = new Object();
calculator = {
    firstOperand: '',
    secondOperand: '',
    operationMemory: 0,
    displayValue: 0,
    isSessionStarted: false,
    currentOperation: '',
    newOperand: false,
    summ: summ,
    diff: diff,
    quot: quot,
    multiply: multi,
    showResult: res
}




window.onload = function () {
    //LISTENERS
    CEButton.addEventListener('click', mainApp);
    CButton.addEventListener('click', mainApp);
    commaButton.addEventListener('click', mainApp);
    for (let i = 0; i <= actionButtons.length - 1; i++) {
        let actionButton = actionButtons[i];
        actionButton.addEventListener('click', mainApp);
    }
    for (let i = 0; i <= numbersButtons.length - 1; i++) {
        let numberButton = numbersButtons[i];
        numberButton.addEventListener('click', mainApp);
    }
    percentButton.addEventListener('click', clickPercentButton);
    howToButton.addEventListener('click', clickHowToButton);
    aboutButton.addEventListener('click', clickAboutButton);
    myModalClose.addEventListener('click', switсhModal);
}

//FUNCTIONS

function mainApp(event) {
    let targetButton = event.target;
    // console.log(targetButton);
    // console.log(event);
    if (targetButton.textContent === 'CE') {
        clickCE();
        return;
    }
    if (targetButton.textContent === 'C') {
        clickC();
        return;
    }

    if(targetButton.classList.contains('number')) {
        // console.log(`Number ${targetButton.textContent} was pressed`);
        if(calculator.isSessionStarted === false) {
            if( calculator.displayValue === 0) {
                calculator.displayValue = targetButton.textContent;
            } else {
                calculator.displayValue += targetButton.textContent;
            }
        } else if (calculator.isSessionStarted === true) {
            if(calculator.newOperand === true) {
                calculator.displayValue = targetButton.textContent;
                calculator.newOperand = false
            } else {
                calculator.displayValue += targetButton.textContent;
            }
        }
    } else if (targetButton.classList.contains('comma_button')) {
        if(calculator.displayValue === 0) {
            calculator.displayValue = '0.';
        } else if (calculator.displayValue.indexOf('.') === -1) {
            calculator.displayValue += '.';
        } 
        console.log(`Comma ${targetButton.textContent} was pressed`);
    } else if(targetButton.classList.contains('math_action')) {
        calculator.newOperand = true;
        calculator.isSessionStarted = true;
        if(calculator.currentOperation === '') {
            calculator.currentOperation = targetButton.textContent;
        }
        if(calculator.firstOperand === '') {
            calculator.firstOperand = calculator.displayValue;
        } else {
            calculator.secondOperand = calculator.displayValue;
            switch (calculator.currentOperation) {
                case '+':
                    calculator.firstOperand = summ(+calculator.firstOperand, +calculator.secondOperand);
                    calculator.displayValue = calculator.firstOperand;
                    calculator.currentOperation = targetButton.textContent;
                    break;
                case '-': 
                    calculator.firstOperand = diff(+calculator.firstOperand, +calculator.secondOperand);
                    calculator.displayValue = calculator.firstOperand;
                    calculator.currentOperation = targetButton.textContent;
                    break;
                case '*': 
                    calculator.firstOperand = mult(+calculator.firstOperand, +calculator.secondOperand);
                    calculator.displayValue = calculator.firstOperand;
                    calculator.currentOperation = targetButton.textContent;
                    break;
                case '/': 
                    calculator.firstOperand = quot(+calculator.firstOperand, +calculator.secondOperand);
                    calculator.displayValue = calculator.firstOperand;
                    calculator.currentOperation = targetButton.textContent;
                    break;
                case '=':
                    calculator.displayValue = calculator.firstOperand;
                    calculator.firstOperand = '';
                    calculator.currentOperation = '';

            }
        }
        console.log(`Operation button ${targetButton.textContent} was pressed. ${calculator.firstOperand} in memory`);
    }


    if(calculator.isSessionStarted === false) {

    }
    display.value = calculator.displayValue;
}




function clickCE() {
    calculator.displayValue = 0;
    console.log('CE clicked');
}

function clickC() {
    calculator.displayValue = 0;
    calculator.firstOperand = '';
    calculator.secondOperand = '';
    calculator.newOperand = false;
    calculator.operationMemory = 0;
    calculator.isSessionStarted = false;
    calculator.currentOperation = '';
    console.log('CE clicked');
    display.value = calculator.displayValue;
}


function summ(firstOperand, secondOperand) {
    return firstOperand + secondOperand;
}

function diff(firstOperand, secondOperand) {
    return firstOperand - secondOperand;
}

function quot(firstOperand, secondOperand) {
    return firstOperand/secondOperand;
}

function multi(firstOperand, secondOperand) {
    return firstOperand*secondOperand;
}

function res(firstOperand, secondOperand) {

}



function clickPercentButton() {
    switсhModal();
    myModalHeader.innerHTML = percentHeader;
    myModalText.innerHTML = percentText;
}


function switсhModal() {
    myModal.classList.toggle('modal_hidden');
}

function clickHowToButton() {
    switсhModal();
    myModalHeader.innerHTML = howToHeader;
    myModalText.innerHTML = howToManual;
}

function clickAboutButton() {
    switсhModal();
    myModalHeader.innerHTML = aboutHeader;
    myModalText.innerHTML = aboutText;
}


// my debugging tool
function logAllVars() {
    console.log(`Display shows ${display.value}`);
    console.log(`operationMemory is ${operationMemory}`);
    console.log(`currentOperation is ${currentOperation}`);
    console.log(`newOperand is ${newOperand}`);
    console.log(`------------------------`);

}

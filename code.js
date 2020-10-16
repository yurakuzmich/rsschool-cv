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

let operationMemory = 0;
let currentOperation = '';
let newOperand = false;

window.onload = function () {
    //LISTENERS
    CEButton.addEventListener('click', clickCE);
    CButton.addEventListener('click', clickC);
    commaButton.addEventListener('click', clickComma);
    for (let i = 0; i <= actionButtons.length - 1; i++) {
        let actionButton = actionButtons[i];
        actionButton.addEventListener('click', clickActionButton);
    }
    for (let i = 0; i <= numbersButtons.length - 1; i++) {
        let numberButton = numbersButtons[i];
        numberButton.addEventListener('click', clickNumberButton);
    }
    percentButton.addEventListener('click', clickPercentButton);
    howToButton.addEventListener('click', clickHowToButton);
    aboutButton.addEventListener('click', clickAboutButton);
    myModalClose.addEventListener('click', switсhModal);
}

//FUNCTIONS
function clickCE() {
    display.value = 0;
    newOperand = true;
}

function clickC() {
    display.value = 0;
    operationMemory = 0;
    currentOperation = '';
    newOperand = true;
}

function clickComma() {

    if (newOperand === true) {
        display.value = '0.';
        newOperand = false;
    } else {
        if (display.value.indexOf('.') === -1) {
            display.value += '.';
        }
    }
}

function clickActionButton(event) {
    let localOperationMemory = display.value;
    if (newOperand === true && currentOperation !== '=') {
        display.value = operationMemory;
    } else {
        newOperand = true;
        if (currentOperation === '+') {
            operationMemory += +localOperationMemory;
        } else if (currentOperation === '-') {
            operationMemory -= +localOperationMemory;
        } else if (currentOperation === 'x') {
            operationMemory *= +localOperationMemory;
        } else if (currentOperation === '/') {
            operationMemory /= +localOperationMemory;
        } else {
            operationMemory = +localOperationMemory;
        }
        display.value = operationMemory;
        currentOperation = event.target.textContent;
    }
}



function clickNumberButton(event) {
    let pressedNumber = event.target.textContent;
    if (newOperand === true) {
        display.value = pressedNumber;
        newOperand = false;
    } else {
        if (display.value === '0') {
            display.value = pressedNumber;
        } else {
            display.value += pressedNumber;
        }
    }
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

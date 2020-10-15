const display = document.getElementById('calculator__display');

const CEButton = document.getElementById('ce');
const CButton = document.getElementById('c');
const actionButtons = document.querySelectorAll('.math_action');
const numbersButtons = document.querySelectorAll('.number');
const commaButton = document.getElementById('comma');
const switchNegativeButton = document.getElementById('switch-negative');
const resultButton = document.getElementById('result_button');
const howToButton = document.getElementById('howitwork-button');
const aboutButton = document.getElementById('about-button');
const myModal = document.getElementById('modal__wrapper');
const myModalClose = document.getElementById('modal_close');
const displayDigits = 9;

const myModalHeader = document.getElementById('modal__header');
const myModalText = document.getElementById('modal__text');

const howToHeader = 'Руководство пользователя';
const howToManual = '<p>C - полный сброс</p>' + 
                    '<p>CE - очистка дисплея. Число в памяти сохраняется</p>';

const aboutHeader = 'О программе';
const aboutText = '<p>Мощный, быстрый, продвинутый калькулятор.</p>' +
                    '<p>Надежные, сверхсовременные алгоритмы позволяют складывать, отнимать, умножать делить небольшие числа с небывалой точность!</p>';

let operationMemory = 0;
let isOperationStarted = false;
let currentOperation = '';
let currentValue = 0;
let newOperand = false;
let resultPressed = false;
let commaClicked = false;


window.onload = function () {
    //LISTENERS
    CEButton.addEventListener('click', clickCE);
    CButton.addEventListener('click', clickC);
    commaButton.addEventListener('click', clickComma);
    switchNegativeButton.addEventListener('click', clickNegativeButton);
    for (let i = 0; i <= actionButtons.length - 1; i++) {
        let actionButton = actionButtons[i];
        actionButton.addEventListener('click', clickActionButton);
    }
    for (let i = 0; i <= numbersButtons.length - 1; i++) {
        let numberButton = numbersButtons[i];
        numberButton.addEventListener('click', clickNumberButton);
    }
    resultButton.addEventListener('click', clickResultButton);
    howToButton.addEventListener('click', clickHowToButton);
    aboutButton.addEventListener('click', clickAboutButton);
    myModalClose.addEventListener('click', switсhModal);

    display.value = 0;
}


//FUNCTIONS
function clickCE() {
    display.value = 0;
    commaClicked = false;
    logAllVars();
}

function clickC() {
    display.value = 0;
    operationMemory = 0;
    isOperationStarted = false;
    currentOperation = '';
    currentValue = 0;
    commaClicked = false;
    logAllVars();
}

function clickComma() {
    if (commaClicked === false) {
        display.value = display.value + '.';
        commaClicked = true;
    } else if (resultPressed === true) {
        display.value = '0.';
        commaClicked = true;
    }
    logAllVars();
}

function clickActionButton(event) {

    isOperationStarted = true;
    currentOperation = event.target.textContent;
    newOperand = true;
    commaClicked = false;
    operationMemory = Number(display.value);
    logAllVars();
}

function clickNumberButton(event) {

    switch (isOperationStarted) {
        case true:
            if (newOperand === true) {
                display.value = '';
                newOperand = false;
            }
            if (display.value.length <= displayDigits) {
                display.value = Number(display.value += event.target.textContent);
            }
            break;
        case false:
            if (display.value === 0) {
                if (resultPressed == true) {
                    display.value += event.target.textContent;
                    resultPressed = false;
                    commaClicked = false;
                } else {
                    display.value += event.target.textContent;
                    commaClicked = false;
                }
            } else if (display.value.length <= displayDigits) {
                display.value = Number(display.value += event.target.textContent);
            }
            break;
    }
    logAllVars();
}

function clickNegativeButton() {
    display.value = (-1) * display.value;
    logAllVars();
}

function clickResultButton() {
    let result = 0;
    commaClicked = true;
    switch (currentOperation) {
        case '+':
            result = Number(operationMemory) + Number(display.value);
            break;
        case '-':
            result = Number(operationMemory) - Number(display.value);
            break;
        case 'x':
            result = Number(operationMemory) * Number(display.value);
            break;
        case '/':
            result = Number(operationMemory) / Number(display.value);
            result = String(result).slice(0, displayDigits);
            break;
        case '':
            result = 0;
            commaClicked = false;
            break;
        default:
            result = 0;
            commaClicked = false;
    }

    if (result.length > displayDigits) {
        result = result.slice(0, displayDigits);
    }

    display.value = result;
    operationMemory = result;
    isOperationStarted = false;
    currentOperation = '';
    currentValue = 0;
    newOperand = false;
    resultPressed = true;
    logAllVars();

}

function switсhModal() {
    myModal.classList.toggle('modal_hidden');
}

function clickHowToButton() {
    console.log('Howto button clicked');
    switсhModal();
    myModalHeader.innerHTML = howToHeader;
    myModalText.innerHTML = howToManual;
}

function clickAboutButton() {
    console.log('About button clicked');
    switсhModal();
    myModalHeader.innerHTML = aboutHeader;
    myModalText.innerHTML = aboutText;
}

function logAllVars() {
    console.log(`Display value is ${display.value}`);
    console.log(`Operation memory is ${operationMemory}`);
    console.log(`Operation started is ${isOperationStarted}`);
    console.log(`Current operation is ${currentOperation}`);
    console.log(`Current Value is ${currentValue}`);
    console.log(`New operand is ${newOperand}`);
    console.log(`Comma clicked is ${commaClicked}`);
    console.log(`Result pressed is ${resultPressed}`);
    console.log('-------------');
}  
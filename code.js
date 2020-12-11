const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    taskInput = document.getElementById('add-task'),
    taskList = document.getElementById('task-list'),
    amPm = document.getElementById('am-pm'),
    delSettings = document.getElementById('clear-storage'),
    infoButton = document.getElementById('info-tab'),
    closeModal = document.getElementById('modal__close'),
    modal = document.getElementById('modal__wrapper'),
    outputFields = document.querySelectorAll('.output-field'),
    listOfTasks = document.querySelector('.tasks');

let timeFormat = 24;

//listeners
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
taskInput.addEventListener('focus', function (event) {
    event.target.value = '';
});
taskInput.addEventListener('keypress', setTasks);
taskInput.addEventListener('blur', setTasks);
amPm.addEventListener('click', switchTimeFormat);
delSettings.addEventListener('click', clearSettings);
infoButton.addEventListener('click', function () {
    modal.style.top = '0';
});
closeModal.addEventListener('click', function () {
    modal.style.top = '-800px';
});

showTime();
setInterval(showTime, 1000);
setBackgroundImage();
getName();
getTasks();

function getTasks() {
    let output = '';
    if (localStorage.getItem('tasks') === null) {
        output = '';
    } else {
        output = localStorage.getItem('tasks');
    }
    listOfTasks.innerHTML = output;
    console.log(listOfTasks);
    addListenersToTasks();
}

function setTasks(event) {
    if (event.keyCode == 13) {
        let newTask = event.target.value;
        listOfTasks.insertAdjacentHTML('afterbegin', `<li class="singletask">${newTask}</li>`);
        console.log(listOfTasks);
        localStorage.setItem('tasks', listOfTasks.innerHTML);
        addListenersToTasks();
        taskInput.blur();
    }
}

function addListenersToTasks() {
    let singletaskList = document.querySelectorAll('.singletask');
    for (let i = 0; i < singletaskList.length; i++) {
        singletaskList[i].removeEventListener('click', markTaskAsDone);
        singletaskList[i].addEventListener('click', markTaskAsDone);
    }
}

function markTaskAsDone(event) {
    event.target.classList.toggle('done');
    localStorage.setItem('tasks', listOfTasks.innerHTML);

}

function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

function setName(event) {
    if (event.type === 'keypress') {
        if (event.keyCode == 13) {
            localStorage.setItem('name', event.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', event.target.innerText);
    }
}

function showTime() {
    let currTime = new Date();
    let userTime = '';
    let hours = currTime.getHours();
    let minutes = currTime.getMinutes();
    let seconds = currTime.getSeconds();
    let partOfTheDay = '';
    if (hours < 12) {
        partOfTheDay = 'AM'
    } else {
        partOfTheDay = 'PM';
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (timeFormat === 12) {
        if (hours > 12) {
            hours = hours - 12;
        }
        if (hours === 0) {
            hours = 12;
        }
    }
    userTime = `${hours}:${minutes}:${seconds}`;
    if (timeFormat === 12) {
        userTime += ` ${partOfTheDay}`;
    }
    time.innerHTML = userTime;
}

function switchTimeFormat() {
    switch (timeFormat) {
        case 12:
            timeFormat = 24;
            amPm.innerHTML = '<p>24/<span>12</span></p>';
            break;
        case 24:
            timeFormat = 12;
            amPm.innerHTML = '<p>12/<span>24</span></p>'
    }
}

function setBackgroundImage() {
    let currTime = new Date();
    let hours = currTime.getHours();
    if (hours >= 22 || hours < 6) {
        document.body.style.backgroundImage = 'url("images/night.jpg")';
        greeting.textContent = 'Good night, ';
        document.body.style.color = '#ffffff';
        document.body.style.backgroundColor = '#000000';
        taskInput.style.color = '#ffffff';
        taskInput.style.backgroundColor = '#000000';
        for (let i = 0; i < outputFields.length; i++) {
            console.log(outputFields[i]);
            outputFields[i].style.backgroundColor = '#000000';
        }
        console.log('its night');
    } else if (hours >= 6 && hours < 9) {
        document.body.style.backgroundImage = 'url("images/morning.jpg")';
        greeting.textContent = 'Good morning, ';
        document.body.style.color = '#000000';
        console.log('its morning');
    } else if (hours >= 9 && hours < 16) {
        document.body.style.backgroundImage = 'url("images/day.jpg")';
        greeting.textContent = 'Good day, ';
        document.body.style.color = '#000000';
        console.log('its day');
    } else if (hours >= 16 && hours < 22) {
        document.body.style.backgroundImage = 'url("images/evening.jpg")';
        greeting.textContent = 'Good evening, ';
        document.body.style.color = '#000000';
    }
}

function clearSettings() {
    localStorage.removeItem('tasks');
    getName();
    getTasks();
}
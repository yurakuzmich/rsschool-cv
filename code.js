const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    myFocus = document.getElementById('focus'),
    amPm = document.getElementById('am-pm');
    delSettings = document.getElementById('clearstorage');

let timeFormat = 24;

//listeners
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
myFocus.addEventListener('keypress', setTask);
myFocus.addEventListener('blur', setTask);
amPm.addEventListener('click', switchTimeFormat);
delSettings.addEventListener('click', clearSettings);
showTime();
setInterval(showTime, 1000);
setBackgroundImage();
getName();
getTask();


function getTask() {
    if (localStorage.getItem('task') === null) {
        myFocus.textContent = '[Enter Task]';
    } else {
        myFocus.textContent = localStorage.getItem('task');
    }
}

function setTask(event){
    if (event.type === 'keypress') {
        // Make sure enter is pressed
        if (event.keyCode == 13) {
            localStorage.setItem('task', event.target.innerText);
            myFocus.blur();
        }
    } else {
        localStorage.setItem('task', event.target.innerText);
    }
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
        // Make sure enter is pressed
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
        hours = hours - 12;
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

        console.log('its day');
    }
}

function clearSettings() {
    localStorage.clear();
    getName();
    getTask();
}


navigator.geolocation.getCurrentPosition(function(position) {
    let myLat = position.coords.latitude;
    let myLng = position.coords.longitude;
    console.log(myLat + ' + ' + myLng);
});





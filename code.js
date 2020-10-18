const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    amPm = document.getElementById('am-pm');

let timeFormat = 24;
console.log(`time is ${time} \n greeting is ${greeting} \n name is ${name} \n focus is ${focus}`);

//listeners
amPm.addEventListener('click', switchTimeFormat);
showTime();
setInterval(showTime, 1000);
setBackgroundImage();


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
    if (hours >=22 || hours < 6) {
        document.body.style.backgroundImage = 'url("images/night.jpg")';
        greeting.textContent = 'Good night, ';
        document.body.style.color = '#ffffff';
        console.log('its night');
    } else if (hours >= 6 && hours < 9) {
        document.body.style.backgroundImage = 'url("images/morning.jpg")';
        greeting.textContent = 'Good morning, ';
        document.body.style.color = '#000000';
        console.log('its morning');
    } else if (hours >= 9 && hours < 18) {
        document.body.style.backgroundImage = 'url("images/day.jpg")';
        greeting.textContent = 'Good day, ';
        document.body.style.color = '#000000';
        console.log('its day');
    } else if (hours >= 18 && hours < 22) {
        document.body.style.backgroundImage = 'url("images/evening.jpg")';
        greeting.textContent = 'Good evening, ';
        document.body.style.color = '#ffffff';
        
        console.log('its day');
    }


    switch (hours) {
        case hours < 24:
            document.body.style.backgroundImage = 'url("images/night.jpg")';
            
            console.log('its night');
            break;
        case hours < 21:
            document.body.style.backgroundImage = 'url("images/evening.jpg")';
            console.log('its evening');
            break;
        case hours < 18:
            document.body.style.backgroundImage = 'url("images/day.jpg")';
            console.log('its day');
            break;
        case hours < 10:
            document.body.style.backgroundImage = 'url("images/morning.jpg")';
            console.log('its morning');
            break;
        case hours < 6:
            document.body.style.backgroundImage = 'url("images/night.jpg")';
            console.log('its night');
            break;
    }
}
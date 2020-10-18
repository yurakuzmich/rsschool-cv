const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');

let timeFormat = 24;
console.log(`time is ${time} \n greeting is ${greeting} \n name is ${name} \n focus is ${focus}`);
showTime();
setInterval(showTime, 1000);
function showTime() {
    let currTime = new Date();
    let userTime = '';
    let hours = currTime.getHours();
    let minutes = currTime.getMinutes();
    let seconds = currTime.getSeconds();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if(timeFormat === 12) {
        hours = hours - 12;
        if(hours === 0) {
            hours = 12;
        }
    }
    userTime = `${hours}:${minutes}:${seconds}`;
    time.innerHTML = userTime;
}
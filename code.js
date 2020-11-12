//Settings
const minSpeed = 0.5;
const maxSpeed = 3;
let isDragStarted = false;

const speedControll = document.querySelector('.speedcontrol');
const speedControllFilled = document.querySelector('.speedcontrol_filled');
const video = document.querySelector('video');
const speedvalue = document.querySelector('.speedvalue');

//Listeners
speedControll.addEventListener('mousedown', (e) => {
    isDragStarted = true;
    renderSpeedControl(e);
});
speedControll.addEventListener('mouseup', () => {
    isDragStarted = false;
});
speedControll.addEventListener('mouseout', () => {
    isDragStarted = false;
});
speedControll.addEventListener('mousemove', (e) => {
    if(isDragStarted) renderSpeedControl(e);
})

//Functions
function renderSpeedControl (e) {
    console.log(e);
    let percent = (e.offsetY / 700);
    if(percent > 0.99) percent = 1;
    speedControllFilled.style.height = percent * 100 + '%';
    setVideoSpeed(minSpeed + (maxSpeed - minSpeed) * percent);
    showSpeedValue (percent);
}

function showSpeedValue (val) {
    speedvalue.style.top = (val * 700) - 25 + 'px'; // For more responcive usage we can  use variables
    speedvalue.textContent = (minSpeed + (maxSpeed - minSpeed) * val).toFixed(1);

}

function setVideoSpeed(speed) {
    video.playbackRate = speed;
}

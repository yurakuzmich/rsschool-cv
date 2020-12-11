//Settings
const minSpeed = 0.5;
const maxSpeed = 3;
let isDragStarted = false;

const speedControl = document.querySelector('.speed-control');
const speedControlFilled = document.querySelector('.speed-control_filled');
const video = document.querySelector('video');
const speedValue = document.querySelector('.speed-value');
console.log(speedControl.offsetWidth);
//Listeners
speedControl.addEventListener('mousedown', (e) => {
    isDragStarted = true;
    renderSpeedControl(e);
});
speedControl.addEventListener('mouseup', () => {
    isDragStarted = false;
});
speedControl.addEventListener('mouseout', () => {
    isDragStarted = false;
});
speedControl.addEventListener('mousemove', (e) => {
    if(isDragStarted) renderSpeedControl(e);
})

//Functions
function renderSpeedControl (e) {
    console.log(e);
    let percent = (e.offsetY / speedControl.offsetHeight);
    if(percent > 0.99) percent = 1;
    speedControlFilled.style.height = percent * 100 + '%';
    setVideoSpeed(minSpeed + (maxSpeed - minSpeed) * percent);
    showSpeedValue (percent);
}

function showSpeedValue (val) {
    speedValue.style.top = (val * 700) - 25 + 'px'; // For more responcive usage we can  use variables
    speedValue.textContent = (minSpeed + (maxSpeed - minSpeed) * val).toFixed(1);

}

function setVideoSpeed(speed) {
    video.playbackRate = speed;
}

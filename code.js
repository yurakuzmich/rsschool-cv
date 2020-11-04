const buttonPlay = document.getElementById('play');
const video = document.getElementById('video');
const buttonsOffset = document.querySelectorAll('.timeoffset');
const fullScreen = document.querySelector('.fullscreen');
const progressbarAll = document.querySelector('.progressbar');
const progressbar = document.querySelector('.progressbar_filled');
const volume = document.getElementById('volume');
const volumeValue = document.getElementById('volume_value');
const playbackRate = document.getElementById('speed');
const playbackRateValue = document.getElementById('speed_value');

//Set Default values
let rewindIsStarted = false;
let myInterval;
video.volume = volume.value;
video.playbackRate = playbackRate.value;
volumeValue.textContent = (video.volume).toFixed(2);
playbackRateValue.textContent = (video.playbackRate).toFixed(2);

//Listeners
video.addEventListener('play', changePlayButton);
video.addEventListener('pause', changePlayButton);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', renderProgressbar);
progressbarAll.addEventListener('mousedown', (e) => {
    progressClick(e);
    rewindIsStarted = true;
});
progressbarAll.addEventListener('mouseup', () => {
    rewindIsStarted = false;
});
progressbarAll.addEventListener('mouseout', () => {
    rewindIsStarted = false;
});
progressbarAll.addEventListener('mousemove', (e) => {
    if (rewindIsStarted) { progressClick(e); }
});
buttonPlay.addEventListener('click', togglePlay);
volume.addEventListener('change', setVolume);
volume.addEventListener('input', setVolume);
playbackRate.addEventListener('change', setSpeed);
playbackRate.addEventListener('input', setSpeed);
fullScreen.addEventListener('click', toggleFullScreen);
buttonsOffset.forEach((el) => {
    el.addEventListener('click', offsetVideo);
});

//Functions
function togglePlay() {
    const act = video.paused ? 'play' : 'pause';
    video[act]();
}

function changePlayButton() {
    let symbol = video.paused ? '⊳' : '||';
    buttonPlay.textContent = symbol;
}

function setVolume(e) {
    video.volume = e.target.value;
    volumeValue.textContent = (video.volume).toFixed(2);
}

function setSpeed(e) {
    video.playbackRate = e.target.value;
    playbackRateValue.textContent = (video.playbackRate).toFixed(2);
}

function offsetVideo() {
    let offset = parseFloat(this.dataset.timeoffset);
    video.currentTime += offset;
}

function toggleFullScreen() {

    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

function renderProgressbar() {
    let percent = (video.currentTime / video.duration) * 100;
    progressbar.style.width = `${percent}%`;
}

function progressClick(e) {
    let percent = (e.offsetX / 1280) * 100;
    progressbar.style.width = `${percent}%`;
    video.currentTime = (video.duration / 100) * percent;
}


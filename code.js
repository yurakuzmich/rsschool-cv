const buttonPlay = document.getElementById('play');
const video = document.getElementById('video');
const buttonsOffset = document.querySelectorAll('.timeoffset');
const progressbar = document.querySelector('.progressbar_filled');
const clock = document.querySelector('.clock');

//Listeners
video.addEventListener('play', changePlayButton);
video.addEventListener('pause', changePlayButton);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', renderProgressbar);
buttonPlay.addEventListener('click', togglePlay);
buttonsOffset.forEach((el) => {
    el.addEventListener('click', videoOffset);
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

function videoOffset() {
    let offset = parseFloat(this.dataset.timeoffset);
    video.currentTime += offset;
}

function renderProgressbar() {
    let percent = (video.currentTime / video.duration) * 100;
    progressbar.style.width = `${percent}%`;
}

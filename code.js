const panels = document.querySelectorAll('.panel');
const playButton = document.querySelector('.play i');
const stopButton = document.querySelector('.stop i');
const replayButton = document.querySelector('.replay i');
const song = document.querySelector('.chinasong');
const meters = document.querySelectorAll('svg[data-value] .meter');

playButton.addEventListener('click', playMusic);
stopButton.addEventListener('click', stopMusic);
replayButton.addEventListener('click', rePlayMusic);
for (let i = 0; i < panels.length; i++) {
    panels[i].addEventListener('click', setActive);
}
setInterval(renderProgressBar, 1000);

function playMusic(event) {
    if (song.currentTime === 0) {
        song.play();
        event.target.classList.remove('fa-play');
        event.target.classList.add('fa-pause');
    } else if (song.paused) {
        song.play();
        event.target.classList.remove('fa-play');
        event.target.classList.add('fa-pause');
    } else {
        song.pause();
        event.target.classList.remove('fa-pause');
        event.target.classList.add('fa-play');
    }
}

function stopMusic() {
    song.pause();
    song.currentTime = 0;
    playButton.classList.remove('fa-pause');
    playButton.classList.add('fa-play');
}

function rePlayMusic(event) {
    if (!song.loop) {
        song.loop = true;
        event.target.classList.toggle('control_active');
    } else {
        song.loop = false;
        event.target.classList.toggle('control_active');
    }
}

function setActive(event) {
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    event.target.classList.toggle('active');
}

function renderProgressBar() {
    if (song.ended && replayButton.classList.contains('control_active') === false) {
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
    }
    meters.forEach((path) => {
        // Get the length of the path
        let length = path.getTotalLength();
        let progress = 100 - Math.floor((song.currentTime / song.duration) * 100);

        path.style.strokeDashoffset = length / 100 * progress;
    });
}


const keys = document.querySelectorAll('.key');


console.log(keys);


window.addEventListener('keydown', playSound);
for(let i = 0; i < keys.length; i++) {
    console.log(keys[i]);
    keys[i].addEventListener('click', playSoundOnKlick);
    keys[i].addEventListener('transitionend', removeKeyStyle);
    
}

function playSoundOnKlick(event) {
    let dataKey = event.target.dataset.key;
    console.log(dataKey);
    let audio = document.querySelector(`audio[data-key="${dataKey}"]`);
    let key = document.querySelector(`.key[data-key="${dataKey}"]`);
    //Audio
    if (!audio) {
        return;
    }
    audio.currentTime = 0;
    audio.play();
    //Key changing
    key.classList.add('pressed');
}

function playSound(event) {
    let audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    let key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
    //Audio
    if (!audio) {
        return;
    }
    audio.currentTime = 0;
    audio.play();
    //Key changing
    key.classList.add('pressed');
}

function removeKeyStyle(event) {
    console.log('HI');
    event.target.classList.remove('pressed');
}
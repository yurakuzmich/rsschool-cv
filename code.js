const keys = document.querySelectorAll('.key');

//Listeners

//This is for playing, using keyboard keys from 1 to 7
window.addEventListener('keydown', playSound);

//This one is for playing, using mouse and for animate keys
for(let i = 0; i < keys.length; i++) {
    console.log(keys[i]);
    keys[i].addEventListener('mousedown', playSoundOnKlick);
    keys[i].addEventListener('transitionend', removeKeyStyle);
}

//This custom function plays musiс on mouse-click
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
    //Key animation 
    key.classList.add('pressed');
}

//Default function for playing, using keyboard keys from 1 to 7
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

//This function is to animate keys
function removeKeyStyle(event) {
    console.log('HI');
    event.target.classList.remove('pressed');
}
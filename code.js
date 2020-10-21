const keys = document.querySelectorAll('.key');


console.log(keys);


window.addEventListener('keydown', playSound);
for(let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('transitionend', removeKeyStyle);
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
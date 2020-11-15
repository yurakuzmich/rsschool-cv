//Buttons
const buttonNewGame = document.getElementById('button_new-game');
const buttonHowToPlay = document.getElementById('button_howtoplay');
const buttonHighscore = document.getElementById('button_highscore');
const buttonSettings = document.getElementById('button_settings');
const buttonToMainMenu = document.getElementById('button_to-mainmenu');

//Views
const viewMainMenu = document.getElementById('view_mainmenu');
const viewGame = document.getElementById('view_game');
const viewHowToPlay = document.getElementById('view_howtoplay');
const viewHighscore = document.getElementById('view_highscore');
const viewSetings = document.getElementById('view_settings');
const topMenu = document.getElementById('topmenu');


//Event-listeners

viewMainMenu.addEventListener('click', (e) => {
    console.log(e.target.dataset.page);

    let elementToShow = document.getElementById(e.target.dataset.page);
    elementToShow.scrollIntoView({
        behavior: 'smooth'
    });

    topMenu.style.display = 'flex';
});

buttonToMainMenu.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    topMenu.style.display = 'none';
});
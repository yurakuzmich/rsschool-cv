window.onload = function() {
    
    // window.addEventListener('scroll', setBackBtnPosition);
    
    // const slider = document.querySelector('.slider');
    // slider.addEventListener('click', toggleSliderClass);
    addEventListenersToMenu();

    // const toTopButton = document.querySelector("#back-to-top-button");
    // toTopButton.addEventListener('click', goToTop);
}

function toggleSliderClass() {
    let slider = document.querySelector('.slider');
    slider.classList.toggle('slider_alternate');
}
/*
function toggleToTopBtnVisibilyty() {
    let toTopBtn = document.getElementById('back-to-top-button');
    toTopBtn.style.top = 'calc(100% - 50px)';
    toTopBtn.style.opacity = 1;
}

function goToTop() {
    topElement = document.querySelector('#header');
    topElement.scrollIntoView({block: "start", behavior: "smooth"});
    let toTopBtn = document.getElementById('back-to-top-button');
    toTopBtn.style.opacity = 0;
}

function setBackBtnPosition() {
    let toTopBtn = document.getElementById('back-to-top-button');
    toTopBtn.style.top = 'calc(100vw - 100px)';
}
*/
function addEventListenersToMenu() {
    let menu = document.querySelectorAll('.main-navigation-menu__item a');
    for(let link of menu) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            let target = link.getAttribute('href').substr(1);
            if(target === '') {
                target = 'header';
            }
            let el = document.querySelector('.' + target);
            console.log('Going to... ' + target);
            el.scrollIntoView({block: "start", behavior: "smooth"});
            // let toTopBtn = document.querySelector('#back-to-top-button');
            // console.log('Top btn is ' + toTopBtn);
            // setTimeout(toggleToTopBtnVisibilyty, 1500);
            // setTimeout(setBackBtnPosition, 1500);

            // toggleToTopBtnVisibilyty();
            // setBackBtnPosition();
        });
    }
}

//Slider functions
function findAllImages() {
    
}


window.onload = function() {
    const slider = document.querySelector('.slider');
    slider.addEventListener('click', toggleSliderClass);

    //add Listeners to menu
    const mainMenu = document.querySelector(".main-navigation");
    mainMenu.addEventListener('click', (event) => {
        event.preventDefault();
        // console.log(event.target.tagName);
        let clickedElement = event.target;
        if(clickedElement.tagName === 'A') {
            slideToClickedElement(clickedElement);
        }
        // let toTopButton = document.getElementById('to-top-button');
        // toTopButton.classList.toggle('to-top-button_hidden');
    });

    //add Listeners to burger menu
    const burgerMenu = document.querySelector('.burger-menu_box');
    burgerMenu.addEventListener('click', function(event) {
        event.preventDefault();
        let clickedElement = event.target;
        if(clickedElement.tagName === 'A') {
            slideToClickedElement(clickedElement);
            let burgerMenuCheckbox = document.getElementById('burger-menu__toggle');
            burgerMenuCheckbox.checked = false;
        }
        // console.log(event.target.tagName);
    });

    //addListener toTopButton 
    // const toTopButton = document.getElementById('to-top-button');
    // toTopButton.addEventListener('click', goToTopOfPage);
}

function toggleSliderClass() {
    let slider = document.querySelector('.slider');
    slider.classList.toggle('slider_alternate');
}

function slideToClickedElement(sliderTarget) {
    let targetHref = sliderTarget.getAttribute('href').substr(1);
    target = document.getElementById(targetHref);
    if(target === null) {
        target = document.getElementById('header');
    }
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// function goToTopOfPage(event) {
//     let target = document.getElementById('header');
//     let toTopButton = event.target;
//     target.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//     });
//     toTopButton.classList.toggle('to-top-button_hidden');
// }
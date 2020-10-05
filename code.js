window.onload = function() {
    const slider = document.querySelector('.slider');
    slider.addEventListener('click', toggleSliderClass);

    //add Listeners to menu
    const mainMenu = document.querySelector(".main-navigation");
    mainMenu.addEventListener('click', (event) => {
        event.preventDefault();
        let clickedElement = event.target;
        slideToClickedElement(clickedElement);
    });

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
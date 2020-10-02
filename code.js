window.onload = function() {
    const slider = document.querySelector('.slider');
    slider.addEventListener('click', toggleSliderClass)
}

function toggleSliderClass() {
    let slider = document.querySelector('.slider');
    slider.classList.toggle('slider_alternate');
}
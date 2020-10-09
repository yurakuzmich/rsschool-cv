$(document).ready(function(){
    $('.slider-window').bxSlider();
  });

window.onload = function() {

    //Add listeners for scrolling
    document.addEventListener('scroll', onScroll);

    //add Listeners to menu
    const mainMenu = document.querySelector(".main-navigation");
    mainMenu.addEventListener('click', (event) => {
        event.preventDefault();
        let clickedElement = event.target;
        if(clickedElement.tagName === 'A') {
            slideToClickedElement(clickedElement);
            setActiveMenuItem(clickedElement);
        }
    });

    //add Listeners to burger menu
    const burgerMenu = document.querySelector('.burger-menu_box');
    burgerMenu.addEventListener('click', (event) => {
        event.preventDefault();
        let clickedElement = event.target;
        if(clickedElement.tagName === 'A') {
            slideToClickedElement(clickedElement);
            let burgerMenuCheckbox = document.getElementById('burger-menu__toggle');
            burgerMenuCheckbox.checked = false;
        }
    });

    //add listener to portfolio tags
    const portfolioTags = document.querySelector('.portfolio-head-tags');
    portfolioTags.addEventListener('click', function(event) {
        event.preventDefault();
        let clickedElement = event.target;
        if(clickedElement.tagName === 'A') {
            shufflePortfolio();
            setActiveTag(clickedElement);
        }
    });
}

function slideToClickedElement(sliderTarget) {
    let targetHref = sliderTarget.getAttribute('href').substr(1);
    target = document.getElementById(targetHref);
    if(target === null) {
        target = document.getElementById('wrapper');
    }
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}


//SHUFFLE PORTFOLIO IMAGES
function shufflePortfolio() {
    let portfolioImages = document.querySelectorAll('.portfolio-images-list__item');
    let portfolioImagesArray = Array.prototype.slice.call(portfolioImages);
    for(let i = portfolioImagesArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let t = portfolioImagesArray[i];
        portfolioImagesArray[i] = portfolioImagesArray[j];
        portfolioImagesArray[j] = t;
    }
    let portfolioImagesList = document.querySelector('.portfolio-images-list');
    let newInnerHtml = '';
    for(let i = 0; i < portfolioImagesArray.length; i++) {
        newInnerHtml += portfolioImagesArray[i].outerHTML;
    }
    portfolioImagesList.innerHTML = newInnerHtml;
}

function setActiveTag(targetElement){
   let currentSelectedElement = document.querySelector('.portfolio-head-tags__item_selected');
   currentSelectedElement.classList.remove('portfolio-head-tags__item_selected');
    targetElement.classList.add('portfolio-head-tags__item_selected');
}

function setActiveMenuItem(targetElement) {
    let currentSelectedElement = document.querySelector('.main-navigation-menu__item_active');
    currentSelectedElement.classList.remove('main-navigation-menu__item_active');
     targetElement.classList.add('main-navigation-menu__item_active');
 }

 function onScroll() {
    const currentPosition = window.scrollY + 96;
    const divs = document.querySelectorAll('#main > div > div');
    const links = document.querySelectorAll('.main-navigation-menu__item');
    
    divs.forEach((el) => {

        if(el.offsetTop <= currentPosition && (el.offsetTop + el.offsetHeight) > currentPosition) {
            links.forEach((a) => {
                a.classList.remove('main-navigation-menu__item_active');
                if(el.getAttribute('id') === a.getAttribute('href').substr(1)) {
                    a.classList.add('main-navigation-menu__item_active');
                }
            });
        }

    });
 }
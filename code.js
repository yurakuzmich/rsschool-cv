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

    //add listener to portfolio tags
    const portfolioTags = document.querySelector('.portfolio-head-tags');
    portfolioTags.addEventListener('click', function(event) {
        event.preventDefault();
        let clickedElement = event.target;
        if(clickedElement.tagName === 'A') {
            // shufflePortfolio();
            shufflePortfolioByOrder();
            setActiveTag(clickedElement);
        }
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
        target = document.getElementById('wrapper');
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

//SHUFFLE PORTFOLIO IMAGES
function shufflePortfolio() {
    let portfolioImages = document.querySelectorAll('.portfolio-images-list__item');
    // console.log(portfolioImages);
    for(let i = portfolioImages.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let t = portfolioImages[i];
        portfolioImages[i] = portfolioImages[j];
        portfolioImages[j] = t;
        // [portfolioImages[i], portfolioImages[j]] = [portfolioImages[j], portfolioImages[i]];
    }
    
    let portfolioImagesList = document.querySelector('.portfolio-images-list');
    let newInnerHtml = '';
    for(let i = 0; i < portfolioImages.length; i++) {
        newInnerHtml += portfolioImages[i];
        console.log(portfolioImages[i]);
    }
    portfolioImagesList.innerHTML = newInnerHtml;
}

function shufflePortfolioByOrder() {
    let portfolioImages = document.querySelectorAll('.portfolio-images-list__item');
    for(let i = 0; i < portfolioImages.length; i++) {
        portfolioImages[i].style.order = Math.floor(100 * Math.random());
        portfolioImages[i].style.margin = '0 20px 20px 0';
    }
}

function setActiveTag(targetElement){
   let currentSelectedElement = document.querySelector('.portfolio-head-tags__item_selected');
//    console.log(currentSelectedElement);
   currentSelectedElement.classList.remove('portfolio-head-tags__item_selected');
    targetElement.classList.add('portfolio-head-tags__item_selected');
}
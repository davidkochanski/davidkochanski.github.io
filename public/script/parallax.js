const aboutMe = document.getElementById("about-me-content");
const heroWords = document.getElementById("home");

const NUM_SCROLL_PAGES = 3.0;
const TITLE_PADDING_PX = 10; // this is for the title-thin thing in index.html

const above = document.getElementById("physics-wrapper");
const fixedWrapper = document.getElementById("fixed");
const heroPadding = document.querySelector(".hero-padding-top");


const update = () => {
    heroPadding.style.paddingTop = `calc(${(NUM_SCROLL_PAGES) * 100}vh - ${TITLE_PADDING_PX}px)`
    updateMask();
    parallaxify(fixedWrapper);
}

document.addEventListener("scroll", update);
document.addEventListener("resize", update);

update();



function parallaxify(element) {
    const scrollPosition = window.scrollY;
    // const windowHeight = heroWords.offsetHeight; // Important!!!
    const windowHeight = window.innerHeight;


    if (scrollPosition <= windowHeight) {
        element.style.position = 'absolute';

        element.style.marginTop = `${windowHeight - scrollPosition}px`;
    }

    if (scrollPosition >= windowHeight) {
        element.style.position = 'absolute';
        element.style.top = (NUM_SCROLL_PAGES + 1) * windowHeight + 'px';
        element.style.marginTop = 0;
    }

    // When the user scrolls back up, make the element fixed again
    if (scrollPosition < (NUM_SCROLL_PAGES + 1) * windowHeight) {
        element.style.position = 'fixed';
        element.style.top = '0';
    }
}

function updateMask() {
    let MIN = 0.6 * window.innerHeight;
    let MAX = 10000;

    let scrollPercentage = (window.scrollY - window.innerHeight) / (3 * window.innerHeight);
    let maskSize = scrollPercentage * (MAX - MIN) + MIN;
    maskSize = Math.min(Math.max(maskSize, MIN), MAX);

    aboutMe.style.maskSize = `${maskSize}px`;
    aboutMe.style.webkitMaskSize = `${maskSize}px`;
}

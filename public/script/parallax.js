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
    const windowHeight = document.documentElement.clientHeight;
    const fixedStart = windowHeight; // start at 100vh
    const fixedEnd = fixedStart + NUM_SCROLL_PAGES * windowHeight;

    // before element is reached leave it alone
    if (scrollPosition < fixedStart) {
        element.style.position = "relative";
        element.style.top = '0px';
        element.style.marginTop = '0px';

    // then fix the element to the screen for X pages of scroll
    } else if (scrollPosition >= fixedStart && scrollPosition <= fixedEnd) {
        element.style.position = 'fixed';
        element.style.top = '0px';
        element.style.marginTop = '0px';

    // finally let the element go again after X pages
    } else if (scrollPosition > fixedEnd) {
        element.style.position = 'absolute';
        element.style.top = fixedEnd + 'px';
        element.style.marginTop = '0px';
    }
}


function updateMask() {
    const windowHeight = document.documentElement.clientHeight;

    let MIN = 0.6 * windowHeight;
    let MAX = 10000;

    let scrollPercentage = (window.scrollY - windowHeight) / (3 * windowHeight);
    let maskSize = scrollPercentage * (MAX - MIN) + MIN;
    maskSize = Math.min(Math.max(maskSize, MIN), MAX);

    aboutMe.style.maskSize = `${maskSize}px`;
    aboutMe.style.webkitMaskSize = `${maskSize}px`;
}

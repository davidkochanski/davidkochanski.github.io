const aboutMe = document.getElementById("about-me");
const heroWords = document.getElementById("home");

const NUM_SCROLL_PAGES = 3.0;


const fixedWrapper = document.getElementById("fixed");

const heroPadding = document.querySelector(".hero-padding-top");

updateMask();
parallaxify(fixedWrapper);


document.addEventListener("scroll", () => {
    updateMask();

    heroPadding.style.paddingTop = `${NUM_SCROLL_PAGES * 100}vh`
})

document.addEventListener("resize", () => {
    heroPadding.style.paddingTop = `${NUM_SCROLL_PAGES * 100}vh`
})


document.addEventListener("scroll", () => {
    // parallaxify(aboutMe);
    // parallaxify(heroWords);
    parallaxify(fixedWrapper);

    // console.log(aboutMe.offsetHeight);
})

function parallaxify(element) {
    const scrollPosition = window.scrollY;
    const windowHeight = heroWords.offsetHeight; // Important!!!

    if (scrollPosition >= windowHeight) {
      element.style.position = 'absolute';
      element.style.top = NUM_SCROLL_PAGES * windowHeight + 'px';
    }
    
    // When the user scrolls back up, make the element fixed again
    if (scrollPosition < NUM_SCROLL_PAGES * windowHeight) {
      element.style.position = 'fixed';
      element.style.top = '0px';
    }
}

function updateMask() {
    let MIN = 0.6 * window.innerHeight;
    let MAX = 10000;

    let scrollPercentage = window.scrollY / (3 * window.innerHeight);
    let maskSize = scrollPercentage * (MAX - MIN) + MIN;
    maskSize = Math.min(Math.max(maskSize, MIN), MAX);

    aboutMe.style.maskSize = `${maskSize}px`;
    aboutMe.style.webkitMaskSize = `${maskSize}px`;
}

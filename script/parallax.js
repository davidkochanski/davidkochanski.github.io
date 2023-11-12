const aboutMe = document.getElementById("about-me");
const heroWords = document.getElementById("home");

const fixedWrapper = document.getElementById("fixed");

updateMask();
parallaxify(fixedWrapper);


// Change mask size on scroll
document.addEventListener("scroll", () => {
    updateMask();
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
      element.style.top = 1.50 * windowHeight + 'px';
    }
    
    // When the user scrolls back up, make the element fixed again
    if (scrollPosition < 1.50 * windowHeight) {
      element.style.position = 'fixed';
      element.style.top = '0px';
    }
}

function updateMask() {
    let MIN = 0.6 * window.innerHeight;
    let MAX = 6000;

    let scrollPercentage = window.scrollY / (3 * window.innerHeight);
    let maskSize = scrollPercentage * (MAX - MIN) + MIN;
    maskSize = Math.min(Math.max(maskSize, MIN), MAX);

    aboutMe.style.maskSize = `${maskSize}px`;
    aboutMe.style.webkitMaskSize = `${maskSize}px`;
}

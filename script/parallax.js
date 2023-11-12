const aboutMe = document.getElementById("about-me");
const heroWords = document.getElementById("home");



// Change mask size on scroll
document.addEventListener("scroll", () => {
    let MIN = 0.6 * window.innerHeight;
    let MAX = 6000;

    let scrollPercentage = window.scrollY / (3 * window.innerHeight);
    let maskSize = scrollPercentage * (MAX - MIN) + MIN;
    maskSize = Math.min(Math.max(maskSize, MIN), MAX);

    aboutMe.style.maskSize = `${maskSize}px`;
    aboutMe.style.webkitMaskSize = `${maskSize}px`;
})


document.addEventListener("scroll", () => {
    parallaxify(aboutMe);
    parallaxify(heroWords);
    // parallaxify(heroButton);
})

function parallaxify(element) {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // When the user scrolls down and reaches the end of one page height,
    // fix the position of the element to that scroll position
    if (scrollPosition >= windowHeight) {
      element.style.position = 'absolute';
      element.style.top = 2 * windowHeight + 'px';
    }
    
    // When the user scrolls back up, make the element fixed again
    if (scrollPosition < 2 * windowHeight) {
      element.style.position = 'fixed';
      element.style.top = '0px';
    }
}
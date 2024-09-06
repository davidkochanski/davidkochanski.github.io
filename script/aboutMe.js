import { MOBILE_WIDTH_THRESHOLD, NUM_SCROLL_PAGES_PARALLAX, shouldReduceMotion } from "../../src/config";

const aboutMeContainer = document.getElementById("about-me-container");
aboutMeContainer.style.opacity = 0;
const heroButton = document.getElementById("hero-button");
const aboutMeBackground = document.getElementById("about-me-background");
let animation;
let buttonAnimation;

const header = document.querySelector("#about-me-content h2");
// const headerText = header.innerText;
const headerText = "";

// header.innerText = "";

const subHeader = document.querySelector("#about-me-content h4");
const bar = document.querySelector("#about-me-content .bar");

const rows = Array.from(document.querySelectorAll("#about-me-content .hero-content .hero-row"));

let isShowingAboutMe = false;
let nextShowingAboutMe = false;
aboutMeBackground.style.zIndex = 100000;


const firstName = document.querySelector(".top-name");
const lastName = document.querySelector(".bottom-name");

const box = document.querySelector(".hero-box");
const darken = document.querySelector(".about-me-darken");

const titles = document.querySelector(".after-first-name-desktop");
const titlesMobile = document.querySelector(".after-first-name-mobile");

const about = document.querySelector("#about-me-container");

const animateHero = () => {
    animateName();
    animateAfterFirstName();
    darkenEffect();
    parallaxTitle();
}

const animate = () => {
    animateHero();
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);


document.addEventListener("scroll", () => {
    updateAboutMe();
    animateHero();
})

updateAboutMe();



/**
 * Calculates the percentage completion of an element's animation depending on the scroll distance.
 * 
 * The function takes in the page interval that the animation takes place on,
 * with an option to add polynomial easing out.
 * 
 * @param {number} startScroll Number of pages scrolled to begin animation (0%)
 * @param {number} endScroll Number of pages scrolled when animation ends (100%)
 * @param {number} easingExponent Exponent of polynomial easing function (default 1; no ease)
 * @returns a percent value in [0, 100]
 */
function getAnimationPercent(startScroll, endScroll, easingExponent=1) {
    // linear transition, rise over run slope depending on scroll points
    // transitions from 0 at start to 1 at end linearly, also shifted horizontally.

    startScroll += 1
    endScroll += 1
    let percentRevealed = (((1 - 0) / ((endScroll - startScroll) * window.innerHeight)) 
                          * (window.scrollY - startScroll * window.innerHeight));

    percentRevealed = Math.max(0, Math.min(percentRevealed, 1)) // Clamp to [0,1]
    percentRevealed = 1 - (1 - percentRevealed)**easingExponent; // ease
    percentRevealed *= 100; // convert to %

    return percentRevealed;
}


function animateName() {
    const percentRevealed = getAnimationPercent(0, 1.2, 2)

    const THRESHOLD = document.documentElement.clientWidth  / 100;

    firstName.style.translate = `${THRESHOLD * (100 - percentRevealed)}px 0`;
    lastName.style.translate = `${THRESHOLD * -(100 - percentRevealed)}px 0`;
}

function darkenEffect() {
    const percentRevealed = getAnimationPercent(1.7, 3.5, 6);

    box.style.scale = `${percentRevealed / 100}`;
    box.style.translate = `0 ${-(100 - percentRevealed)}px`;

    darken.style.opacity = `${((percentRevealed / 1.3) / 100)}`
}

function animateAfterFirstName() {
    const percentRevealed = getAnimationPercent(0.7, 1.7, 2);

    const THRESHOLD = window.innerHeight / 100;

    titles.style.translate = `0 ${THRESHOLD * -(100 - percentRevealed)}px`;
    titles.style.scale = (percentRevealed / 100);
    titles.style.rotate = `${Math.PI * (1 - (percentRevealed / 100))}rad`;

    titlesMobile.style.translate = `0 ${THRESHOLD * -(100 - percentRevealed)}px`;
    titlesMobile.style.scale = (percentRevealed / 100);
    titlesMobile.style.rotate = `${Math.PI * (1 - (percentRevealed / 100))}rad`;

}

function parallaxTitle() {
    const percentRevealed = getAnimationPercent(3.0, 4.2);

    const THRESHOLD = window.innerHeight / 100;

    if(window.scrollY > NUM_SCROLL_PAGES_PARALLAX * window.innerHeight) {

        if(window.innerWidth <= MOBILE_WIDTH_THRESHOLD || shouldReduceMotion()) {
            about.style.translate = `0 0`;
        } else {
            about.style.translate = `0 ${THRESHOLD * -(percentRevealed)}px`;
        }
    } else {
        about.style.translate = `0 0`;
    }
}

function updateAboutMe() {
    nextShowingAboutMe = window.scrollY >= 0.3 * window.innerHeight;
    
    if(nextShowingAboutMe === isShowingAboutMe) return;

    if(nextShowingAboutMe) {
        if (animation) animation.cancel();

        aboutMeContainer.style.opacity = 1;

        buttonAnimation = heroButton.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            {
                duration: 400,
            }
        );

        buttonAnimation.onfinish = () => {
            heroButton.style.display = "none";
        }

        aboutMeBackground.style.maskSize = "500vw 500vw";
        aboutMeBackground.style.zIndex = "621";


        isShowingAboutMe = true;


    } else {
        fadeOut();

        heroButton.style.display = "grid";

        buttonAnimation = heroButton.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            {
                duration: 400,
            }
        );

        aboutMeBackground.style.maskSize = "60vh 60vh";
        isShowingAboutMe = false;

    }
}

function fadeOut() {
    animation = aboutMeContainer.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        {
            duration: 400,
            fill: 'forwards',
        }
    );

    animation.onfinish = () => {
        rows.forEach((row, idx) => {
            row.classList.remove("show-row");
            row.style.animationDelay = `${1000 + idx * 200}ms`;
        })
    }
}


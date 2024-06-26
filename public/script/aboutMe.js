const aboutMeContainer = document.getElementById("about-me-container");
const heroButton = document.getElementById("hero-button");
const aboutMeBackground = document.getElementById("about-me");
let animation;
let buttonAnimation;

const header = document.querySelector("#about-me h2");
// const headerText = header.innerText;
const headerText = "Temp";

// header.innerText = "";

const subHeader = document.querySelector("#about-me h4");
const bar = document.querySelector("#about-me .bar");

const rows = Array.from(document.querySelectorAll("#about-me .hero-content .hero-row"));

let isShowingAboutMe = false;
let nextShowingAboutMe = false;
aboutMeBackground.style.zIndex = 100000;

updateAboutMe();

document.addEventListener("scroll", () => {
    updateAboutMe();
})

function updateAboutMe() {
    nextShowingAboutMe = window.scrollY >= 0.6 * window.innerHeight;
    
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

        // typeHeader();

        // rows.forEach((row, idx) => {
        //     row.classList.add("show-row");
        //     row.style.animationDelay = `${1500 + idx * 250}ms`;
        // })

        // subHeader.classList.add("show");
        // bar.classList.add("bar-anim-show");

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
    


function typeHeader() {
    const text = headerText;

    header.style.borderRight = "5px solid white"
    header.innerText = "";

    let i = 0;

    function typeNextCharacter() {
        if (i < text.length) {
            header.innerText = text.substring(0, i + 1);
            i++;
            setTimeout(typeNextCharacter, 75);
        } else {
            header.style.borderRight = "5px solid transparent";

        }
    }
    typeNextCharacter();
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
        // header.innerText = "";

        rows.forEach((row, idx) => {
            row.classList.remove("show-row");
            row.style.animationDelay = `${1000 + idx * 200}ms`;
        })

        // subHeader.classList.remove("show");

        bar.classList.remove("bar-anim-show");
    }

}


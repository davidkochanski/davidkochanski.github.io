const button = document.getElementById("to-about-me");

const aboutMeContainer = document.getElementById("about-me-container");

const aboutMeBackground = document.getElementById("about-me");
let animation;

const header = document.querySelector("#about-me h2");
const headerText = header.innerText;

header.innerText = "";

const subHeader = document.querySelector("#about-me h4");
const bar = document.querySelector("#about-me .bar");

const rows = Array.from(document.querySelectorAll("#about-me .hero-content .hero-row"));

let isShowingAboutMe = false;

button.onmouseover = () => {
    if(isShowingAboutMe) {
        button.style.border = "5px dashed yellow";
        button.style.backgroundColor = "#ffffff33"
    } else {
        aboutMeBackground.style.maskSize = "70vh 70vh";
    }
}

button.onmouseleave = () => {
    if(isShowingAboutMe) {
        button.style.border = "5px dashed #ffffff33";
        button.style.backgroundColor = "transparent";
    } else {
        aboutMeBackground.style.maskSize = "60vh 60vh";
    }
}

button.onclick = () => {
    isShowingAboutMe = !isShowingAboutMe;

    if(isShowingAboutMe) {
        if (animation) {
            animation.cancel();
        }
        aboutMeContainer.style.opacity = 1;

        typeHeader();

        rows.forEach((row, idx) => {
            row.classList.add("show-row");
            row.style.animationDelay = `${1500 + idx * 250}ms`;
        })

        subHeader.classList.add("show");

        bar.classList.add("bar-anim-show");

        button.style.border = "5px dashed yellow";
        button.style.backgroundColor = "#ffffff33";

        aboutMeBackground.style.maskSize = "500vw 500vw";
        aboutMeBackground.style.zIndex = "621";

    } else {
        fadeOut();


        

        button.style.border = "none";
        button.style.backgroundColor = "transparent";

        aboutMeBackground.style.maskSize = "60vh 60vh";

    }
}


const typeHeader = () => {
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


const fadeOut = () => {
    animation = aboutMeContainer.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        {
            duration: 400,
            fill: 'forwards',
        }
    );

    animation.onfinish = () => {
        header.innerText = "";

        rows.forEach((row, idx) => {
            row.classList.remove("show-row");
            row.style.animationDelay = `${1000 + idx * 200}ms`;
        })

        subHeader.classList.remove("show");

        bar.classList.remove("bar-anim-show");
    }

}


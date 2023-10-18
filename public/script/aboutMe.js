const button = document.getElementById("to-about-me");

const aboutMeBackground = document.getElementById("about-me");

let isShowingAboutMe = false;

button.onmouseover = () => {
    if(isShowingAboutMe) return;
    aboutMeBackground.style.maskSize = "70vh 70vh";
}

button.onmouseleave = () => {
    if(isShowingAboutMe) return;
    aboutMeBackground.style.maskSize = "60vh 60vh";

}

button.onclick = () => {
    isShowingAboutMe = !isShowingAboutMe;


    if(isShowingAboutMe) {
        button.style.display = "none";

        aboutMeBackground.style.maskSize = "500vw 500vw";
        aboutMeBackground.style.zIndex = "621";

    }
}



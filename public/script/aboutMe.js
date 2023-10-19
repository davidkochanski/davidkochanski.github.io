const button = document.getElementById("to-about-me");

const aboutMeBackground = document.getElementById("about-me");

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
        button.style.border = "5px dashed yellow";
        button.style.backgroundColor = "#ffffff33";

        aboutMeBackground.style.maskSize = "500vw 500vw";
        aboutMeBackground.style.zIndex = "621";

    } else {
        button.style.border = "none";
        button.style.backgroundColor = "transparent";

        aboutMeBackground.style.maskSize = "60vh 60vh";

    }
}



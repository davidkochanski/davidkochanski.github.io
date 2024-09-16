import { TERMINAL_TEXT, TERMINAL_TYPING_SPEED, TERMINAL_TYPING_BIAS, TERMINAL_FADE_OUT_TIME } from "./config";

const fadeOut = document.getElementById("fade-in");
const terminal = document.getElementById("terminal-text");
const cursor = document.getElementById("terminal-cursor");
const loadingText = document.getElementById("loading-text");
const terminalLoadingText = document.getElementById("terminal-loading-text");
const spinner = document.getElementById("terminal-spinner");
loadingText.style.display = "none";

const CURSOR_CHAR = "&#x2588;";
const spinnerGlyphs = ["|", "/", "—", "\\"];
let index = 0;

let readyEarly = false;
window.onload = () => {
    readyEarly = true;
}


terminal.textContent = "";

const textInterval = setInterval(() => {
    terminal.textContent += TERMINAL_TEXT[index];
    index++;

    if (index >= TERMINAL_TEXT.length) {
        clearInterval(textInterval);
        showSpinner();
    }
}, TERMINAL_TYPING_SPEED);

let showingCursor = true;

const cursorInterval = setInterval(() => {
    showingCursor = !showingCursor;
    cursor.innerHTML = showingCursor ? CURSOR_CHAR : "";
}, 400);


const showSpinner = () => {
    let spinnerInterval;
    let spinnerIndex = 0;
    
    cursor.textContent = "";
    clearInterval(cursorInterval);
    terminalLoadingText.textContent = "Loading... ";
    loadingText.style.display = "block";
    
    spinnerInterval = setInterval(() => {
        spinner.innerText = spinnerGlyphs[spinnerIndex % spinnerGlyphs.length];
        spinnerIndex++;
    }, TERMINAL_TYPING_SPEED);
    
    if(readyEarly) {
        setTimeout(() => {
            fadeOutAndShowSite();
        }, TERMINAL_TYPING_SPEED * TERMINAL_TYPING_BIAS)
        return;
    }
    
    window.addEventListener("load", () => {
        fadeOutAndShowSite();
    })
}




const fadeOutAndShowSite = () => {
    fadeOut.animate(
        [
            { height: "100lvh" },
            { height: 0 }
        ],
        {
            duration: TERMINAL_FADE_OUT_TIME,
            easing: "ease-out",
            fill: "forwards"
        }
    ).onfinish = () => {
        fadeOut.style.width = 0;
        fadeOut.style.height = 0; // just in case
        fadeOut.style.display = "none";
    };
};

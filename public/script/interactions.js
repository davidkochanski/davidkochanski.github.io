const btn = document.getElementById("interaction-button");
const icon = document.querySelector("#interaction-button > i");
const wrapper = document.querySelector(".interactions-wrapper");
const inters = document.querySelectorAll(".interaction");

const SHOW_DELAY = 150;

let media = window.matchMedia("(max-width: 768px)");
let numShown = 3;
let active = false;

// Calculate shown elements when page is initially loaded..
document.addEventListener('DOMContentLoaded', () => {
    checkForAndApplyShown();
});

// And also whenever the window size is changed,
// that could cause a potential change in num of elements shown
window.onresize = e => checkForAndApplyShown();

const checkForAndApplyShown = () => {
    media = window.matchMedia("(max-width: 768px)");

    numShown = media.matches ? 2 : 3;

    if(!active) {
        let shown = Array.from(inters).slice(0, numShown);
        shown.forEach((element) => { element.classList.remove("interaction-hide")})

        let tail = Array.from(inters).slice(numShown);
        tail.forEach((element) => { element.classList.add("interaction-hide")})
    }
}

btn.onmousedown = e => {
    checkForAndApplyShown();

    active = !active;
    icon.classList.toggle("fa-chevron-right");
    icon.classList.toggle("fa-chevron-down");
    let tail = Array.from(inters).slice(numShown);

    if(!active) {
        tail = tail.reverse();
    }

    tail.forEach((element, idx) => {
        setTimeout(() => {
            element.classList.toggle("interaction-show");
            element.classList.toggle("interaction-hide");

        }, idx * SHOW_DELAY)
    })   
}
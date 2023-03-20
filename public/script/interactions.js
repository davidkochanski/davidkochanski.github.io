const btn = document.getElementById("interaction-button");
const icon = document.querySelector("#interaction-button > i");
const wrapper = document.querySelector(".interactions-wrapper");
const inters = document.querySelectorAll(".interaction");
let active = false;
let numShown;

let media = window.matchMedia("(max-width: 768px)");

const checkForAndApplyShown = () => {
    media = window.matchMedia("(max-width: 768px)");

    numShown = media.matches ? 2 : 3;

    let shown = Array.from(inters).slice(0, numShown);
    shown.forEach((element) => {element.style.display = "block"})

    let action = active ? "block" : "none";

    let tail = Array.from(inters).slice(numShown);
    tail.forEach((element) => {element.style.display = action})
}

// Calculate shown elements when page is initially loaded..
document.body.onload = e => checkForAndApplyShown();

// And also whenever the window size is changed,
// that could cause a potential change in num of elements shown
window.onresize = e => checkForAndApplyShown();

btn.onmousedown = e => {
    active = !active;
    icon.classList.toggle("fa-chevron-right");
    icon.classList.toggle("fa-chevron-down");
    let tail = Array.from(inters).slice(numShown);
    
    let action = active ? "block" : "none";

    tail.forEach( (element) => {
        element.style.display = action; 
    });
}
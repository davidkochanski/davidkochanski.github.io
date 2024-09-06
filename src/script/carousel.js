const allSlides = Array.from(document.querySelectorAll("#carousel .slide"));
const carousel = document.getElementById("carousel");
const leftBtn = document.getElementById("carousel-left");
const rightBtn = document.getElementById("carousel-right");
const counter = document.getElementById("page-counter");
const nav = document.getElementById("page-nav");

const allTransitions = Array.from(document.querySelectorAll("#carousel .slide-transition"));

let activeSlide = 0;
let isDragging = false;

applyChanges();

allSlides.forEach((slide, idx) => {
    const tab = document.createElement("a");

    tab.classList.add("page-tab");

    tab.innerText = `${idx + 1}`

    tab.addEventListener("mousedown", () => {
        activeSlide = idx;
        applyChanges();
    })

    if (idx === activeSlide) {
        tab.classList.add("selected-tab");
    }

    nav.appendChild(tab);

})



function applyChanges() {

    // Show the correct slide
    allSlides.forEach((slide, idx) => {
        slide.style.transform = `translateX(${133 * (idx - activeSlide)}%)`;
    })


    allTransitions.forEach((trans, idx) => {
        trans.style.transform = `translateX(calc(${100 * (idx - activeSlide)}% + ${300 * (idx - activeSlide + 1)}%))`;
    })

    // Counter in corner
    counter.innerText = `${activeSlide + 1} of ${allSlides.length}`;

    // Navigation tabs at the bottom
    Array.from(nav.children).forEach((tab, idx) => {
        if (idx === activeSlide) {
            tab.classList.add("selected-tab");
        } else {
            tab.classList.remove("selected-tab");
        }
    })


}

leftBtn.onclick = () => {
    activeSlide = (activeSlide - 1 + allSlides.length) % allSlides.length;
    applyChanges();

}

rightBtn.onclick = () => {
    activeSlide = (activeSlide + 1) % allSlides.length;
    applyChanges();
}



let onNav = false;

nav.onmouseover = () => onNav = true;
nav.onmouseout = () => onNav = false;


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);


carousel.addEventListener("touchdown", dragStart);
carousel.addEventListener("touchmove", drag);
carousel.addEventListener("touchup", dragEnd);

// idk if this is necessary
// const observer = new IntersectionObserver((element) => {
//     element.forEach((el) => {
//         if (el.isIntersecting) {
//             document.addEventListener("mousedown", dragStart);
//             document.addEventListener("mousemove", drag);
//             document.addEventListener("mouseup", dragEnd);

//             document.addEventListener("touchdown", dragStart);
//             document.addEventListener("touchmove", drag);
//             document.addEventListener("touchup", dragEnd);

//         } else {
//             document.removeEventListener("mousedown", dragStart);
//             document.removeEventListener("mousemove", drag);
//             document.removeEventListener("mouseup", dragEnd);

//             document.removeEventListener("touchdown", dragStart);
//             document.removeEventListener("touchmove", drag);
//             document.removeEventListener("touchup", dragEnd);
//         }
//     })
// })

// observer.observe(carousel);


let dragStartX = 0;
let dragX = 0;

function dragStart(event) {
    if(onNav) return;

    isDragging = true;
    dragStartX = event.clientX;

    allSlides.forEach((slide) => {
        slide.classList.add("dragging");
    })

    allTransitions.forEach((trans) => {
        trans.classList.add("dragging");
    })
}

function drag(event) {
    if (!isDragging) {
        applyChanges();
        return;
    };

    dragX = event.clientX - dragStartX;

    // Mobile swipe tollerance
    if (screen.width <= 768 && Math.abs(dragX) <= 15) return;

    // Drag offset animation
    allSlides.forEach((slide, idx) => {
        slide.style.transform = `translateX(calc(${133 * (idx - activeSlide)}% + ${dragX}px))`;

    });


    allTransitions.forEach((trans, idx) => {
        trans.style.transform = `translateX(calc(${100 * (idx - activeSlide)}% + ${300 * (idx - activeSlide + 1)}% + ${dragX}px))`;
    })


}

function dragEnd() {
    let threshold = 0.3 * allSlides[0].clientWidth;

    if (dragX < -threshold && activeSlide < allSlides.length - 1) {
        activeSlide += 1
    }

    if (dragX > threshold && activeSlide > 0) {
        activeSlide -= 1
    }

    isDragging = false;

    dragX = 0;

    allSlides.forEach((slide) => {
        slide.classList.remove("dragging");
    })
    allTransitions.forEach((trans) => {
        trans.classList.remove("dragging");
    })

    applyChanges();
}
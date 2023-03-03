// TODO

let hiddenElements = document.querySelectorAll(".hidden");

console.log(hiddenElements);

let myObserver = new IntersectionObserver((hiddenElements) => {
    hiddenElements.forEach((element) => {
        if(element.isIntersecting) {
            element.target.classList.add("show");
        }
    })
})

hiddenElements.forEach((element) => myObserver.observe(element));


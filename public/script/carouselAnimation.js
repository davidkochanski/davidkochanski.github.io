document.addEventListener("mousemove", (e) => updateTilts(e));
document.addEventListener("mouseup", (e) => updateTilts(e));
document.addEventListener("mousedown", (e) => updateTilts(e));

// Slide images tilting towards mouse movement;

function updateTilts(e) {

    const allWrappers = document.querySelectorAll(".slide-image-wrapper");
    const RESISTANCE = 300;

    allWrappers.forEach((photo) => {

        const rect = photo.getBoundingClientRect();
        const divCenterX = rect.left + rect.width / 2;
        const divCenterY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
    
        const angleX = -(mouseY - divCenterY) / RESISTANCE;
        const angleY = (mouseX - divCenterX) / RESISTANCE; 
    
        photo.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        
    })

}



// Title text squeezing to fix overflowing

// When it loads, it takes seemingly a moment for the text to rotate.
// Thus the client height is the "width" of the text since it hasn't `writing-mode: vertical-rl;` yet
// Strange!
setTimeout(() => {updateSqueeze();}, 10)

window.addEventListener("resize", () => {
    updateSqueeze();
})


function updateSqueeze() {
    const allTitles = document.querySelectorAll(".slide-title h2");
    const allSlideContents = document.querySelectorAll(".slide-content");

    allTitles.forEach((title, idx) => {
        let container = allSlideContents[idx];

        let maxHeight = container.clientHeight - 150;
        let titleHeight = title.clientHeight;

        let squeezeFactor = maxHeight / titleHeight;

        if(titleHeight > maxHeight) {
            title.style.scale = `1 ${squeezeFactor}`
        } else {
            title.style.scale = `1 1`
        }
    })
}


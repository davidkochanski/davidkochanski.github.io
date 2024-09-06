const blob = document.getElementById("hero-blob");

// updateScrollBlob();



document.documentElement.addEventListener("mousemove", updateBlob);

// document.addEventListener("scroll", updateScrollBlob)

function updateBlob(e) {
    const x = e.clientX;
    const y = e.clientY;

    blob.animate([
        {top: `${y - blob.offsetHeight / 2}px`, left: `${x - blob.offsetWidth / 2}px`}
    ], {easing: "ease-out", duration: 5000, fill: "forwards"});
}

// function updateScrollBlob() {
//     const scrolled = window.scrollY;
//     const height = window.innerHeight;

//     blob.style.display = scrolled > height ? "none" : "block"
// }
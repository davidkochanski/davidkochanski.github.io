const blob = document.getElementById("hero-blob");

document.documentElement.addEventListener("mousemove", (e) => {

    const x = e.clientX;
    const y = e.clientY;


    const rect = blob.getBoundingClientRect();



    blob.animate([
        {top: blob.style.top, left: blob.style.left},
        {top: `${y - rect.height / 2}px`, left: `${x - rect.width / 2}px`}


    ], {easing: "ease-out", duration: 5000})



})
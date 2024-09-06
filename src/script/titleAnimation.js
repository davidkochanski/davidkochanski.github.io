const updateBorders = () => {
    const titles = document.querySelectorAll(".title");
    
    titles.forEach((title) => {
        const rect = title.getBoundingClientRect();
        const borderMovement = rect.bottom / window.innerHeight;
        const clampedMovement = Math.max(0, Math.min(1, borderMovement));
        title.style.setProperty("--border-movement", `${clampedMovement * 100}%`);
    });    
};

document.addEventListener("scroll", updateBorders);

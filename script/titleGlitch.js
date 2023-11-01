const titles = Array.from(document.getElementsByClassName("title"));

let text = null;


titles.forEach((title) => {


    title.addEventListener("mouseover", (event) => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let interval = null;
        let iteration = 0;

        // Dont start a new animation if one is already running
        if (text === null) {
            text = event.target.innerText;
        } else {
            return;
        }

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return text[index];
                    }

                    return letters[Math.floor(Math.random() * letters.length)]
                })
                .join("");

            if (iteration >= text.length) {
                clearInterval(interval);
                text = null;
            }

            iteration += 0.5;
        }, 15);
    })
})
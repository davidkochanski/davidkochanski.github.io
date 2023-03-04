const skillBars = document.querySelectorAll(".skill");

const mySkillObserver = new IntersectionObserver((skillElements) => {
    skillElements.forEach((element) => {
        if(element.isIntersecting) {
            element.target.classList.add("show-skill");
        }
    })
})

skillBars.forEach((element) => mySkillObserver.observe(element));


const aboutBars = document.querySelectorAll(".about-bar");

const myAboutObserver = new IntersectionObserver((aboutElements) => {
    aboutElements.forEach((element) => {
        if(element.isIntersecting) {
            element.target.classList.add("show-about");
        }
    })
})

aboutBars.forEach((element) => myAboutObserver.observe(element));


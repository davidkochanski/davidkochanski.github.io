import "./slide.css";
import { forwardRef, useRef, useEffect, useState } from "react";

const Slide = forwardRef(({ children, title, date, imageURL, imagePos, background, interactionURL, githubURL, tagList }, ref) => {

    const imageRef = useRef();
    const titleWrapperRef = useRef();
    const titleRef = useRef();
    const slideRef = useRef();
    const tabsRef = useRef();

    const [titleAnim, setTitleAnim] = useState("");
    const [idx, setIdx] = useState(0);
    const [seenTitle, setSeenTitle] = useState(false);

    useEffect(() => {
        updateSqueeze();
        window.addEventListener("resize", updateSqueeze);


        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setSeenTitle(true);
                    animateImage();
                    animateTabs();
                }
            });
        }, {threshold: 0.01});

        setTimeout(() => {
            observer.observe(slideRef.current);
        }, 500)


        titleRef.current.style.borderBottom = "5px solid black";

        setInterval(() => {
            const title = titleRef.current;
            if(title.style.borderBottom === "medium none") {
                title.style.borderBottom = "5px solid black";
            } else {
                title.style.borderBottom = "medium none";
            }
        }, 530)

        // Clean-up
        return () => {
            window.removeEventListener("resize", updateSqueeze);
        };
    }, []);

    // Title animation
    useEffect(() => {
        if (!seenTitle) return;

        if (idx < title.length) {
            setTimeout(() => {
                setTitleAnim(title.substring(0, idx + 1));
                setIdx(prevIdx => prevIdx + 1);
                updateSqueeze();
            }, 75);
        }
    }, [idx, title, seenTitle]);

    function animateImage() {
        const image = imageRef.current;

        image.style.animation = "scale-in 0.33s ease-out forwards";
        // image.style.animationDelay = "0.12s";
    }

    function animateTabs() {
        const tabs = Array.from(tabsRef.current.children);
        const DELAY_BETWEEN = 200;
        const DELAY_INITIAL = 300;

        tabs.forEach((tab, idx) => {
            tab.style.animation = "tag-animation 1s forwards";
            tab.style.animationDelay = `${DELAY_BETWEEN * idx + DELAY_INITIAL}ms`;
        })
    }


    function updateImageTilt(e) {

        const img = imageRef.current;
        const RESISTANCE = 200;

        const rect = img.getBoundingClientRect();
        const divCenterX = rect.left + rect.width / 2;
        const divCenterY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const angleX = -(mouseY - divCenterY) / RESISTANCE;
        const angleY = (mouseX - divCenterX) / RESISTANCE;

        img.style.transform = `perspective(500px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    }


    function updateSqueeze() {

        let container = titleWrapperRef.current;
        let title = titleRef.current;

        let maxHeight = container.clientHeight - 150;  // for the buttons at the bottom
        let titleHeight = title.clientHeight;

        let squeezeFactor = maxHeight / titleHeight;

        if (titleHeight > maxHeight) {
            title.style.scale = `1 ${squeezeFactor}`;
        } else {
            title.style.scale = `1 1`;
        }
    }

    function putInteraction() {
        if (interactionURL) {
            return <a onTouchEnd={() => { window.open(interactionURL, "_blank") }} href={interactionURL} target="_blank" rel="noreferrer">
            <i className="fas fa-arrow-up-right-from-square"></i>
        </a>
        }
    }

    function putGithub() {
        if (githubURL) {
            return <a onTouchEnd={() => { window.open(githubURL, "_blank") }} href={githubURL} target="_blank" rel="noreferrer">
                <i className="fab fa-github"></i>
            </a>
        }
    }

    function handleTagOver(e, tagName) {
        let target = (e.target) ? e.target: e.srcElement;

        target.classList.add(`${tagName.toLowerCase()}-glow`);
        target.classList.add("tag-glow");
    }

    function handleTagOut(e, tagName) {
        let target = (e.target) ? e.target: e.srcElement;
        target.classList.remove(`${tagName.toLowerCase()}-glow`);

        target.classList.remove("tag-glow");

    }

    function putTags() {
        let out = [];

        tagList.forEach((tag, idx) => {
            out.push(<div key={idx} onMouseOver={(e) => handleTagOver(e, tag)} onMouseOut={(e) => handleTagOut(e, tag)} className={`tag ${tag.toLowerCase().replace(/\./g, "-")}`}>{tag}</div>);
        })

        return out;
    }

    return (
        <div ref={ref} className="slide" draggable="false" onMouseMove={updateImageTilt} style={{ background: `${background}` }}>
            <div ref={slideRef} className="slide-content">
                <h4 className="slide-date">{date}</h4>
                <div ref={imageRef} className="slide-image-wrapper">
                    <div className="slide-image" style={{ backgroundImage: `url(${imageURL})`, backgroundPosition: `${imagePos || "center center"}` }}></div>
                </div>
                <div ref={titleWrapperRef} className="slide-title">
                    {interactionURL ? <a target="_blank"  href={interactionURL}><h2 ref={titleRef}>{titleAnim}</h2></a> : <h2 ref={titleRef}>{titleAnim}</h2>}
                    

                    <div className="slide-links">
                        {putGithub()}
                        {putInteraction()}
                    </div>
                </div>

                <div className="slide-description">
                    <div ref={tabsRef} className="slide-tags">
                        {putTags()}
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
})


export default Slide;
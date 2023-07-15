import "./slide.css";
import { forwardRef, useRef, useEffect } from "react";

const Slide = forwardRef(({ title, date, imageURL, imagePos, description, background, hasInteraction, githubURL, tagList }, ref) => {

    const imageRef = useRef();
    const titleWrapperRef = useRef();
    const titleRef = useRef();
    
    useEffect(() => {
        updateSqueeze();
        window.addEventListener("resize", updateSqueeze);

        // Clean-up
        return () => {
            window.removeEventListener("resize", updateSqueeze);
        };
    }, [])

    function updateImageTilt(e) {

        const img = imageRef.current;
        const RESISTANCE = 300;

        const rect = img.getBoundingClientRect();
        const divCenterX = rect.left + rect.width / 2;
        const divCenterY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const angleX = -(mouseY - divCenterY) / RESISTANCE;
        const angleY = (mouseX - divCenterX) / RESISTANCE;

        img.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
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
        if (hasInteraction) {
            return <a onTouchEnd={() => {window.location.href = "#interactions"}} href="#interactions">
                <i className="fas fa-arrow-up-right-from-square"></i></a>
        }
    }

    function putGithub() {
        if (githubURL) {
            return <a onTouchEnd={() => {window.open(githubURL, "_blank")}} href={githubURL} target="_blank" rel="noreferrer">
                    <i className="fab fa-github"></i>
            </a>
        }
    }

    function putTags() {
        let out = [];

        tagList.forEach((tag, idx) => {
            out.push(<div key={idx} className={`tag ${tag.toLowerCase().replace(/\./g, "-")}`}>{tag}</div>);
        })

        return out;
    }

    return (
        <div ref={ref} className="slide" draggable="false" onMouseMove={updateImageTilt} style={{ background: `${background}` }}>
            <div className="slide-content">
                <h4 className="slide-date">{date}</h4>
                <div ref={imageRef} className="slide-image-wrapper">
                    <div className="slide-image" style={{ backgroundImage: `url(${imageURL})`, backgroundPosition: `${imagePos || "center center"}` }}></div>
                </div>
                <div ref={titleWrapperRef} className="slide-title">
                    <h2 ref={titleRef}>{title}</h2>

                    <div className="slide-links">
                        {putGithub()}
                        {putInteraction()}
                    </div>
                </div>

                <div className="slide-description">
                    <div className="slide-tags">
                        {putTags()}
                    </div>
                    <div>
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
})


export default Slide;
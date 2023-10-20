import { useState, useEffect, useRef } from 'react';
import './carousel.css';
import Slide from './Slide';

import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [onNav, setOnNav] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const ref = useRef();
    const slideRefs = useRef([]);
    const slideTransitions = useRef([]);
    const navRef = useRef();

    useEffect(() => {  // On startup (once)

        // These were annoying to write manually so
        slideRefs.current.forEach((slide) => {
            slide.draggable = false;
            slide.classList.add("slide");
        });

        slideTransitions.current.forEach((slide) => {
            slide.draggable = false;
            slide.classList.add("slide-transition");
        });

        navRef.current.replaceChildren();  // Just in case; removes duplicate navs

        for (let idx = 0; idx < slideRefs.current.length; idx++) {
            const tab = document.createElement("a");

            tab.classList.add("page-tab");
            tab.innerText = `${idx + 1}`
            tab.addEventListener("mousedown", () => { setCurrentSlide(idx) })
            tab.addEventListener("touchstart", () => { setCurrentSlide(idx) })

            if (idx === currentSlide) tab.classList.add("selected-tab");

            navRef.current.appendChild(tab);
        }

        const mediaQuery = window.matchMedia('(max-width: 768px)');

        function handleMediaQueryChange(event) {
            setIsMobile(event.matches);
            if(isMobile) setOnNav(false);
        }

        handleMediaQueryChange(mediaQuery); // Check initial state

        const mediaQueryListener = (event) => handleMediaQueryChange(event);
        mediaQuery.addEventListener('change', mediaQueryListener);

        return () => {
            mediaQuery.removeEventListener('change', mediaQueryListener);
        }

    })


    // On dragging or slide change
    useEffect(() => {
        slideRefs.current.forEach((slide, idx) => {
            slide.style.transform = `translateX(calc(${133 * (idx - currentSlide)}% + ${dragX}px))`;
        });

        slideTransitions.current.forEach((slide, idx) => {
            slide.style.transform = `translateX(calc(${100 * (idx - currentSlide)}% + ${300 * (idx - currentSlide + 1)}% + ${dragX}px))`;
        });

        // Selected nav tab
        Array.from(navRef.current.children).forEach((tab, idx) => {
            if (idx === currentSlide) {
                tab.classList.add("selected-tab");
            } else {
                tab.classList.remove("selected-tab");
            }
        })
    }, [dragX, currentSlide]);

    const handleDragStart = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if(onNav) return;
        setOnNav(false);
        const x = event.touches ? event.touches[0].clientX : event.clientX;

        setDragging(true);
        setStartX(x);

        slideRefs.current.forEach((slide) => {
            slide.classList.add("dragging");
        });

        slideTransitions.current.forEach((slide) => {
            slide.classList.add("dragging");
        });
    };

    const handleDragging = (event) => {
        event.preventDefault();
        
        if (!isDragging) return;

        const x = event.touches ? event.touches[0].clientX : event.clientX;
        const deltaX = x - startX;

        if (isMobile && Math.abs(deltaX) <= 15) return;  // Swipe tollerance

        setDragX(deltaX);
    };


    const handleDragEnd = () => {

        const threshold = 0.2 * slideRefs.current[0].clientWidth;

        if (dragX <= -threshold && currentSlide < slideRefs.current.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
        if (dragX >= threshold && currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
        setDragging(false);
        setDragX(0);

        // For smooth animation
        slideRefs.current.forEach((slide) => {
            slide.classList.remove("dragging");
        });

        slideTransitions.current.forEach((slide) => {
            slide.classList.remove("dragging");
        });
    };

    useEffect(() => {
        if(Math.abs(dragX) > 15 && isMobile) {
            // document.documentElement.style.overflowY = "hidden";
            // document.body.style.overflowY = "hidden";
            disableBodyScroll(ref.current);

            // document.documentElement.style.overscrollBehaviorY = "hide";
        } else {
            // document.documentElement.style.overflowY = "auto";
            // document.body.style.overflowY = "auto";
            enableBodyScroll(ref.current);
            // document.documentElement.style.overscrollBehaviorY = "auto";
        }
    }, [dragX, isMobile])

    return (
        <div id="carousel"
            ref={ref}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragging}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}

            onTouchStart={handleDragStart}
            onTouchMove={handleDragging}
            onTouchEnd={handleDragEnd}
        >
            <button id="left-btn"
                onMouseOver={() => setOnNav(true)} onMouseOut={() => setOnNav(false)}
                onMouseDown={() => {if(!isMobile) setCurrentSlide((currentSlide + slideRefs.current.length - 1) % slideRefs.current.length)}}
                onTouchEnd={() => {if(isMobile) setCurrentSlide((currentSlide + slideRefs.current.length - 1) % slideRefs.current.length)}}
            >
                <i className="fas fa-chevron-left"></i>
            </button>
            
            <button id="right-btn"
                onMouseOver={() => setOnNav(true)} onMouseOut={() => setOnNav(false)}
                onMouseDown={() => {if(!isMobile) setCurrentSlide((currentSlide + 1) % slideRefs.current.length)}}
                onTouchEnd={() => {if(isMobile) setCurrentSlide((currentSlide + 1) % slideRefs.current.length)}}
            >
                <i className="fas fa-chevron-right"></i>
            </button>

            <div ref={navRef} id="page-nav" className="page-nav" 
                onMouseOver={() => {setOnNav(true)}}
                onMouseOut={() => {setOnNav(false)}}
                onTouchStart={() => {setOnNav(false)}}
                onTouchMove={() => {setOnNav(false)}}
                onTouchEnd={() => {setOnNav(false)}}
                onTouchCancel={() => {setOnNav(false)}}
            >
            {/* populated by JS */}
            </div>

            <Slide
                ref={(ref) => (slideRefs.current[0] = ref)}

                title="placefox.xyz"
                date="March - May 2023"
                imageURL="img/slide-images/fox-full.jpg"
                imagePos="50% 60%"
                tagList={["AI", "API", "Python", "JavaScript", "CSS"]}
                background="#FF964F"
                interactionURL="https://placefox.xyz"
                githubURL="https://github.com/davidkochanski/placeholder-fox"
            >
                <ul>
                    <li>An API providing high-quality fox images as placeholder images accessible via URL.</li>
                    <li>Images of different dimensions, filters, and fox species were automatically generated using a Python script for easy future expansion.</li>
                    <li>Pictures generated by AI (Midjourney v5.1).</li>
                </ul>
            </Slide>

            <div style={{ backgroundImage: "url(img/slide-trans/0.svg)" }} ref={(ref) => (slideTransitions.current[0] = ref)}></div>

            <Slide
                ref={(ref) => (slideRefs.current[1] = ref)}

                title="Pok&eacute;guesser"
                date="February - April 2023"
                imageURL="img/slide-images/pokeguesser.jpg"
                imagePos="50% 50%"
                tagList={["React.js", "Firebase", "JavaScript", "CSS", "HTML"]}
                background="#AFEEEE"
                interactionURL="https://pokeguesser-d2651.web.app/"
                githubURL="https://github.com/davidkochanski/pokeguesser-react"
            >
                <ul>
                    <li>Pokémon guessing game developed with React.js - my first major React project.</li>
                    <li>Includes various game settings, user authentication (using Firebase), sharing capabilities, and a fully responsive layout.</li>
                    <li>Offers a user leaderboard to track and display user rankings within the game.</li>
                </ul>
            </Slide>


            <div style={{ backgroundImage: "url(img/slide-trans/1.svg)" }} ref={(ref) => (slideTransitions.current[1] = ref)}></div>

            <Slide
                ref={(ref) => (slideRefs.current[2] = ref)}

                title="davidkochanski.dev"
                date="February - July 2023"
                imageURL="img/slide-images/website.jpg"
                imagePos="50% 50%"
               
                tagList={["CSS", "HTML", "JavaScript", "React.js"]}
                background="#B7C9E2"
            >
                <p>The website you're on right now! Fully responsive, using CSS technologies like flexbox and keyframes, and a carousel first built in vanilla JavaScript, and then upgraded to React.JS.</p>
            </Slide>

            <div style={{ backgroundImage: "url(img/slide-trans/2.svg)" }} ref={(ref) => (slideTransitions.current[2] = ref)}></div>

            <Slide
                ref={(ref) => (slideRefs.current[3] = ref)}

                title="DaveedBot"
                date="October - January 2023"
                imageURL="img/slide-images/daveedbot.jpg"
                imagePos="50% 50%"
                
                tagList={["Python", "Discord.py"]}
                background="#fd7f78"
                githubURL="https://github.com/davidkochanski/DaveedBot"
            >
                <ul>
                    <li>A bot for Discord using the Discord.py framework.</li>
                    <li>Features dozens of commands from simple text responses, to interactive guessing games, to image manipulation.</li>
                </ul>
                </Slide>

            <div style={{ backgroundImage: "url(img/slide-trans/3.svg)" }} ref={(ref) => (slideTransitions.current[3] = ref)}></div>


            <Slide
                ref={(ref) => (slideRefs.current[4] = ref)}

                title="Mathify Tutor"
                date="November - December 2022"
                imageURL="img/slide-images/tutor.jpg"
                imagePos="50% 0%"
                tagList={["CSS", "HTML", "JavaScript"]}
                background="#E6E6FA"
                interactionURL="../sites/mathify-tutor/index.html"
            >
                <p>Offline website, designed to advertize a fictional math tutor company. Used CSS and HTML with a hint of JavaScript to make some onscroll effects. Fully responsive.</p>
            </Slide>

            <div style={{ backgroundImage: "url(img/slide-trans/4.svg)" }} ref={(ref) => (slideTransitions.current[4] = ref)}></div>


            <Slide
                ref={(ref) => (slideRefs.current[5] = ref)}

                title="Midnight Fox"
                date="November - December 2022"
                imageURL="img/slide-images/midnightfox.jpg"
                imagePos="0 0"
                tagList={["VSCode", "JavaScript"]}
                background="#D291BC"
                interactionURL="https://marketplace.visualstudio.com/items?itemName=davefoxxo.midnight-fox"
                githubURL="https://github.com/davidkochanski/midnight-fox"
            >
                <p>A deep, vibrant theme for the leading code editor VSCode. Includes UI colour design and proper token and syntax highlighting. 200+ downloads on the VSCode Marketplace.</p>
            </Slide>

            <div style={{ backgroundImage: "url(img/slide-trans/5.svg)" }} ref={(ref) => (slideTransitions.current[5] = ref)}></div>


            <Slide
                ref={(ref) => (slideRefs.current[6] = ref)}

                title="Adopt-a-lotl"
                date="March - April 2022"
                imageURL="img/slide-images/adopt.jpg"
                imagePos="50% 0"
                tagList={["CSS", "JQuery", "JavaScript", "HTML"]}
                background="#FFB6C1"
                interactionURL="sites/adopt-a-lotl/index.html"
            >
                <p>A static website immitating an axolotl adoption center. Of course, I do not actually own an underground axolotl selling business! This was my playground for beginning JS and JQuery.</p>
            </Slide>


            <div style={{ backgroundImage: "url(img/slide-trans/6.svg)" }} ref={(ref) => (slideTransitions.current[6] = ref)}></div>


            <Slide
                ref={(ref) => (slideRefs.current[7] = ref)}

                title="Gallery of Poland"
                date="November 2021"
                imageURL="img/slide-images/gallery.jpg"
                imagePos="50% 0"
                tagList={["CSS", "HTML"]}
                background="#98FB98"
                interactionURL="sites/gallery/index.html"
            >
                <p>Very simple static website displaying a responsive image gallery of the beautiful landscapes and cityscapes of my home background, Poland.</p>
            </Slide>

        </div>
    );
}

export default Carousel;

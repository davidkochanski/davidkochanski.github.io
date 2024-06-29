import { useState, useEffect, useRef } from 'react';
import './carousel.css';
import Slide from './Slide';
import React from 'react';

import { clearBodyLocks, lock, lock as lockBody, unlock as unlockBody } from 'tua-body-scroll-lock'

import { slides } from './slidedata';


function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [onNav, setOnNav] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // const [canScroll, setScroll] = useState(true);
    // const stopScroll = usePreventScroll({isDisabled: canScroll});

    const carouselRef = useRef();
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

        const renderTab = (idx) => {
            const tab = document.createElement("a");
            tab.classList.add("page-tab");
            tab.innerText = `${idx + 1}`;
            tab.addEventListener("mousedown", () => { setCurrentSlide(idx) });
            tab.addEventListener("touchstart", () => { setCurrentSlide(idx) });
    
            if (idx === currentSlide) tab.classList.add("selected-tab");
    
            navRef.current.appendChild(tab);
        };
        
        // Only want to show a range of tab instead of all them
        const renderTabsInRange = (start, end) => {
            renderTab(0);
            const buffer = document.createElement("a");
            buffer.classList.add("page-tab-buffer")
            buffer.innerText = "...";
            navRef.current.appendChild(buffer);

            for (let idx = start; idx <= end; idx++) {
                renderTab(idx);
            }

            const buffer2 = document.createElement("a");
            buffer2.classList.add("page-tab-buffer")
            buffer2.innerText = "...";
            navRef.current.appendChild(buffer2);

            renderTab(slideRefs.current.length - 1);
        };
    
        // Render tabs based on currentSlide and the desired range
        if (currentSlide <= 1) {
            renderTabsInRange(1, 3);
        } else if (currentSlide >= slideRefs.current.length - 2) {
            renderTabsInRange(slideRefs.current.length - 4, slideRefs.current.length - 2);
        } else {
            renderTabsInRange(currentSlide - 1, currentSlide + 1);
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
            tab.classList.remove("selected-tab");
        })
        
        if(currentSlide === 0) {
            navRef.current.children[0].classList.add("selected-tab");
        } else if (currentSlide === 1) {
            navRef.current.children[2].classList.add("selected-tab");
        } else if (currentSlide === slideRefs.current.length - 2) {
            navRef.current.children[4].classList.add("selected-tab");
        } else if (currentSlide === slideRefs.current.length - 1) {
            navRef.current.children[6].classList.add("selected-tab");
        } else {
            navRef.current.children[3].classList.add("selected-tab");
        }

    }, [dragX, currentSlide]);

    const handleDragStart = (event) => {
        event.stopPropagation();

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
        if (!isDragging) return;

        const x = event.touches ? event.touches[0].clientX : event.clientX;
        const deltaX = x - startX;

        if (isMobile) {
            if (Math.abs(deltaX) <= 15) return; // Swipe tollerance
                
            lockBody(carouselRef.current); // Only lock body scrolling on mobile
        }
        setDragX(deltaX);
    };


    const handleDragEnd = () => {
        unlockBody(carouselRef.current);

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
        if(!isDragging) {
            clearBodyLocks(carouselRef.current);

        } else if(Math.abs(dragX) > 15 && isMobile) {
            lockBody(carouselRef.current);
        }
    }, [isDragging, dragX])

    // useEffect(() => {
    //     if(Math.abs(dragX) > 15 && isMobile) {
    //         lock();
    //     } else {
    //         unlock();
    //     }
    // }, [dragX, isMobile])

    return (
        <div id="carousel"
            ref={carouselRef}
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

            {slides.map((slide, idx) => (<React.Fragment key={idx}>
                <Slide
                ref={(ref) => (slideRefs.current[idx] = ref)}

                title={slide.title}
                date={slide.date}
                imageURL={slide.imageURL}
                imagePos={slide.imagePos}
                tagList={slide.tagList}
                background={slide.background}
                interactionURL={slide.interactionURL}
                githubURL={slide.githubURL}

                isDragging={isDragging}
                dragX={dragX}
            >
                <ul>
                    {slide.content.map((line, i) => (
                        <li key={i}>{line}</li>
                    ))}
                </ul>
            </Slide>

            <div
                style={{ backgroundImage: `url(img/slide-trans/${idx}.svg)` }}
                ref={(ref) => (slideTransitions.current[idx] = ref)}
            ></div>


            </React.Fragment>))}

        </div>
    );
}

export default Carousel;

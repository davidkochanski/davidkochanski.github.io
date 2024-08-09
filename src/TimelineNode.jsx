import React, { useEffect, useRef } from "react";
import "./timeline.css";

export default function TimelineNode ({title, description}) {
    const thisNode = useRef();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            const rect = thisNode.current.getBoundingClientRect();

            console.log(window.scrollY - rect.offsetHeight);

            // thisNode.current.style.scale = `1 ${(window.scrollY - rect.left) / 100}`;
        })

    }, [])


    return (
        <div ref={thisNode} className="timeline-node">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )

}
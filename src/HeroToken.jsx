import "./hero.css"
import { useRef } from "react";

export default function Token({ children, text, colour, link }) {
    const ref = useRef(null);
    const DEFAULT = "#ffffff0e"

    function handleMouseOver() {
        ref.current.style.color = colour ?? "white";
    }

    function handleMouseOut() {
        ref.current.style.color = DEFAULT;
    }


    function putElement() {
        if (link) {
            return <a ref={ref} href={link} target="_blank" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="token">
                {text}
            </a>
        } else {
            return <div ref={ref} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="token">
                {text}
            </div>
        }
    }

    return (
        <>
            {putElement()}
        </>
    );
}

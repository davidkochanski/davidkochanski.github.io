import "./hero.css"
import { useRef } from "react";

export default function Token({ children }) {
    const ref = useRef(null);
    const DEFAULT = "#ffffff33"

    function handleMouseOver() {
        ref.current.style.color = "red";
    }

    function handleMouseOut() {
        ref.current.style.color = DEFAULT;
    }

    return (
        <div ref={ref} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="token">
            {children}
        </div>
    );
}

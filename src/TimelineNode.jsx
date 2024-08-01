import React from "react";
import "./timeline.css";



export default function TimelineNode ({title, description}) {








    return (
        <div className="timeline-node">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )

}
import React from "react";
import "./timeline.css";
import TimelineNode from "./TimelineNode";

const tempData = [
    {title: "thing1", description: "Ok okdoawkdokaoakdw okawdokd okakodaw"},
    {title: "thing2", description: "I did things"},
    {title: "thing3", description: "he heheheheh eheehe ehehehehehh"},
    {title: "thing4", description: "Ok okdoawkdokaoakdw okawdokd okakodaw"},
    {title: "thing5", description: "I did things"},
    {title: "thing6", description: "he heheheheh eheehe ehehehehehh"}
]
export default function Timeline () {
    return (
        <div className="timeline">
            <div className="nodes">
                <div className="left-nodes">
                {tempData.map((data, idx) => {return idx % 2 === 0 ? <TimelineNode key={idx} title={data.title} description={data.description}/>: <></>})}
                </div>

                <div className="right-nodes">
                {tempData.map((data, idx) => {return idx % 2 === 1 ? <TimelineNode key={idx} title={data.title} description={data.description}/>: <></>})}
                </div>

            </div>
            <div className="main-line glass">

            </div>
        </div>

    )

}
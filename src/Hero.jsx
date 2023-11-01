import React, { useEffect, useState } from "react";
import "./hero.css";
import Token from "./HeroToken";

export default function Hero() {

    const [rows, setRows] = useState([]);

    const ROW_HEIGHT_PX = window.matchMedia("(max-width: 768px)").matches ? 47 : 94;

    let NUM_ROWS;

    const WORDS_PER_ROW = 10;
    const NUM_DUPES = 4;

    useEffect(() => {
        NUM_ROWS = Math.floor((window.innerHeight - 75) / ROW_HEIGHT_PX);

        const newRows = [];
        
        for(let i = 0; i < NUM_ROWS; i++) {
            const selectedWords = [];

            for(let j = 0; j < WORDS_PER_ROW; j++) {
                selectedWords.push(TOKENS[Math.floor(Math.random() * TOKENS.length)]);
            }

            let dupedWords = [];

            for(let j = 0; j < NUM_DUPES; j++) {
                dupedWords = dupedWords.concat(selectedWords);
            }

            newRows.push(dupedWords);
        }

        setRows(newRows);

    }, []);

    return (
        <div className="hero-words">
            {rows.map((selected, i) => (
                <div className="hero-words-row" key={i}>
                    {selected.map((token, j) => (
                        <Token key={i * NUM_DUPES + j} text={token.text} colour={token.colour} link={token.link} />
                    ))}
                </div>
            ))}
        </div>
    );
}



const TOKENS = [
    // Languages
    { text: "Python", colour: "#ffde57", link: null },
    { text: "JavaScript", colour: "#f0db4f", link: null },
    { text: "TypeScript", colour: "#3178c6", link: null },
    { text: "HTML", colour: "#f06529", link: null },
    { text: "CSS", colour: "#2965f1", link: null },
    { text: "Java", colour: "#f89820", link: null },
    { text: "React.js", colour: "#00d8ff", link: null },
    { text: "Firebase", colour: "#f57c00", link: null },
    { text: "Discord.py", colour: "#5865F2", link: null },
    { text: "JQuery", colour: "#7ACEF4", link: null },
    { text: "Gitlab", colour: "#FC6D26", link: null },
    { text: "LATEX", colour: "gray", link: null },
    { text: "VSCode", colour: "#0078d7", link: null },
    { text: "Azure", colour: "#0078d7", link: null },
    { text: "Windows", colour: null, link: null },
    { text: "MacOS", colour: null, link: null },
    { text: "IntelliJ", colour: null, link: null },
    { text: "Microsoft Office", colour: null, link: null },

    // Links
    { text: "Github", colour: "#4078c0", link: "https://github.com/davidkochanski" },
    { text: "LinkedIn", colour: "#0077B5", link: "https://www.linkedin.com/in/davidkochanski" },
    { text: "placefox.xyz", colour: "#FF964F", link: "https://placefox.xyz"},
    { text: "Pokéguesser", colour: "#AFEEEE", link: "https://pokeguesser-d2651.web.app/"},
    { text: "Twitter", colour: "#1DA1F2", link: "https://x.com/kochanskidavid"},

    // Adjectives
    { text: "Student", colour: null, link: null },
    { text: "Developer", colour: null, link: null },
    { text: "Programmer", colour: null, link: null },
    { text: "Aspiring", colour: null, link: null },
    { text: "Enthusiast", colour: null, link: null },
    { text: "Problem Solver", colour: null, link: null },
    { text: "Designer", colour: null, link: null },
    { text: "Creative", colour: null, link: null },
    { text: "Curious", colour: null, link: null },
    { text: "Coding", colour: null, link: null },
    { text: "Detail-Oriented", colour: null, link: null },
    { text: "Polish", colour: "red", link: null},
    { text: "Canadian", colour: "red", link: null},

    // Interests
    { text: "UofT", colour: "#007FA3", link: null },
    { text: "University of Toronto", colour: "#007FA3", link: null },
    { text: ":3", colour: "pink", link: null},
    { text: "Computer Science", colour: null, link: null},
    { text: "CS", colour: null, link: null},
    { text: "Football", colour: null, link: null},
    { text: "Aesthetic", colour: null, link: null},
    { text: "Mathematics", colour: null, link: null},
    { text: "Statistics", colour: null, link: null},
    { text: "Web", colour: null, link: null},
    { text: "Web Development", colour: null, link: null},
    { text: "Software", colour: null, link: null},
    { text: "Projects", colour: null, link: null},
    { text: "Algorithms", colour: null, link: null},
    { text: "Logic", colour: null, link: null},
    { text: "Responsiveness", colour: null, link: null},
    { text: "Flexbox", colour: null, link: null},
    { text: "UI/UX", colour: null, link: null},
    { text: "NoSQL Database", colour: null, link: null},
    { text: "Frontend", colour: null, link: null},


];

import React, { useEffect, useState } from "react";
import "./hero.css";
import Token from "./HeroToken";

export default function Hero() {
    const [rows, setRows] = useState([]);
    const [rowHeight, setRowHeight] = useState(94);
    const [numRows, setNumRows] = useState(0);

    const WORDS_PER_ROW = 10;
    const NUM_DUPES = 4;
    const NAV_HEIGHT = 0;
    const BIG_TEXT_HEIGHT = 94;
    const SMALL_TEXT_HEIGHT = 50;

    function calcRowHeight() {
        return window.innerWidth >= 768 ? BIG_TEXT_HEIGHT : SMALL_TEXT_HEIGHT;
    }

    function calcNumRows() {
        return Math.floor((document.documentElement.clientHeight - NAV_HEIGHT) / calcRowHeight());
    }

    useEffect(() => {
        const handleResize = () => {
            const newRowHeight = calcRowHeight();
            setRowHeight(newRowHeight);
            setNumRows(calcNumRows());
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleResize);

        // Clean up
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleResize);
        };
    }, []);

    useEffect(() => {
        const newRows = [];
        for (let i = 0; i < numRows; i++) {
            const selectedWords = [];
            for (let j = 0; j < WORDS_PER_ROW; j++) {
                selectedWords.push(TOKENS[Math.floor(Math.random() * TOKENS.length)]);
            }

            let dupedWords = [];
            for (let j = 0; j < NUM_DUPES; j++) {
                dupedWords = dupedWords.concat(selectedWords);
            }

            newRows.push(dupedWords);
        }

        setRows(newRows);
    }, [numRows]);

    return (
        <div className="hero-words" style={{overflow: "hidden"}}>
            {rows.map((selected, rowIndex) => (
                <div className="hero-words-row" key={rowIndex} style={{ height: `${rowHeight}px` }}>
                    {selected.map((token, tokenIndex) => (
                        <Token key={`${rowIndex}-${tokenIndex}`} text={token.text} colour={token.colour} link={token.link} />
                    ))}
                </div>
            ))}
        </div>
    );
}


const TOKENS = [
    // Languages & Technologies
    { text: "Python", colour: "#ffde57", },
    { text: "JavaScript", colour: "#f0db4f", },
    { text: "TypeScript", colour: "#3178c6", },
    { text: "HTML", colour: "#f06529", },
    { text: "CSS", colour: "#2965f1", },
    { text: "Java", colour: "#f89820", },
    { text: "React.js", colour: "#00d8ff", },
    { text: "Firebase", colour: "#f57c00", },
    { text: "Discord.py", colour: "#5865F2", },
    { text: "JQuery", colour: "#7ACEF4", },
    { text: "Gitlab", colour: "#FC6D26", },
    { text: "LATEX", colour: "gray", },
    { text: "Git", colour: "#f14e32", },
    { text: "VSCode", colour: "#0078d7", },
    { text: "Azure", colour: "#0078d7", },
    { text: "Windows", },
    { text: "MacOS", },
    { text: "Linux", },
    { text: "Unix", },
    // { text: "IntelliJ",  },
    { text: "Node.js", colour: "#6cc24a", },

    // Links
    { text: "Github", colour: "#4078c0", link: "https://github.com/davidkochanski" },
    { text: "LinkedIn", colour: "#0077B5", link: "https://www.linkedin.com/in/davidkochanski" },
    // { text: "placefox.xyz", colour: "#FF964F", link: "https://placefox.xyz"},
    { text: "Pokéguesser", colour: "#AFEEEE", link: "https://pokeguesser-d2651.web.app/"},
    // { text: "Twitter", colour: "#1DA1F2", link: "https://x.com/kochanskidavid"},

    // Adjectives
    { text: "Student", },
    { text: "Developer", },
    { text: "Programmer", },
    // { text: "Aspiring", },
    { text: "Enthusiast", },
    { text: "Problem Solver", },
    { text: "Designer", },
    { text: "Creative", },
    { text: "Curious", },
    { text: "Coding", },
    { text: "Detail-Oriented", },
    // { text: "Polish", colour: "red",},
    // { text: "Canadian", colour: "red",},

    // Interests
    { text: "UofT", colour: "#007FA3", },
    { text: "University of Toronto", colour: "#007FA3", },
    { text: "Computer Science",},
    { text: "CS",},
    { text: "Football",},
    { text: "Aesthetic",},
    { text: "Mathematics",},
    { text: "Statistics",},
    { text: "Calculus",},
    { text: "Linear Algebra",},
    { text: "Web",},
    { text: "Web Development",},
    { text: "Software",},
    { text: "Projects",},
    { text: "Algorithms",},
    { text: "Logic",},
    { text: "Responsiveness",},
    { text: "Flexbox",},
    { text: "UI/UX",},
    { text: "NoSQL Database",},
    { text: "Frontend",},
    { text: "Agile",},
    { text: "Web Design",},
    { text: "AI/ML",},
    { text: "Node.js",},
    { text: "Three.js",},
    { text: "Parallax",},
    { text: "OOP",},
    { text: "DSA",},


];

// import React, { useEffect, useRef } from "react";
// import "./hero.css";
// import Token from "./HeroToken";

// export default function Hero() {
//   const rowRef = useRef();
//   const pixelsPerSecond = 100; // Adjust this value to set the speed


//   setInterval(() => {
//     const moving = [];

//     Array.from(rowRef.current.children).forEach((token) => {
//         const rect = token.getBoundingClientRect();
//         if(rect.right < 0) {
//             moving.push(token);
//         }
//     })


//     moving.forEach((token) => {
//         console.log(token.innerHTML);
//         rowRef.current.removeChild(token);
//         rowRef.current.appendChild(token);
//     });
    

// }, 100)


//   useEffect(() => {
//     let animationFrameId;
//     let startTime;
//     let currentPosition = 0; // Initial left position

//     function animate(timestamp) {
//       if (!startTime) {
//         startTime = timestamp;
//       }

//       const elapsedTime = timestamp - startTime;
//       currentPosition = -pixelsPerSecond * (elapsedTime / 1000);

//       rowRef.current.style.transform = `translateX(${currentPosition}px)`;

//       if (currentPosition > -rowRef.current.offsetWidth) {
//         animationFrameId = requestAnimationFrame(animate);
//       } else {
//         // Animation complete
//       }
//     }

//     animationFrameId = requestAnimationFrame(animate);

//     return () => {
//       if (animationFrameId) {
//         cancelAnimationFrame(animationFrameId);
//       }
//     };
//   }, []);

//   return (
//     <div className="hero-words">
//       <div ref={rowRef} className="row">
//         <Token>One One One</Token>
//         {/* <Token>Two Two Two</Token>
//         <Token>Three Three Three</Token>
//         <Token>Four Four Four</Token>
//         <Token>Five Five Five</Token>
//         <Token>Six Six Six</Token>
//         <Token>Seven Seven Seven</Token>
//         <Token>Eight Eight Eight</Token> */}
//       </div>
//     </div>
//   );
// }

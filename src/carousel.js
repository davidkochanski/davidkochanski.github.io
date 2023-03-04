import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./carousel.css";
import { Carousel } from 'react-responsive-carousel';

export default class MyCarousel extends Component {

    render() {
        return (
            <Carousel autoPlay={false} infiniteLoop={true} interval={4000} transitionTime={1000} emulateTouch={true} showThumbs={false}>
                

                <div className="slide-image slide-image-top" style={{"background-image": "url('../img/pokeguesser.jpg')"}}>
                    <div className="legend">
                    <div className="legend-content">
                            <h4>February 2023 - COMING SOON</h4>
                            <h2>Pokeguesser <a href="#" target="_blank"><i class="fas fa-arrow-up-right-from-square"></i></a></h2>

                            <div className="tags">
                                <div className="tag react">React.js</div>
                                <div className="tag javascript">JavaScript</div>
                                <div className="tag css">CSS</div>
                                <div className="tag html">HTML</div>

                            </div>

                            <div className="bar"></div>
                            <p>A simple Pokemon guessing game built with React.js; my first main React project. Features settings for difficulty and time, and plans for keeping track of leaderboards.</p>
                        </div>
                    </div>
                </div>

                <div className="slide-image" style={{"background-image": "url('../img/website.jpg')"}}>
                    <div className="legend">
                        <div className="legend-content">
                            <h4>February 2023 - March 2023</h4>

                            <h2>davidkochanski.dev <a href="#home"><i className="fas fa-arrow-up-right-from-square"></i></a></h2>
                            <div className="tags">
                            
                                <div className="tag html">HTML</div>
                                <div className="tag css">CSS</div>
                                <div className="tag javascript">JavaScript</div>
                                <div className="tag react">React.js</div>

                            </div>

                            <div className="bar"></div>
                            <p>The website you're on right now! Fully responsive and accessable, using CSS technologies like flexbox and keyframes, with a carousel powered by React.js.</p>
                        </div>
                    </div>
                </div>

                <div className="slide-image slide-image-top" style={{"background-image": "url('../img/midnightfox.jpg')", "background-position": "left top"}}>
                    <div className="legend">
                    <div className="legend-content">
                            <h4>September 2022 - October 2022</h4>
                            <h2>Midnight Fox <a href="https://github.com/davidkochanski/midnight-fox" target="_blank"><i className="fas fa-arrow-up-right-from-square"></i></a></h2>

                            <div className="tags">
                                <div className="tag vscode">VSCode Ext.</div>
                                <div className="tag javascript">JavaScript</div>
                            </div>

                            <div className="bar"></div>
                            <p>A deep, vibrant theme for the leading code editor VSCode. Includes UI colour design and proper token and syntax highlighting. 200+ downloads on the VSCode Marketplace.</p>
                        </div>
                    </div>
                </div>  

                <div className="slide-image" style={{"background-image": "url('../img/daveedbot.jpg')"}}>
                    <div className="legend">
                        <div className="legend-content">
                            <h4>October 2021 - January 2023</h4>

                            <h2>DaveedBot <a href="https://github.com/davidkochanski/DaveedBot"><i className="fas fa-arrow-up-right-from-square"></i></a></h2>
                            <div className="tags">
                            
                                <div className="tag python">Python</div>
                                <div className="tag discord-py">Discord.py</div>

                            </div>

                            <div className="bar"></div>
                            <p>A bot for Discord using the Discord.py framework. Features dozens of commands from simple text responses, to interactive guessing games, to image manipulation.</p>
                        </div>
                    </div>
                </div>
            </Carousel>
            
        );
    }
}
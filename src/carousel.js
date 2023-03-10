import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./carousel.css";
import { Carousel } from 'react-responsive-carousel';

export default class MyCarousel extends Component {

    render() {
        return (
            <Carousel preventMovementUntilSwipeScrollTolerance={true} swipeScrollTolerance={10} stopOnHover={true} autoPlay={true} infiniteLoop={true} interval={5000} transitionTime={500} emulateTouch={true} showThumbs={false}>
                
                {/* Pokeguesser */}
                <div className="slide-image slide-image-top" style={{"background-image": "url('../img/pokeguesser.jpg')"}}>
                    <div className="legend">
                    <div className="legend-content">
                            <h4>February 2023 - COMING SOON</h4>
                            <a href="#home"><h2>Pokeguesser <i class="fas fa-arrow-up-right-from-square"></i></h2></a>

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

                {/* davidkochanski.dev */}
                <div className="slide-image" style={{"background-image": "url('../img/website.jpg')"}}>
                    <div className="legend">
                        <div className="legend-content">
                            <h4>February 2023 - March 2023</h4>

                            <a href="#home"><h2>davidkochanski.dev <i className="fas fa-arrow-up-right-from-square"></i></h2></a>
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

                {/* Daveedbot */}
                <div className="slide-image" style={{"background-image": "url('../img/daveedbot.jpg')"}}>
                    <div className="legend">
                        <div className="legend-content">
                            <h4>October 2021 - January 2023</h4>

                            <a href="https://github.com/davidkochanski/DaveedBot"><h2>DaveedBot <i className="fas fa-arrow-up-right-from-square"></i></h2></a>
                            <div className="tags">
                            
                                <div className="tag python">Python</div>
                                <div className="tag discord-py">Discord.py</div>

                            </div>

                            <div className="bar"></div>
                            <p>A bot for Discord using the Discord.py framework. Features dozens of commands from simple text responses, to interactive guessing games, to image manipulation.</p>
                        </div>
                    </div>
                </div>
                
                {/* Tutor */}
                <div className="slide-image slide-image-top" style={{"background-image": "url('../img/tutor.jpg')", "background-position": "left top"}}>
                    <div className="legend">
                    <div className="legend-content">
                            <h4>November 2022 - December 2022</h4>
                            <a href="../sites/mathify-tutor/index.html" target="_blank"><h2 className="static-site">Mathify Tutor <i className="fas fa-arrow-up-right-from-square"></i></h2></a>

                            <div className="tags">
                                <div className="tag css">CSS</div>
                                <div className="tag html">HTML</div>
                                <div className="tag javascript">JavaScript</div>
                            </div>

                            <div className="bar"></div>
                            <p>Offline website, designed to advertize a fictional math tutor company. Used CSS and HTML with a hint of JavaScript to make some onscroll effects. Fully responsive.</p>
                        </div>
                    </div>
                </div>  

                {/* Midnight Fox */}
                <div className="slide-image slide-image-top" style={{"background-image": "url('../img/midnightfox.jpg')", "background-position": "left top"}}>
                    <div className="legend">
                    <div className="legend-content">
                            <h4>September 2022 - October 2022</h4>
                            <a href="https://github.com/davidkochanski/midnight-fox" target="_blank"><h2>Midnight Fox <i className="fas fa-arrow-up-right-from-square"></i></h2></a>

                            <div className="tags">
                                <div className="tag vscode">VSCode Ext.</div>
                                <div className="tag javascript">JavaScript</div>
                            </div>

                            <div className="bar"></div>
                            <p>A deep, vibrant theme for the leading code editor VSCode. Includes UI colour design and proper token and syntax highlighting. 200+ downloads on the VSCode Marketplace.</p>
                        </div>
                    </div>
                </div>  

                {/* Adopt-a-lotl */}
                <div className="slide-image slide-image-top" style={{"background-image": "url('../img/adopt.jpg')", "background-position": "center top"}}>
                    <div className="legend">
                    <div className="legend-content">
                            <h4>March 2022 - April 2022</h4>
                            <a href="../sites/adopt-a-lotl/index.html" target="_blank"><h2 className="static-site">Adopt-a-lotl <i className="fas fa-arrow-up-right-from-square"></i></h2></a>

                            <div className="tags">
                                <div className="tag css">CSS</div>
                                <div className="tag html">HTML</div>
                                <div className="tag jquery">JQuery</div>
                                <div className="tag javascript">JavaScript</div>
                            </div>

                            <div className="bar"></div>
                            <p>A static website immitating an axolotl adoption center. Of course, I do not actually own an underground axolotl selling business! This was my playground for beginning JS and JQuery.</p>
                        </div>
                    </div>
                </div>  

                {/* Gallary */}
                <div className="slide-image" style={{"background-image": "url('../img/gallary.jpg')", "background-position": "center top"}}>
                    <div className="legend">
                    <div className="legend-content">
                            <h4>November 2021</h4>
                            <a href="../sites/gallery/index.html" target="_blank"><h2 className="static-site">Gallery of Poland <i className="fas fa-arrow-up-right-from-square"></i></h2></a>

                            <div className="tags">
                                <div className="tag css">CSS</div>
                                <div className="tag html">HTML</div>
                            </div>

                            <div className="bar"></div>
                            <p>Very simple static website displaying a responsive image gallary of the beautiful landscapes and cityscapes of my home background, Poland.</p>
                        </div>
                    </div>
                </div>  
            </Carousel>
            
        );
    }
}
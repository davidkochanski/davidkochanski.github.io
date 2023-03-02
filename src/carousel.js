import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./carousel.css";
import { Carousel } from 'react-responsive-carousel';

export default class MyCarousel extends Component {

    render() {
        return (
            <Carousel autoPlay={true} interval={5000} infiniteLoop={true} emulateTouch={true} showThumbs={false}>
                <div className="slide-image" style={{"background": "url('../img/fox2.jpg') no-repeat"}}>
                    <div className="legend">
                        <div className="legend-content">
                            <h4>February 2023 - March 2023</h4>

                            <h2>davidkochanski.dev</h2>
                            <div className="tags">
                            
                                <div className="tag" id="html">HTML</div>
                                <div className="tag" id="css">CSS</div>
                                <div className="tag" id="react">React.js</div>

                            </div>

                            <div className="bar"></div>
                            <p>The website you're on right now!</p>
                        </div>
                    </div>
                </div>

                <div className="slide-image" style={{"background": "url('../img/fox1.jpg') no-repeat"}}>
                    <div className="legend">
                    <div className="legend-content">
                            <h4>September 2022 - October 2022</h4>
                            <h2>Midnight Fox</h2>

                            <div className="tags">
                                <div className="tag" id="vscode">VSCode Ext.</div>
                                <div className="tag" id="javascript">JavaScript</div>
                            </div>

                            <div className="bar"></div>
                            <p>A deep, vibrant theme for the leading code editor VSCode. Includes UI colour design and propor token and syntax highlighting. 200+ downloads on the VSCode Marketplace.</p>
                        </div>
                    </div>
                </div>

                <div className="slide-image" style={{"background": "url('../img/fox3.jpg') no-repeat"}}>
                    <div className="legend">
                    <div className="legend-content">
                            <h4>February 2023 - Current</h4>
                            <h2>Pokeguesser</h2>

                            <div className="tags">
                                <div className="tag" id="react">React.js</div>
                                <div className="tag" id="html">HTML</div>
                                <div className="tag" id="css">CSS</div>
                            </div>

                            <div className="bar"></div>
                            <p>A simple Pokemon guessing game built with React.js; my first main React project.</p>
                        </div>
                    </div>
                </div>
            </Carousel>
        );
    }
}
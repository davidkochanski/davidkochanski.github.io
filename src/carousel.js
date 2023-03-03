import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./carousel.css";
import { Carousel } from 'react-responsive-carousel';

export default class MyCarousel extends Component {

    render() {
        return (
            <Carousel autoPlay={true} infiniteLoop={true} interval={4000} transitionTime={1000} emulateTouch={true} showThumbs={false}>
                <div className="slide-image" style={{"background": "url('../img/fox2.jpg') no-repeat"}}>
                    <div className="legend">
                        <div className="legend-content">
                            <h4>February 2023 - March 2023</h4>

                            <h2>davidkochanski.dev <a href="#home"><i className="fas fa-arrow-up-right-from-square"></i></a></h2>
                            <div className="tags">
                            
                                <div className="tag html">HTML</div>
                                <div className="tag css">CSS</div>
                                <div className="tag react">React.js</div>

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
                            <h2>Midnight Fox <a href="https://github.com/davidkochanski/midnight-fox"><i className="fas fa-arrow-up-right-from-square"></i></a></h2>

                            <div className="tags">
                                <div className="tag vscode">VSCode Ext.</div>
                                <div className="tag javascript">JavaScript</div>
                            </div>

                            <div className="bar"></div>
                            <p>A deep, vibrant theme for the leading code editor VSCode. Includes UI colour design and propor token and syntax highlighting. 200+ downloads on the VSCode Marketplace.</p>
                        </div>
                    </div>
                </div>

                <div className="slide-image" style={{"background": "url('../img/fox3.jpg') no-repeat"}}>
                    <div className="legend">
                    <div className="legend-content">
                            <h4>February 2023 - In Progress</h4>
                            <h2>Pokeguesser <a href="#"><i class="fas fa-arrow-up-right-from-square"></i></a></h2>

                            <div className="tags">
                                <div className="tag react">React.js</div>
                                <div className="tag html">HTML</div>
                                <div className="tag css">CSS</div>
                            </div>

                            <div className="bar"></div>
                            <p>A simple Pokemon guessing game built with React.js; my first main React project.</p>
                        </div>
                    </div>
                </div>

                <div className="slide-image" style={{"background": "url('../img/fox4.jpg') no-repeat"}}>
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

                <div className="slide-image" style={{"background": "url('../img/fox5.jpg') no-repeat"}}>
                    <div className="legend">
                        <div className="legend-content">
                            <h4>October 2021 - January 2023</h4>

                            <h2>TESTTTTTTTTTTTTT <a href="https://github.com/davidkochanski/DaveedBot"><i className="fas fa-arrow-up-right-from-square"></i></a></h2>
                            <div className="tags">
                            
                                <div className="tag python">Python</div>
                                <div className="tag discord-py">Discord.py</div>
                                <div className="tag github">Git/Github</div>

                            </div>

                            <div className="bar"></div>
                            <p>Loworem ipsuwum dolowor sit amet cowonsectetur adipisicing elit. Nisi nibh pretiuwum quwuam praesent aliquwuet ante uwu cowonuwubia? Enim. Pellentesquwue owodiowo uwullamcoworper owo! Sed semper tristiquwue amet? Vitae dowolowor. Diam sowociowosquwu mattis :3 cowonsectetuwur! Placerat quwuis uwut felis owo! Viverra cowommowodowo uwultricies bibenduwum integer. Fringilla? Fermentuwum aptent eleifend laoworeet, mowolestie uwut cowonvallis.</p>
                        </div>
                    </div>
                </div>
            </Carousel>
        );
    }
}
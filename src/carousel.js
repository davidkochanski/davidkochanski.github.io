import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./carousel.css";
import { Carousel } from 'react-responsive-carousel';

export default class MyCarousel extends Component {

    render() {
        return (
            <Carousel emulateTouch={true} showThumbs={false}>
                <div className="slide-image" style={{"background": "url('../img/fox2.jpg') no-repeat"}}>
                    <div className="legend">
                        <div className="legend-content">
                        </div>
                    </div>
                </div>

                <div className="slide-image" style={{"background": "url('../img/fox1.jpg') no-repeat"}}>

                    <div className="legend">
                        <div className="legend-content">
                        </div>
                    </div>
                </div>

                <div className="slide-image" style={{"background": "url('../img/fox3.jpg') no-repeat"}}>
                    <div className="legend">
                        <div className="legend-content">
                        </div>
                    </div>
                </div>
            </Carousel>
        );
    }
}
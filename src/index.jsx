import React from 'react'
import ReactDOM from 'react-dom/client'
import Carousel from './Carousel.jsx'
import Timeline from './Timeline.jsx';
import Hero from './Hero.jsx'
import BallSim from './BallSim.jsx';
import './index.css'
import './mobile.css'
import './brands.css'
import './Ball.css'

ReactDOM.createRoot(document.getElementById('carousel-react')).render(
    <Carousel />
)

ReactDOM.createRoot(document.getElementById('home')).render(
    <Hero />
)

ReactDOM.createRoot(document.getElementById('timeline-react')).render(
    <Timeline/>
)

ReactDOM.createRoot(document.getElementById('physics-root')).render(
    <div id="physics-wrapper">
        <BallSim />
    </div>
)

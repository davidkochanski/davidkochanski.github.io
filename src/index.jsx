import React from 'react'
import ReactDOM from 'react-dom/client'
import Carousel from './Carousel.jsx'
import Timeline from './Timeline.jsx';
import Hero from './Hero.jsx'
import './index.css'
import './mobile.css'
import './brands.css'

ReactDOM.createRoot(document.getElementById('carousel-react')).render(
    <Carousel />
)



ReactDOM.createRoot(document.getElementById('home')).render(
    <Hero />
)

ReactDOM.createRoot(document.getElementById('timeline-react')).render(
    <Timeline/>
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import Carousel from './components/Carousel/Carousel.jsx'
import Timeline from './components/Timeline/Timeline.jsx';
import Hero from './components/ParallaxIntro/Intro.jsx'
import BallSim from './components/SkillsSim/BallSim.jsx';
import './styles/index.css'
import './styles/mobile.css'
import './styles/brands.css'
import './components/SkillsSim/ballsim.css'

ReactDOM.createRoot(document.getElementById('carousel-react')).render(
    <Carousel />
)

ReactDOM.createRoot(document.getElementById('home')).render(
    <Hero />
)

ReactDOM.createRoot(document.getElementById('physics-root')).render(
    <BallSim />
)

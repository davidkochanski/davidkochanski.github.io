import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './mobile.css';
import "./brands.css";
import MyCarousel from './carousel';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('image-carousel'));
root.render(
  <React.StrictMode>
    <MyCarousel/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

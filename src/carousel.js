import React from "react";
import Slider from "react-slick";

export default function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        easing: "ease-in-out",
      };
      return (
        <div className="container">
          <Slider {...settings}>
            <div>
              <img src="http://placekitten.com/g/400/200" alt="Cat"/>
            </div>
            <div>
              <img src="http://placekitten.com/g/400/200" alt="Cat"/>
            </div>
            <div>
              <img src="http://placekitten.com/g/400/200" alt="Cat"/>
            </div>
            <div>
              <img src="http://placekitten.com/g/400/200" alt="Cat"/>
            </div>
          </Slider>
        </div>
      );
}
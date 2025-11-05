import React from 'react';
import Slider from "react-slick";
import carouselData from '../../assets/data/carouselData.js';
import './carousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

const Carousel = () => {

    var settings = {
        accessibility: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }; 
    
    return (
        <section className="slider-container">
            <Slider {...settings}>
                { carouselData.map( item => (
                    <div key={item.id} className="slide">
                        <img src={item.src} alt={item.alt} className="slide-image"/>
                    </div>
                ))}
            </Slider>
        </section>
    );
}

export default Carousel;
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
        autoplay: true,
        autoplaySpeed: 7000 //7 sec
    }; 
    
    return (
        <section className="slider-container">
            <Slider {...settings} arrows={false}>
                { carouselData.map( item => (
                    <div key={item.id} className="slide">
                        <img src={item.src} alt={item.alt} className="slide-image"/>
                        <hgroup>
                            <h1>{item.title}</h1>
                            <h2>{item.description}</h2>
                        </hgroup>
                    </div>
                ))}
            </Slider>
        </section>
    );
}

export default Carousel;
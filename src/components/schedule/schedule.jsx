import Slider from "react-slick";
import scheduleData from '../../assets/data/scheduleData.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import "./schedule.css";

const Schedule = () => { 

    const initialSlideIndex = scheduleData.findIndex(item => item.score == null);

    const itemClassName = scheduleData;

    var settings = {
        accessibility: true,
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: initialSlideIndex >= 0 ? initialSlideIndex : 0
    }; 

    return (
        <section className="schedule-container">
            <h2>Upcoming Matches</h2>
            <Slider {...settings}>
                { scheduleData.map( schedule => (
                    <div key={schedule.id} className={schedule.location == "Home" ? "schedule-item home-game" : "schedule-item away-game"}>
                        <p className="date">{schedule.date}</p>
                        <div>
                            <img src={schedule.src} alt={schedule.alt + " - Official Logo"} className="schedule-image"/>
                        </div>
                        <h2>{schedule.opponent}</h2>
                        <h3>{schedule.location}</h3>
                        <p className={schedule.score == null ? "playTime" : "finalScore"}>
                            {schedule.score == null ? schedule.time : schedule.score}
                        </p>
                    </div>
                ))}
            </Slider>
        </section>
    );
}

export default Schedule;
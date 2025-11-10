import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import scheduleData from '../../assets/data/scheduleData.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import "./schedule.css";

function getScore(homeScore, opponentScore) {
    if (homeScore == null || opponentScore == null) {
        return null;
    } else {
        return homeScore + " - " + opponentScore;
    }
}

const Schedule = () => { 
    const sliderRef = useRef(null);
    const [sliderSettings, setSliderSettings] = useState(getInitialSettings());

    function getInitialSettings() {
        const width = window.innerWidth;
        if (width < 600) {
            return {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '24px',
            };
        }
        if (width < 800) {
            return {
                slidesToShow: 2,
                centerMode: true,
                centerPadding: '24px',
            };
        }
        if (width < 1024) {
            return {
                slidesToShow: 3,
                centerMode: false,
                centerPadding: '0px',
            };
        }
        return {
            slidesToShow: 4,
            centerMode: false,
            centerPadding: '0px',
        };
    }

    useEffect(() => {
        const handleResize = () => {
            const newSettings = getInitialSettings();
            if (newSettings.slidesToShow !== sliderSettings.slidesToShow) {
                setSliderSettings(newSettings);
                if (sliderRef.current) {
                    sliderRef.current.slickGoTo(0);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [sliderSettings]);

    const initialSlideIndex = scheduleData.findIndex(item => item.homeScore == null || item.opponentScore == null);
    const next = () => { sliderRef.current.slickNext(); }
    const previous = () => { sliderRef.current.slickPrev(); }

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: initialSlideIndex >= 0 ? initialSlideIndex : 0,
        centerMode: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    variableWidth: false
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerMode: true
                }
            }
        ]
    }; 

    return (
        <section id="schedule" className="schedule-container">
            <div className="schedule-header">
                <h2 className="schedule-header-text">Upcoming Matches</h2>
                <div className="sliderButtons">
                    <button className="slider-button" onClick={previous} aria-label="Previous Match">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button className="slider-button" onClick={next} aria-label="Next Match">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
            <Slider ref={sliderRef} {...settings} {...sliderSettings}>
                { scheduleData.map( schedule => {
                    const finalScore = getScore(schedule.homeScore, schedule.opponentScore);
                    const resultLetter = finalScore ? (schedule.homeScore > schedule.opponentScore ? "W" : "L") : null;

                    return (
                        <div key={schedule.id} className={schedule.location == "Home" ? "schedule-item home-game" : "schedule-item away-game"}>
                            <p className="date">{schedule.date}</p>
                            <div>
                                <img src={schedule.src} alt={schedule.alt + " - Official Logo"} className="schedule-image"/>
                            </div>
                            <h2>{schedule.opponent}</h2>
                            <h3>{schedule.location}</h3>
                            <div className="score-time-container">
                                <span>{resultLetter}</span>
                                <p className={finalScore == null ? "playTime" : "finalScore"}>
                                    {finalScore == null ? schedule.time : finalScore}
                                </p>
                            </div>
                            <div className="text-center">
                                <img src={schedule.watchLogo} alt="Watch Logo" className="watch-logo"/>
                                <div>
                                    <a href="#" className="watch-link">Watch</a>
                                    <a href="#" className="watch-link">Listen</a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </section>
    );
}

export default Schedule;
import { useRef } from "react";
import { useFetchStats } from './hooks/useFetchStats';
import Slider from "react-slick";
import './statistics.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

function roundTo(num, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}

function Stats() {
    const { data, loading, error } = useFetchStats();
    const sliderRef = useRef(null);
    
    const getCareerStats = (player) => {
        return player?.statistic?.data?.career?.columns?.[0]?.statistic || {};
    };
    
    const getSeasonStats = (player) => {
        return player?.statistic?.data?.season?.columns?.[0]?.statistic || {};
    };
    
    const getCareerInfo = (player) => {
        return {
            gamesPlayed: player?.statistic?.data?.career?.gamesPlayed || 0,
            gamesStarted: player?.statistic?.data?.career?.gamesStarted || 0,
        };
    };
    
    const getSeasonInfo = (player) => {
        return {
            gamesPlayed: player?.statistic?.data?.season?.gamesPlayed || 0,
            gamesStarted: player?.statistic?.data?.season?.gamesStarted || 0,
        };
    };
    
    const next = () => { if (sliderRef.current) sliderRef.current.slickNext(); };
    const previous = () => { if (sliderRef.current) sliderRef.current.slickPrev(); };

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        arrows: false,
    };

    if (loading) return <section className="stats-container"><p>Loading...</p></section>;
    if (error) return <section className="stats-container"><p>Error: {error}</p></section>;

    return (
        <>
            {/* Desktop View */}
            <section className="stats-container stats-desktop-container">
                <div className="stats-desktop-container">
                    <div>
                        <h3>Player Highlight Stats</h3>
                        <div>
                            <button>Offensive</button>
                            <button>Defensive</button>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td rowSpan="1" colSpan="7">&nbsp;</td>
                                <td rowSpan="1" colSpan="5">Attack</td>
                                <td rowSpan="1" colSpan="2">Set</td>
                                <td rowSpan="1" colSpan="3">Serve</td>
                            </tr>
                            <tr>
                                <td rowSpan="1" colSpan="1">#</td>
                                <td rowSpan="1" colSpan="1">&nbsp;</td>
                                <td rowSpan="1" colSpan="1">SP</td>
                                <td rowSpan="1" colSpan="1">MP</td>
                                <td rowSpan="1" colSpan="1">MS</td>
                                <td rowSpan="1" colSpan="1">PTS</td>
                                <td rowSpan="1" colSpan="1">PTS/S</td>
                                <td rowSpan="1" colSpan="1">K</td>
                                <td rowSpan="1" colSpan="1">K/S</td>
                                <td rowSpan="1" colSpan="1">E</td>
                                <td rowSpan="1" colSpan="1">TA</td>
                                <td rowSpan="1" colSpan="1">PCT</td>
                                <td rowSpan="1" colSpan="1">A</td>
                                <td rowSpan="1" colSpan="1">A/S</td>
                                <td rowSpan="1" colSpan="1">SA</td>
                                <td rowSpan="1" colSpan="1">SA/S</td>
                                <td rowSpan="1" colSpan="1">SE</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data.map((player, index) => {
                                    const careerStats = getCareerStats(player);
                                    const careerInfo = getCareerInfo(player);
                                    const seasonStats = getSeasonStats(player);
                                    const seasonInfo = getSeasonInfo(player);
                                    
                                    return (
                                        <tr key={player.id || index} className="stats-row">
                                            <td className="stats-item">{player.jersey_no}</td>
                                            <td className="stats-item">{player.first_name} {player.last_name}</td>
                                            <td className="stats-item">{careerInfo.gamesPlayed}</td>
                                            <td className="stats-item">{careerStats.sTeamMatchesPlayed}</td>
                                            <td className="stats-item">{careerInfo.gamesStarted || 0}</td>
                                            <td className="stats-item">{careerStats.sPoints || 0}</td>
                                            <td className="stats-item">{(careerStats.cPointsPerSets || 0).toFixed(2)}</td>
                                            <td className="stats-item">{careerStats.sKills || 0}</td>
                                            <td className="stats-item">{(careerStats.cKillsPerSets || 0).toFixed(2)}</td>
                                            <td className="stats-item">{careerStats.sErrors || 0}</td>
                                            <td className="stats-item">{careerStats.sTotalAttacks || 0}</td>
                                            <td className="stats-item">{roundTo(careerStats.sAttackPCT || 0, 3)}</td>
                                            <td className="stats-item">{careerStats.sAssists || 0}</td>
                                            <td className="stats-item">{(careerStats.cAssistsPerSets || 0).toFixed(2)}</td>
                                            <td className="stats-item">{careerStats.sAces || 0}</td>
                                            <td className="stats-item">{(careerStats.cServiceAcesPerSets || 0).toFixed(2)}</td>
                                            <td className="stats-item">{careerStats.sServiceErrors || 0}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr><td colSpan="17">No data available</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Mobile View */}
            <section className="stats-container stats-mobile-container">
                <Slider ref={sliderRef} {...settings} >
                        {data && data.length > 0 ? (
                            data.map((player, index) => {
                                const careerStats = getCareerStats(player);
                                const careerInfo = getCareerInfo(player);
                                const seasonStats = getSeasonStats(player);
                                const seasonInfo = getSeasonInfo(player);
                                
                                return (
                                    <div key={player.id || index} style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                                        <h3>{player.first_name} {player.last_name}</h3>
                                        <p><strong>Jersey #:</strong> {player.jersey_no}</p>
                                        <p><strong>Class:</strong> {player.class_short_descr}</p>
                                        
                                        <h4>Season Stats</h4>
                                        <p><strong>Games Played:</strong> {seasonInfo.gamesPlayed}</p>
                                        <p><strong>Sets:</strong> {seasonStats.sSets || 0}</p>
                                        <p><strong>Kills:</strong> {seasonStats.sKills || 0}</p>
                                        <p><strong>Assists:</strong> {seasonStats.sAssists || 0}</p>
                                        <p><strong>Digs:</strong> {seasonStats.sDigs || 0}</p>
                                        <p><strong>Aces:</strong> {seasonStats.sAces || 0}</p>
                                        
                                        <h4>Career Stats</h4>
                                        <p><strong>Games Played:</strong> {careerInfo.gamesPlayed}</p>
                                        <p><strong>Games Started:</strong> {careerInfo.gamesStarted}</p>
                                        <p><strong>Sets:</strong> {careerStats.sSets || 0}</p>
                                        <p><strong>Kills:</strong> {careerStats.sKills || 0}</p>
                                        <p><strong>Assists:</strong> {careerStats.sAssists || 0}</p>
                                        <p><strong>Digs:</strong> {careerStats.sDigs || 0}</p>
                                        <p><strong>Aces:</strong> {careerStats.sAces || 0}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No data available</p>
                        )}
                </Slider>
                <div className="">
                    <div className="schedule-header">
                        <div className="sliderButtons">
                            <button className="slider-button" onClick={previous} aria-label="Previous Match">
                                {/* Add FontAwesomeIcon if imported */}
                                Previous
                            </button>
                            <button className="slider-button" onClick={next} aria-label="Next Match">
                                {/* Add FontAwesomeIcon if imported */}
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Stats
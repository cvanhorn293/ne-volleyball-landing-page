import { useRef, useState } from "react";
import { useFetchStats } from './hooks/useFetchStats';
import Slider from "react-slick";
import './statistics.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

// Function to round the number up and keep within a specified decimal point
function roundTo(num, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}

function Stats() {
    const { data, loading, error } = useFetchStats();
    const sliderRef = useRef(null);
    
    // Stat constants from API
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

    // Toggle state for offensive / defensive view
    const [mode, setMode] = useState('offense'); // 'offense' | 'defense'
    
    // Mobile view next / prev buttons
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

    

    // Map table cell values depending on mode
    const getStatValues = (careerStats, careerInfo, mode) => {
        if (mode === 'defense') {
            return {
                gamesPlayed: careerInfo.gamesPlayed,
                teamMatches: null || 0,
                gamesStarted: null || 0,
                pts: null || 0,
                ptsPerSet: null || 0,
                k_dig: careerStats.sReturnAttempts || 0,
                kPerSet_digPerSet: careerStats.cDigsPerIndMatchesPlayed || 0,
                e_re: careerStats.sReturnErrors || 0,
                ta_rePerSet: careerStats.sReturnAttempts || 0,
                pct_bs: careerStats.sBlockSolos || 0,
                a_ba: careerStats.sBlockAssists || 0,
                aPerSet_blk: careerStats.sTotalBlocks || 0,
                sa_blkPerSet: careerStats.cTotalBlocksPerSets || 0,
                saPerSet_be: careerStats.sBlockErrors || 0,
                se_bhe: careerStats.sBallHandlingErrors || 0
            };
        }

        // default: offense
        return {
            gamesPlayed: careerInfo.gamesPlayed,
            teamMatches: careerStats.sTeamMatchesPlayed || 0,
            gamesStarted: careerInfo.gamesStarted || 0,
            pts: careerStats.sPoints || 0,
            ptsPerSet: careerStats.cPointsPerSets || 0,
            k_dig: careerStats.sKills || 0,
            kPerSet_digPerSet: careerStats.cKillsPerSets || 0,
            e_re: careerStats.sErrors || 0,
            ta_rePerSet: careerStats.sTotalAttacks || 0,
            pct_bs: careerStats.sAttackPCT || 0,
            a_ba: careerStats.sAssists || 0,
            aPerSet_blk: careerStats.cAssistsPerSets || 0,
            sa_blkPerSet: careerStats.sAces || 0,
            saPerSet_be: careerStats.cServiceAcesPerSets || 0,
            se_bhe: careerStats.sServiceErrors || 0
        };
    };

    return (
        <>
            {/* Desktop View */}
            <section className="stats-container stats-desktop-container">
                <div className="stats-header">
                    <h2>Player Highlight Stats</h2>
                    <div className="toggle-container">
                        <button
                            className={mode === 'offense' ? 'toggle-button active' : 'toggle-button'}
                            onClick={() => setMode('offense')}
                            aria-pressed={mode === 'offense'}
                        >
                            Offensive
                        </button>
                        <button
                            className={mode === 'defense' ? 'toggle-button active' : 'toggle-button'}
                            onClick={() => setMode('defense')}
                            aria-pressed={mode === 'defense'}
                        >
                            Defensive
                        </button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td rowSpan="1" colSpan={mode == "offense" ? "7" : "3"}>&nbsp;</td>
                            <td rowSpan="1" colSpan={mode == "offense" ? "5" : "3"}>{mode == "offense" ? "Attack" : "Dig"}</td>
                            <td rowSpan="1" colSpan="2">{mode == "offense" ? "Set" : "Receptions"}</td>
                            <td rowSpan="1" colSpan={mode == "offense" ? "3" : "6"}>{mode == "offense" ? "Serve" : "Blocks"}</td>
                        </tr>
                        <tr>
                            <td rowSpan="1" colSpan="1">#</td>
                            <td rowSpan="1" colSpan="1">&nbsp;</td>
                            <td rowSpan="1" colSpan="1">SP</td>
                            <td rowSpan="1" colSpan="1" className={mode == "defense" ? "hide" : ""}>MP</td>
                            <td rowSpan="1" colSpan="1" className={mode == "defense" ? "hide" : ""}>MS</td>
                            <td rowSpan="1" colSpan="1" className={mode == "defense" ? "hide" : ""}>PTS</td>
                            <td rowSpan="1" colSpan="1" className={mode == "defense" ? "hide" : ""}>PTS/S</td>
                            <td rowSpan="1" colSpan="1">{mode == "offense" ? "K" : "DIG"}</td>
                            <td rowSpan="1" colSpan="1">{mode == "offense" ? "K/S" : "DIG/S"}</td>
                            <td rowSpan="1" colSpan="1">{mode == "offense" ? "E" : "RE"}</td>
                            <td rowSpan="1" colSpan="1">{mode == "offense" ? "TA" : "RE/S"}</td>
                            <td rowSpan="1" colSpan="1">{mode == "offense" ? "PCT" : "BS"}</td>
                            <td rowSpan="1" colSpan="1">{mode == "offense" ? "A" : "BA"}</td>
                            <td rowSpan="1" colSpan="1">{mode == "offense" ? "A/S" : "BLK"}</td>
                            <td rowSpan="1" colSpan="1">{mode == "offense" ? "SA" : "BLK/S"}</td>
                            <td rowSpan="1" colSpan="1">{mode == "offense" ? "SA/S" : "BE"}</td>
                            <td rowSpan="1" colSpan="1">{mode == "offense" ? "SE" : "BHE"}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((player, index) => {
                                const careerStats = getCareerStats(player);
                                const careerInfo = getCareerInfo(player);
                                const stats = getStatValues(careerStats, careerInfo, mode);
                                
                                return (
                                    <tr key={player.id || index} className="stats-row">
                                        <td className="stats-item">{player.jersey_no}</td>
                                        <td className="stats-item">{player.first_name} {player.last_name}</td>
                                        <td className="stats-item">{stats.gamesPlayed}</td>
                                        <td className={mode == "defense" ? "hide" : "stats-item"}>{stats.teamMatches}</td>
                                        <td className={mode == "defense" ? "hide" : "stats-item"}>{stats.gamesStarted || 0}</td>
                                        <td className={mode == "defense" ? "hide" : "stats-item"}>{stats.pts || 0}</td>
                                        <td className={mode == "defense" ? "hide" : "stats-item"}>{Number(stats.ptsPerSet || 0).toFixed(2)}</td>
                                        <td className="stats-item">{stats.k_dig || 0}</td>
                                        <td className="stats-item">{Number(stats.kPerSet_digPerSet || 0).toFixed(2)}</td>
                                        <td className="stats-item">{stats.e_re || 0}</td>
                                        <td className="stats-item">{stats.ta_rePerSet || 0}</td>
                                        <td className="stats-item">{roundTo(stats.pct_bs || 0, 3)}</td>
                                        <td className="stats-item">{stats.a_ba || 0}</td>
                                        <td className="stats-item">{mode == "offense" ? Number(stats.aPerSet_blk || 0).toFixed(2) : stats.aPerSet_blk || 0}</td>
                                        <td className="stats-item">{mode == "offense" ? stats.sa_blkPerSet || 0 : roundTo(stats.sa_blkPerSet || 0, 3)}</td>
                                        <td className="stats-item">{mode == "offense" ? Number(stats.saPerSet_be || 0).toFixed(2) : stats.saPerSet_be || 0}</td>
                                        <td className="stats-item">{stats.se_bhe || 0}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr><td colSpan="17">No data available</td></tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* Mobile View */}
            <section id="stats-container" className="stats-container stats-mobile-container">
                <div className="stats-header">
                    <h2>Player Highlight Stats</h2>
                    <div className="toggle-container">
                        <button
                            className={mode === 'offense' ? 'toggle-button active' : 'toggle-button'}
                            onClick={() => setMode('offense')}
                            aria-pressed={mode === 'offense'}
                        >
                            Offensive
                        </button>
                        <button
                            className={mode === 'defense' ? 'toggle-button active' : 'toggle-button'}
                            onClick={() => setMode('defense')}
                            aria-pressed={mode === 'defense'}
                        >
                            Defensive
                        </button>
                    </div>
                </div>
                <Slider ref={sliderRef} {...settings} >
                        {data && data.length > 0 ? (
                            data.map((player, index) => {
                                const careerStats = getCareerStats(player);
                                const careerInfo = getCareerInfo(player);
                                const stats = getStatValues(careerStats, careerInfo, mode);
                                
                                return (
                                    <div key={player.id || index} className="stats-card">
                                        <h2>{player.first_name} {player.last_name}</h2>
                                        
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
                            <button className="slider-button" onClick={previous} aria-label="Previous Player">
                                {/* Add FontAwesomeIcon if imported */}
                                Previous
                            </button>
                            <button className="slider-button" onClick={next} aria-label="Next Player">
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
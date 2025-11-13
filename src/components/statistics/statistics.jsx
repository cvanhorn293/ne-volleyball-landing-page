import { useRef, useState } from "react";
import { useFetchStats } from './hooks/useFetchStats';
import { StatBlock, StatCard } from "./statCard";
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
    
    const getCareerInfo = (player) => {
        return {
            gamesPlayed: player?.statistic?.data?.career?.gamesPlayed || 0,
            gamesStarted: player?.statistic?.data?.career?.gamesStarted || 0,
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
        centerPadding: "0",
        arrows: false,
    };

    var defense = mode == "defense";
    var offense = mode == "offense";

    if (loading) return <section className="stats-container"><p>Loading...</p></section>;
    if (error) return <section className="stats-container"><p>Error: {error}</p></section>;

    

    // Map table cell values depending on mode
    const getStatValues = (careerStats, careerInfo, mode) => {
        if (defense) {
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
                            className={offense ? 'toggle-button active' : 'toggle-button'}
                            onClick={() => setMode('offense')}
                            aria-pressed={offense}
                        >
                            Offensive
                        </button>
                        <button
                            className={defense ? 'toggle-button active' : 'toggle-button'}
                            onClick={() => setMode('defense')}
                            aria-pressed={defense}
                        >
                            Defensive
                        </button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td rowSpan="1" colSpan={offense ? "7" : "3"}>&nbsp;</td>
                            <td rowSpan="1" colSpan={offense ? "5" : "3"}>{offense ? "Attack" : "Dig"}</td>
                            <td rowSpan="1" colSpan="2">{offense ? "Set" : "Receptions"}</td>
                            <td rowSpan="1" colSpan={offense ? "3" : "6"}>{offense ? "Serve" : "Blocks"}</td>
                        </tr>
                        <tr>
                            <td rowSpan="1" colSpan="1">#</td>
                            <td rowSpan="1" colSpan="1">&nbsp;</td>
                            <td rowSpan="1" colSpan="1">SP</td>
                            <td rowSpan="1" colSpan="1" className={defense ? "hide" : ""}>MP</td>
                            <td rowSpan="1" colSpan="1" className={defense ? "hide" : ""}>MS</td>
                            <td rowSpan="1" colSpan="1" className={defense ? "hide" : ""}>PTS</td>
                            <td rowSpan="1" colSpan="1" className={defense ? "hide" : ""}>PTS/S</td>
                            <td rowSpan="1" colSpan="1">{offense ? "K" : "DIG"}</td>
                            <td rowSpan="1" colSpan="1">{offense ? "K/S" : "DIG/S"}</td>
                            <td rowSpan="1" colSpan="1">{offense ? "E" : "RE"}</td>
                            <td rowSpan="1" colSpan="1">{offense ? "TA" : "RE/S"}</td>
                            <td rowSpan="1" colSpan="1">{offense ? "PCT" : "BS"}</td>
                            <td rowSpan="1" colSpan="1">{offense ? "A" : "BA"}</td>
                            <td rowSpan="1" colSpan="1">{offense ? "A/S" : "BLK"}</td>
                            <td rowSpan="1" colSpan="1">{offense ? "SA" : "BLK/S"}</td>
                            <td rowSpan="1" colSpan="1">{offense ? "SA/S" : "BE"}</td>
                            <td rowSpan="1" colSpan="1">{offense ? "SE" : "BHE"}</td>
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
                                        <td className={defense ? "hide" : "stats-item"}>{stats.teamMatches}</td>
                                        <td className={defense ? "hide" : "stats-item"}>{stats.gamesStarted || 0}</td>
                                        <td className={defense ? "hide" : "stats-item"}>{stats.pts || 0}</td>
                                        <td className={defense ? "hide" : "stats-item"}>{Number(stats.ptsPerSet || 0).toFixed(2)}</td>
                                        <td className="stats-item">{stats.k_dig || 0}</td>
                                        <td className="stats-item">{Number(stats.kPerSet_digPerSet || 0).toFixed(2)}</td>
                                        <td className="stats-item">{stats.e_re || 0}</td>
                                        <td className="stats-item">{stats.ta_rePerSet || 0}</td>
                                        <td className="stats-item">{roundTo(stats.pct_bs || 0, 3)}</td>
                                        <td className="stats-item">{stats.a_ba || 0}</td>
                                        <td className="stats-item">{offense ? Number(stats.aPerSet_blk || 0).toFixed(2) : stats.aPerSet_blk || 0}</td>
                                        <td className="stats-item">{offense ? stats.sa_blkPerSet || 0 : roundTo(stats.sa_blkPerSet || 0, 3)}</td>
                                        <td className="stats-item">{offense ? Number(stats.saPerSet_be || 0).toFixed(2) : stats.saPerSet_be || 0}</td>
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
            <section id="stats" className="stats-container stats-mobile-container">
                <div className="stats-header">
                    <h2>Player Highlight Stats</h2>
                    <div className="toggle-container">
                        <button
                            className={offense ? 'toggle-button active' : 'toggle-button'}
                            onClick={() => setMode('offense')}
                            aria-pressed={offense}
                        >
                            Offensive
                        </button>
                        <button
                            className={defense ? 'toggle-button active' : 'toggle-button'}
                            onClick={() => setMode('defense')}
                            aria-pressed={defense}
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
                                    <div key={player.id || index} className="stats-card-container">
                                        <p className="card-jersey-number">#{player.jersey_no}</p>
                                        <h2>{player.first_name} {player.last_name}</h2>
                                        <StatCard title="General Stats" hidden={defense}>
                                            <StatBlock title="SP" value={stats.gamesPlayed} />
                                            <StatBlock 
                                                title="MP"
                                                value={stats.gamesStarted || 0}
                                            />
                                            <StatBlock 
                                                title="MP"
                                                value={stats.gamesStarted || 0}
                                            />
                                            <StatBlock 
                                                title="PTS"
                                                value={stats.pts || 0}
                                            />
                                            <StatBlock 
                                                title="PTS/S"
                                                value={Number(stats.ptsPerSet || 0).toFixed(2)}
                                            />
                                        </StatCard>

                                        <StatCard title={offense ? "Attack Stats" : "Block Stats"}>
                                            <StatBlock 
                                                title={offense ? "K" : "BA"}
                                                value={offense ? stats.k_dig : stats.a_ba}
                                            />
                                            <StatBlock 
                                                title={offense ? "K/S" : "BLK"}
                                                value={offense ? Number(stats.kPerSet_digPerSet || 0).toFixed(2) : stats.aPerSet_blk}
                                            />
                                            <StatBlock 
                                                title={offense ? "E" : "BLK/S"}
                                                value={offense ? stats.e_re : roundTo(stats.sa_blkPerSet || 0, 3)}
                                            />
                                            <StatBlock 
                                                title={offense ? "TA" : "BE"}
                                                value={offense ? stats.ta_rePerSet : stats.saPerSet_be}
                                            />
                                            <StatBlock 
                                                title={offense ? "PCT" : "BHE"}
                                                value={offense ? roundTo(stats.pct_bs || 0, 3) : stats.se_bhe}
                                            />
                                        </StatCard>
                                        
                                        <StatCard title={offense ? "Serve Stats" : "Dig Stats"}>
                                            <StatBlock 
                                                title={offense ? "SA" : "DIG"}
                                                value={offense ? stats.sa_blkPerSet : stats.k_dig}
                                            />
                                            <StatBlock 
                                                title={offense ? "SA/S" : "DIG/S"}
                                                value={offense ? Number(stats.saPerSet_be || 0).toFixed(2) : Number(stats.kPerSet_digPerSet || 0).toFixed(2)}
                                            />
                                            <StatBlock 
                                                title={offense ? "SE" : "RE"}
                                                value={offense ? stats.se_bhe : stats.e_re}
                                            />
                                        </StatCard>

                                        <StatCard title={offense ? "Setting Stats" : "Reception Stats"}>
                                            <StatBlock 
                                                title={offense ? "A" : "RE/S"}
                                                value={offense ? stats.a_ba : stats.ta_rePerSet}
                                            />
                                            <StatBlock 
                                                title={offense ? "A/S" : "BS"}
                                                value={offense ? Number(stats.aPerSet_blk || 0).toFixed(2) : stats.pct_bs}
                                            />
                                        </StatCard>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No data available</p>
                        )}
                </Slider>
                <div className="stats-button-container">
                    <button className="stats-slider-button" onClick={previous} aria-label="Previous Player">
                        Previous
                    </button>
                    <button className="stats-slider-button" onClick={next} aria-label="Next Player">
                        Next
                    </button>
                </div>
            </section>
        </>
    );
}

export default Stats
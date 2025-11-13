import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolleyball, faChartSimple, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import useScreenSize from "../../hooks/windowResize";
import './navbar.css'
import neLogo from '../../assets/images/ne-logo.svg'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const screenSize = useScreenSize();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        else document.removeEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    return (
        <>
            <div className="navbar" aria-label="Navigation">

                <button className="hamburger" onClick={() => setIsOpen(true)}>
                    &#9776;
                </button>
                
                <a href="#" className="logo">            
                    <img src={neLogo} alt="University of Nebraska - Official Logo"/>
                </a>

                <a className="buy-tickets-button" href="https://huskers.evenue.net/events/2025-volleyball" target="_blank">
                    <button className="primary-button button-desktop-only">Buy Tickets</button>
                </a>

                {isOpen && <div className="overlay" />}

                <div ref={menuRef} className={`side-menu ${isOpen ? "open" : ""}`}>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>
                        &times;
                    </button>

                    <img className="side-menu-logo" src={neLogo} alt="University of Nebraska - Official Logo"/>

                    <ul className="side-menu-links margin-bottom-large">
                        <li><FontAwesomeIcon icon={faVolleyball} size="lg" /><a href="#schedule" onClick={() => setIsOpen(false)}>Schedule</a></li>
                        <li><FontAwesomeIcon icon={faChartSimple} size="lg" /><a href={screenSize.width > 768 ? "#stats-desktop" : "#stats-mobile"} onClick={() => setIsOpen(false)}>Statistics</a></li>
                        <li><FontAwesomeIcon icon={faCartShopping} size="lg" /><a href="https://shop.huskers.com/" onClick={() => setIsOpen(false)} target="_blank">Shop</a></li>
                    </ul>

                    <div className="side-menu-cta text-center">
                        <h3 className="margin-bottom-small">Get your tickets now!</h3>
                        <a href="https://huskers.evenue.net/events/2025-volleyball" target="_blank">
                            <button className="primary-button">Buy Tickets</button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    ) 
}
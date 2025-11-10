import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faVolleyball, faChartSimple, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './navbar.css'
import neLogo from '../../assets/images/ne-logo.svg'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

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
            <nav>

                <div className="navbar" aria-label="Navigation">

                    <button className="hamburger" onClick={() => setIsOpen(true)}>
                        &#9776;
                    </button>
                    
                    <img className="logo" src={neLogo} alt="University of Nebraska - Official Logo"/>

                    <ul className="nav-links">
                        <li><FontAwesomeIcon icon={faHouse} size="lg" /><a href="#">Home</a></li>
                        <li><FontAwesomeIcon icon={faVolleyball} size="lg" /><a href="#schedule">Games</a></li>
                        <li><FontAwesomeIcon icon={faChartSimple} size="lg" /><a href="#">Statistics</a></li>
                        <li><FontAwesomeIcon icon={faCartShopping} size="lg" /><a href="#">Shop</a></li>
                    </ul>

                    <button className="primary-button button-desktop-only">Buy Tickets</button>

                    {isOpen && <div className="overlay" />}

                    <div ref={menuRef} className={`side-menu ${isOpen ? "open" : ""}`}>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            &times;
                        </button>

                        <img className="side-menu-logo" src={neLogo} alt="University of Nebraska - Official Logo"/>

                        <ul className="side-menu-links margin-bottom-large">
                            <li>
                                <FontAwesomeIcon icon={faHouse} size="lg" />
                                <a href="#" onClick={() => setIsOpen(false)}>Home</a>
                            </li>
                            <li><FontAwesomeIcon icon={faVolleyball} size="lg" /><a href="#" onClick={() => setIsOpen(false)}>Games</a></li>
                            <li><FontAwesomeIcon icon={faChartSimple} size="lg" /><a href="#" onClick={() => setIsOpen(false)}>Statistics</a></li>
                            <li><FontAwesomeIcon icon={faCartShopping} size="lg" /><a href="https://shop.huskers.com/" onClick={() => setIsOpen(false)} target="_blank">Shop</a></li>
                        </ul>

                        <div className="side-menu-cta text-center">
                            <h3 className="margin-bottom-small">Get your tickets now!</h3>
                            <button className="primary-button">Buy Tickets</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    ) 
}
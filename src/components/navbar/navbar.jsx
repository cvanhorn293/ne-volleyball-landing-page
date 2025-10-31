import './navbar.css'
import reactLogo from '../../assets/images/ne-logo.svg'

function Navbar() {
    return (
        <>
            <nav>
                <img src={reactLogo} alt="University of Nebraska - Official Logo"/>
                <ul className="nav-menu">
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                </ul>
                <button className="primary-button">Buy Tickets</button>
            </nav>
        </>
    ) 
}

export default Navbar
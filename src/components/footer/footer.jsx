import './footer.css';
import neLogo from '../../assets/images/ne-logo.svg'

function Footer() {
    return (
        <>
            <footer>
                <div className="footer-copyright">
                    <img className="footer-logo" src={neLogo} alt="University of Nebraska - Official Logo"/>
                    <p className="copyright">© Nebraska Huskers, All rights reserved.</p>
                </div>
                <div className="selfPromo">
                    <p>Made by</p>
                    <a href="https://www.chrisvanhorn.com" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="36" viewBox="0 0 50 36" fill="none">
                            <g id="logo">
                                <path id="Ellipse 1 (Stroke)" d="M44.9623 11.6044C42.8415 8.22379 39.1145 6 34.8759 6C28.2942 6 22.9586 11.3726 22.9586 18C22.9586 24.6274 28.2942 30 34.8759 30C39.1234 30 42.8519 27.7625 44.9623 24.3942L50 27.6C46.8334 32.6476 41.2435 36 34.8759 36C25.0033 36 17 27.9411 17 18C17 8.05888 25.0033 0 34.8759 0C41.2435 0 46.8334 3.3524 50 8.4L44.9623 11.6044Z" fill="white" fillOpacity="0.4"></path>
                                <path id="Ellipse 1 (Stroke)_2" d="M27.9623 11.6044C25.8415 8.22379 22.1145 6 17.8759 6C11.2942 6 5.95864 11.3726 5.95864 18C5.95864 24.6274 11.2942 30 17.8759 30C22.1234 30 25.8519 27.7625 27.9623 24.3942L33 27.6C29.8334 32.6476 24.2435 36 17.8759 36C8.00332 36 0 27.9411 0 18C0 8.05887 8.00332 0 17.8759 0C24.2435 0 29.8334 3.3524 33 8.4L27.9623 11.6044Z" fill="white" fillOpacity="0.8"></path>
                            </g>
                        </svg>
                    </a>
                </div>
            </footer>
        </>
    );
} 

export default Footer;
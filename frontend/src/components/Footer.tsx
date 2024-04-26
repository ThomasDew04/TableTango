import { memo } from "react";
import logo_big from "../images/logo-big.png";
import logo_small from "../images/logo-small.png";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { BsCurrencyEuro } from "react-icons/bs";

export default memo(function Home() {

    return (
        <footer>
            <div className="foot-first">
                <img src={logo_big} alt="logo" />
            </div>
            <div className="foot-second">
                <div className="foot-links">
                    <a href="#" className="foot-link"><p>GitHub</p><FaGithub size={25} /></a>
                    <a href="#" className="foot-link"><p>FaceBook</p><FaFacebook size={25} /></a>
                    <a href="#" className="foot-link"><p>LinkedIn</p><FaLinkedin size={25} /></a>
                    <a href="#" className="foot-link"><p>Instagram</p><FaInstagram size={25} /></a>
                </div>
                <p className="foot-cr">© All rights reserved to <span>Thomas Dewilde</span></p>
                <div className="foot-pref">
                    <a href="#" className="foot-link"><CiGlobe size={25} /><p>English (US)</p></a>
                    <a href="#" className="foot-link"><BsCurrencyEuro size={25} /><p>EUR</p></a>
                </div>
            </div>
            <div className="foot-third">
                <img src={logo_small} alt="logo" />
            </div>
        </footer>
    )
});
import { memo } from "react";
import logo_small from "../images/logo-small.png";
import { Link, useLocation } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

export default memo(function Home() {
    const { pathname } = useLocation();

    return (
        <nav>
            <Link to="/" className="nav-logo center">
                <img src={logo_small} alt="logo" /><p>TableTango</p>
            </Link>
            <div className="nav-links">
                <Link to="restaurants" className={pathname.includes("restaurants") ? "active" : ""} >Restaurants</Link>
                <Link to="reservations" className={pathname.includes("reservations") ? "active" : ""} >Reservations</Link>
                <Link to="favorites" className={pathname.includes("favorites") ? "active" : ""} >Favorites</Link>
            </div>
            <div className="nav-account">
                <button>
                    <p>Thomas</p>
                    <BsPersonCircle size={35} />
                </button>
            </div>
        </nav>
    );
});
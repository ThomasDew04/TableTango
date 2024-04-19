import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { BsPersonCircle } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";

export default function AuthButton() {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return (
            <Link to="login" className="nav-account-login center">
                <p>Log in</p>
                <BiLogIn size={35} />
            </Link>
        );
    }
    return (
        <Link to="/account" className="nav-account-button">
            <p>{user?.name}</p>
            <BsPersonCircle size={35} />
        </Link>
    );
}
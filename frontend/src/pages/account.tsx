import { memo } from "react";
import BreadCrumb from "../components/diverse/BreadCrumb";
import { useAuth } from "../components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default memo(function Account() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      // Clear authentication state & local storage
      logout();
      navigate('/');
    };
    
    return (
        <div className="restaurants-page">
            <BreadCrumb page="Account" />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
});
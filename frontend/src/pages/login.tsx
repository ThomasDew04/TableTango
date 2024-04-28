import { memo, useState } from "react";
import BreadCrumb from "../components/diverse/BreadCrumb";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useUsers from "../api/users";
import Error from "../components/Error";
import { compareSync } from "bcrypt-ts";
import { useAuth } from "../components/auth/AuthProvider";

export default memo(function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { getByName } = useUsers();
    const { login } = useAuth();

    const toggleVisibility = () => {
      setPasswordVisible(!passwordVisible);
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setError(null);
            // Fetch user by username
            const user = await getByName(username);
            if (!user) {
                setError("User not found");
                return;
            }
            // Check if password matches
            if (!compareSync(password, user.password)) {
                setError("Invalid password");
                return;
            }
            // Login successful
            login(user);
        } catch (error: any) {
            setError(error);
        }
    };

    return (
        <div className="restaurants-page">
            <Error error={error} />
            <BreadCrumb page="Login" />
            <div className="main-container">
                <form className="login-form" onSubmit={onSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" 
                            required 
                            placeholder="Thomas123" 
                            value={username}
                            data-cy="username"
                            onChange={(e) => setUsername(e.target.value)} 
                            />
                    </div>
                    <div>
                        <label>Password</label>
                        <div className="pw-input">
                            <input type={passwordVisible ? 'text' : 'password'} 
                                required 
                                placeholder="********"
                                value={password}
                                data-cy="password"
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            <button className="center" type="button" onClick={toggleVisibility}>
                                {passwordVisible ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="login-btn" data-cy="login-btn">Login</button>
                </form>
                <p className="no-account center">Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
});
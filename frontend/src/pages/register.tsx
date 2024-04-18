import { memo, useState } from "react";
import BreadCrumb from "../components/diverse/BreadCrumb";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import useUsers from "../api/users";
import { genSaltSync, hashSync } from "bcrypt-ts";

export default memo(function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { create } = useUsers();
    const navigate = useNavigate();

    const toggleVisibility = () => {
      setPasswordVisible(!passwordVisible);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          setError(null);
          await create({ name: username, email: email, password: hashSync(password, genSaltSync(10))});
          navigate('/login');
        } catch (error: any) {
          setError(error.response.data.message);
        }
      };

    return (
        <div className="restaurants-page">
            <Error error={error} />
            <BreadCrumb page="Create your account" />
            <div className="main-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input type="text" 
                            required 
                            placeholder="Thomas123" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" 
                            required 
                            placeholder="thomas@mail.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    <div>
                        <label>Password</label>
                        <div className="pw-input">
                            <input type={passwordVisible ? 'text' : 'password'} 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            <button className="center" type="button" onClick={toggleVisibility}>
                                {passwordVisible ? <FaEye size={20}/> : <FaEyeSlash size={20}/>}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="login-btn">Create account</button>
                </form>
            </div>
        </div>
    );
});
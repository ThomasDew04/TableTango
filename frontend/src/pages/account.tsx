import { memo, useState } from "react";
import { useAuth } from "../components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import placeholder from "../images/account-placeholder.png";
import AccountModal from "../components/diverse/AccountModal";
import { CiCircleChevDown } from "react-icons/ci";

export default memo(function Account() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalProps, setModalProps] = useState<{ field: string; currentValue?: string; type:string }>({ field: '', currentValue: '', type:'' });    
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleModal = (field: string, type:string, currentValue?: string) => {
        setModalProps(prevProps => ({ ...prevProps, field, currentValue, type }));
        setModalOpen(prev => !prev);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalProps({ field: '', currentValue: '', type:'' });
    };

    interface InfoRowProps {
        label: string;
        value: string;
        onClickEdit: () => void;
        fieldType?: string;
    }
    
    const InfoRow = ({ label, value, onClickEdit, fieldType }: InfoRowProps) => {
        return (
            <div className="info-row">
                <span className="info-label">
                    <h3>{label}</h3>
                    <button onClick={onClickEdit}>Edit</button>
                </span>
                <p>{fieldType === 'password' ? '*******************' : value}</p>
            </div>
        );
    };

    return (
        <div className="restaurants-page">
            <div className="breadcrumb">
                <div className="bc-det">
                    <h1>Account</h1>
                    <button className="logout-btn" onClick={handleLogout}><p>Logout</p><BiLogOut size={25} /></button>
                </div>
                <span />
            </div>
            <div className="restaurant-details">
                {modalOpen && <AccountModal id={user?.ID!} {...modalProps} onCancel={closeModal} />}
                <div className="left-account">
                    <div className="account-card">
                        <span className="acc-img-container">
                        {user?.image ? 
                        <img className="account-img" src={user?.image} alt="User" /> : 
                        <img className="account-img" src={placeholder} alt="User" /> }
                        <div className="overlay center" onClick={() => toggleModal('image', 'text', user?.image)}>Change</div>
                        </span>
                        <h2>{user?.name}</h2>
                        <span className="dark-divider"/>
                        {/* REPLACE WITH DATA */}
                        <p><strong>9</strong> <br />Reservations made</p>
                        <span className="light-divider"/>
                        <p><strong>5</strong> <br />Months on TableTango</p>
                        <span className="light-divider"/>
                        <p><strong>235</strong> <br />TableTango points</p>
                    </div>
                </div>
                <div className="right-account">
                    <div className="personal-info" onClick={() => setIsVisible((prev) => !prev)}>
                        <h2>Personal info</h2>
                        <CiCircleChevDown size={35} />
                    </div>
                    <div className={`additional-info ${isVisible ? 'visible' : ''}`}>
                        <InfoRow
                            label="Username"
                            value={user?.name!}
                            onClickEdit={() => toggleModal('username', 'text', user?.name)}
                        />
                        <InfoRow
                            label="Password"
                            value=""
                            onClickEdit={() => toggleModal('password', 'password', '')}
                            fieldType="password"
                        />
                        <InfoRow
                            label="Email"
                            value={user?.email!}
                            onClickEdit={() => toggleModal('email', 'text', user?.email)}
                        />
                    </div>
                    <div className="personal-info" onClick={() => setIsVisible2((prev) => !prev)}>
                        <h2>Personal preferences</h2>
                        <CiCircleChevDown size={35} />
                    </div>
                    <div className={`additional-info ${isVisible2 ? 'visible' : ''}`}>
                        <InfoRow
                            label="Language"
                            value="English"
                            onClickEdit={() => toggleModal('language', 'text', "English")}
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
  });
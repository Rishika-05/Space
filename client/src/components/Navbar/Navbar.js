import React from 'react'
import Logo from '../../assets/images/navLogo.svg'
import UserPic from '../../assets/images/user.png'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar(props) {

    const navigate = useNavigate();
    let loc = useLocation();


    const userProfile = () => {
        navigate(`/profile/${props.user._id}`)
    }

    const logOut = () => {
        props.setLoginUser(null);
        localStorage.removeItem('user');
        toast("Logged out successfully!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ "backgroundColor": "white", "height": "60px", "zIndex": '2', "boxShadow": "0px 2px 10px #EAEAEA" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand ms-5" to="/" style={{ "marginLeft": "10px" }}><img src={Logo} alt="Space Logo" /> </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5 " style={{ "fontSize": "18px" }}>
                            <li className="nav-item me-4">
                                <Link className={`nav-link ${loc.pathname === '/ide' ? "active" : ""}`} aria-current="page" to="/ide">Online IDE</Link>
                            </li>
                            <li className="nav-item  me-4">
                                <Link className={`nav-link ${loc.pathname === '/problemset' ? "active" : ""}`} to="/problemset">Practice</Link>
                            </li>
                            <li className="nav-item  me-4">
                                <Link className={`nav-link ${loc.pathname === '/leaderboard' ? "active" : ""}`} to="/leaderboard">Leaderboard</Link>
                            </li>
                            <li className="nav-item  me-4">
                                <Link className={`nav-link ${loc.pathname === '/interview' ? "active" : ""}`} to="/interview">Interview</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={UserPic} alt="" style={{ "height": "25px", "marginRight": "10px" }} />{props.user.name}
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ "fontSize": "18px" }}>
                                    <li><div className="dropdown-item" onClick={userProfile}>Profile</div></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" onClick={logOut} to="/login">Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </>
    )
}



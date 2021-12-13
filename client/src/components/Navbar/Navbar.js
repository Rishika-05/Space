import React from 'react'
import Logo from '../../assets/images/navLogo.svg'
import UserPic from '../../assets/images/user.png'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
    const navigate = useNavigate();
    // console.
    const userProfile = () => {
        navigate(`/profile/${props.user._id}`)
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ "backgroundColor": "white", "height": "70px", zIndex: '2' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand ms-5" to="/" style={{ "marginLeft": "10px" }}><img src={Logo} alt="" /> </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5 mt-2" style={{ "fontSize": "18px" }}>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" aria-current="page" to="/ide">Online IDE</Link>
                            </li>
                            <li className="nav-item  me-4">
                                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                            </li>
                            <li className="nav-item  me-4">
                                <Link className="nav-link" to="/interview">Interview</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={UserPic} alt="" style={{ "height": "25px", "marginRight": "10px" }} />{props.user.name}
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ "fontSize": "18px" }}>
                                    <li><div className="dropdown-item" onClick={userProfile}>Profile</div></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" onClick={() => { props.setLoginUser(null) }} to="/login">Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                        {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className ="btn btn-outline-success" type ="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </>
    )
}



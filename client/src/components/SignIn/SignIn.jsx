import React, { useState, useEffect } from 'react'
import '../login.css'
import logo from '../../assets/images/space1.gif'
import logoText from '../../assets/images/Space.png'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


export default function SignIn(props) {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    useEffect(() => {
        document.title = 'Sign In | Space';
        // eslint-disable-next-line
    }, []);

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const signin = () => {
        const { email, password } = user
        if (email && password) {
            axios.post("http://localhost:9002/login", user)
                .then(res => {
                    toast(res.data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    props.setLoginUser(res.data.user)
                    if (res.data.user)
                        navigate('/')
                    else
                        navigate('/login')
                });
        }
        else {
            toast('invalid input', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setUser({
                email: "",
                password: ""
            })
        }
    }

    return (
        <div>
            <div>
                <div className="container upperBox">
                    <div className="container left">
                        <img src={logo} className="gif_left phone" alt="logo"></img>
                        <img src={logoText} className="gif_left pull" alt="main_logo"></img>
                        <p className="text">A Space to practice and achieve DREAMS</p>
                    </div>
                    <div className="container right">
                        <div className="container box">
                            <div className="form-group">
                                <input name="email" type="email" value={user.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"
                                    onChange={handleChange} />

                            </div>
                            <div className="form-group">
                                <input type="password" name="password" value={user.password} className="form-control" id="show_hide_password" placeholder="Password"
                                    onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={signin}>Log In</button>
                            <div style={{ textAlign: "center" }}>or</div>
                            <Link className="btn btn-primary newAcc" to="/SignUp">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
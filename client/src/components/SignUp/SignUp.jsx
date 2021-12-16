import React, { useState } from 'react'
import '../login.css'
import logo from '../../assets/images/space1.gif'
import logoText from '../../assets/images/Space.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
    })
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    let chkpass = (password) => {

        let parameter = {
            capital: false,
            small: false,
            number: false,
            len: false
        }
        if (password.length >= 8) {
            parameter.len = true;
        }
        for (let i = 0; i < password.length; i++) {
            let cur = password.charCodeAt(i);
            if (cur >= 65 && cur <= 90) {
                parameter.capital = true;
            }
            if (cur >= 97 && cur <= 122) {
                parameter.small = true;
            }
            if (cur >= 48 && cur <= 57) {
                parameter.number = true;
            }
        }
        if (parameter.capital && parameter.small && parameter.number && parameter.len) {
            return true;
        }
        else {
            return false;
        }
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        console.log(user);
        if (name && email && password && (password === reEnterPassword)) {

            if (chkpass(password)) {
                axios.post("http://localhost:9002/signUp", user)
                    .then(res => {
                        toast(res.data.message, {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        navigate('/')
                    })
            }
            else {
                toast('Weak Password', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
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
                name: "",
                email: "",
                password: "",
                reEnterPassword: "",
            })
        }

    }

    return (
        <div>
            <div className="container upperBox">
                <div className="container left">
                    <img src={logo} className="gif_left phone" alt="logo"></img>
                    <img src={logoText} className="gif_left pull" alt="main_logo"></img>
                    <p className="text">A Space to pratice and achieve DREAMS</p>
                </div>
                <div className="container right">
                    <div className="container box">
                        <div className="form-group">
                            <input type="text" value={user.name} className="form-control" name="name" placeholder="Full Name" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="email" value={user.email} className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Email"
                                onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" value={user.password} className="form-control" id="show_hide_password" name="password" placeholder="Password"
                                onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" value={user.reEnterPassword} className="form-control" id="show_hide_password" name="reEnterPassword" placeholder="Confirm Password"
                                onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary push" onClick={register}>Create Account</button>
                        <Link className="back" to="/">Back to LogIn Page</Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
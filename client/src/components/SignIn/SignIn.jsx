import React, { useState } from 'react'
import '../login.css'
import logo from '../../assets/images/space1.gif'
import logoText from '../../assets/images/Space.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function SignIn(props) {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
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
            axios.post("http://localhost:9002/user/login", user)
                .then(res => {
                    alert(res.data.message)
                    props.setLoginUser(res.data.user)
                    if (res.data.user)
                        navigate('/user/home')
                    else
                        navigate('/user/login')
                });
        }
        else {
            alert('invalid input');
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
                        <p className="text">A Space to pratice and achieve DREAMS</p>
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
        </div>
    )
}
import React, { useState } from 'react'
import '../login.css'
import logo from '../../assets/images/space1.gif'
import logoText from '../../assets/images/Space.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

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

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        console.log(user);
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:9002/user/signUp", user)
                .then(res => {
                    alert(res.data.message)
                    navigate('/')
                })
        }
        else {
            alert('invalid input');
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
        </div>
    )
}
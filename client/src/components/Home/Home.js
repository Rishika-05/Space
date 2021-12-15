import React from 'react'
import { Link } from 'react-router-dom'
import Particles from 'react-particles-js'
import patriclesConfig from './config/particle-config'
import './home.css'
import inter from './inter.png'
import prob from './problem.png'
import puz from './puzzle.png'
import {useNavigate} from 'react-router-dom'

export default function Home(props) {
    return (
        <div className="home1">
            <Particles
                params={patriclesConfig} />
            <div className="maincontent" style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.6vw', fontWeight: 'lighter', color: '#263238' }}>Space Helps You</h1>
                <h2 style={{ fontSize: '3.6vw', fontWeight: 'bold', color: '#263238' }}>Build Bright Future</h2>
            </div>
            <div className="bottom_boxx" style={{ textAlign: 'center' }}>
                <div className="imgContainer">
                    <img src={inter} alt="Interview" className='imgg' />
                    <h3 className='hh3'>Interview</h3>
                    <Link to='/interview' style={{ "textDecoration": "none" }}><button className="btn btn-dark btn-sm">Interview </button></Link>
                </div>
                <div className="imgContainer pull">
                    <img src={prob} alt="Problem" className='imgg' />
                    <h3 className='hh3'>Problem Solving</h3>
                    <Link to='/problemset' style={{ "textDecoration": "none" }}><button className ="btn btn-dark btn-sm">Problem Solving</button></Link>
                </div>
                <div className="imgContainer pull">
                    <img src={puz} alt="Puzzle" className='imgg' />
                    <h3 className='hh3'>Puzzles</h3>
                    <button className="btn btn-dark btn-sm">Puzzles</button>
                </div>
                {/* <div><Link to='/login' onClick={() => { props.setLoginUser(null) }}>LogOut</Link></div> */}
            </div>
        </div>
    )
}

/*
<div className="maincontent" style={{ textAlign: 'center' }}>
                <h1>Home Page</h1>
                <h2>Name: {props.user.name}</h2>
                <h2>Email: {props.user.email}</h2>
                <Link to='/'>LogOut</Link>
            </div>

*/

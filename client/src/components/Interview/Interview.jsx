import React from 'react'
// import { Link } from 'react-router-dom'
import Particles from 'react-particles-js'
import patriclesConfig from './config/particle-config'
import './Interview.css'
import schedule from './schedule.svg'
import join from './join.svg'

const Interview = () => {
   return (
      <div className="interview">
         <Particles
            params={patriclesConfig} />
         <div className="main_content" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '4vw', fontWeight: 'lighter', color: '#263238' }}>Space Helps You</h1>
            <h2 style={{ fontSize: '4vw', fontWeight: 'bold', color: '#263238' }}>Improve Your Skills</h2>
         </div>
         <div className="bottom_boxx" style={{ textAlign: 'center' }}>
            <div className="imgContainer">
               <img src={schedule} alt="Interview" className='imgg' />
               <h1></h1>
               <button type="button" style={{ "fontSize":"18px" }}  className="btn btn-dark my-4">Schedule</button>
            </div>
            <div className="imgContainer pull">
               <img src={join} alt="Problem" className='imgg' />
               <h1></h1>
               <button type="button" style={{ "fontSize": "18px" }} className="btn btn-dark my-4">Join</button>
            </div>
         </div>
      </div>
   )
}

export default Interview

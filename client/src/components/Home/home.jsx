import React from 'react'
import { Link } from 'react-router-dom'
import Particles from "react-tsparticles";
import Navbar from '../Navbar/Navbar.js';

const home = (props) => {
   const particlesInit = (main) => {
      // console.log(main);
   };

   const particlesLoaded = (container) => {
      // console.log(container);
   };
   return (
      <>
         <Particles
            style={{ "position": "absolute" }}
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
               background: {
                  color: {
                     value: "#171C3D",
                  },
               },
               fpsLimit: 60,
               interactivity: {
                  events: {
                     onClick: {
                        enable: true,
                        mode: "push",
                     },
                     onHover: {
                        enable: true,
                        mode: "repulse",
                     },
                     resize: true,
                  },
                  modes: {
                     bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 0.8,
                        size: 40,
                     },
                     push: {
                        quantity: 4,
                     },
                     repulse: {
                        distance: 200,
                        duration: 0.4,
                     },
                  },
               },
               particles: {
                  color: {
                     value: "#a8e4ea",
                  },
                  links: {
                     color: "#a8e4ea",
                     distance: 150,
                     enable: true,
                     opacity: 0.5,
                     width: 1,
                  },
                  collisions: {
                     enable: true,
                  },
                  move: {
                     direction: "none",
                     enable: true,
                     outMode: "bounce",
                     random: false,
                     speed: 3.5,
                     straight: false,
                  },
                  number: {
                     density: {
                        enable: true,
                        value_area: 750,
                     },
                     value: 80,
                  },
                  opacity: {
                     value: 0.5,
                  },
                  shape: {
                     type: "triangle",
                  },
                  size: {
                     random: true,
                     value: 5,
                  },
               },
               detectRetina: true,
            }}
         />
         <Navbar />
         <div style={{ textAlign: "center" }}>
            <h1>Home Page</h1>
            {/* <h2>Name: {props.user.name}</h2>
            <h2>Email: {props.user.email}</h2> */}
            <Link to='/'>LogOut</Link>
         </div>
      </>
   )
}

export default home

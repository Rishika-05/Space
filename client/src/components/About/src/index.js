import React, { useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Controller, Scene } from "react-scrollmagic";
import Sequence from "./Sequence";

import { useEffect } from "react";
import { ThemeProvider } from "./context";
import App from './App.jsx';

const About = () => {
  const ref = useRef();
  const text = document.querySelector("#about-logo");
        
  
  useEffect(() => {
    // const textAnim = gsap.fromTo(text,{ opacity: 1 }, { opacity: 0,duration:2});
     
  })
  return (
    <div className="App">
      <Controller>
        <Scene duration="200%" triggerHook="onLeave" pin>
          {progress => (
            <div id = "sequence" style={{ height: "100vh", position: "relative" }}>
              
              <Sequence ref={ref} progress={progress}  />
            </div>
          )}
        </Scene>
      </Controller>
      <ThemeProvider>
      <App />
    </ThemeProvider>
     
     
        
    </div>
  );
};

export default About

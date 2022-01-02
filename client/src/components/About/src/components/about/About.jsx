import React from 'react';
import {useEffect,useState} from 'react';

import "./about.css";
import Award from "../../img/award.png";
import Interview from "../../img/interview.png"
import whiteboard from "../../img/whiteboard.png"
import chat from "../../img/chat.png"
import problemset from "../../img/problemset.png"
import IDE from "../../img/IDE.png"
import google from "../../img/google.png"
import agora from "../../img/agora.png"
import white from "../../img/white.jpg"
import chatLogo from '../../img/chatlogo.jpg'
import problemLogo from '../../img/problemLogo.jpg'

const About = (props) => {
  const [image,setImage] = useState({});
  const [logo,setLogo] = useState({});
  useEffect(() => {
    setLogo(Award);
    if(props.currImg === 1){
      setImage(Interview);
      setLogo(agora)
    }
    if(props.currImg === 2){
      setImage(whiteboard);
      setLogo(white)
    }
    if(props.currImg === 3){
      setImage(chat);
      setLogo(chatLogo);
    }
    if(props.currImg === 4){
      setImage(problemset);
      setLogo(problemLogo);
    }
    if(props.currImg === 5){
      setImage(IDE);
      setLogo(google)
    }
  })
  if(props.position === 1){
    return (
      <div className="a">
        <div className="a-left">
          <div className="a-card bg"></div>
          <div className="a-card">
            <img
              src={image}
              alt=""
              className="a-img"
            />
          </div>
        </div>
        <div className="a-right">
          <h1 className="a-title">About Me</h1>
          <p className="a-sub">
            It is a long established fact that a reader will be distracted by the
            readable content.
          </p>
          <p className="a-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat duis aute irure dolor in reprehende.
          </p>
          <div className="a-award">
            <img src={logo} alt="" className="a-award-img" />
            <div className="a-award-texts">
              <h4 className="a-award-title">International Design Awards 2021</h4>
              <p className="a-award-desc">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur autodit
                and fugit.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }else{
    return (
      <div className="a" style = {{"margin-left":"10%"}}>
        
        <div className="a-right">
          <h1 className="a-title">About Me</h1>
          <p className="a-sub">
            It is a long established fact that a reader will be distracted by the
            readable content.
          </p>
          <p className="a-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat duis aute irure dolor in reprehende.
          </p>
          <div className="a-award">
            <img src={logo} alt="" className="a-award-img" />
            <div className="a-award-texts">
              <h4 className="a-award-title">International Design Awards 2021</h4>
              <p className="a-award-desc">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur autodit
                and fugit.
              </p>
            </div>
          </div>
        </div>
        <div className="a-left">
          <div className="a-card bg"></div>
          <div className="a-card">
            <img
              src={image}
              alt=""
              className="a-img"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default About;

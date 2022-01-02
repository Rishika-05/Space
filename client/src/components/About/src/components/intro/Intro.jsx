import "./intro.css";
import Me from "../../img/me.gif";

const Intro = () => {
  return (
    <div className="i">
      <div className="i-left">
        <div className="i-left-wrapper">
          <h2 className="i-intro">Turning your dreams to reality</h2>
          <h1 className="i-name">Space</h1>
          <div className="i-title">
            <div className="i-title-wrapper">
              <div className="i-title-item">Interview</div>
              <div className="i-title-item">Problems</div>
              <div className="i-title-item">Puzzles</div>
              <div className="i-title-item">IDE</div>
              <div className="i-title-item">Progress Tracker...</div>
            </div>
          </div>
          <p className="i-desc">
            Space is a platform that gives you ability to conduct real one-to-one interviews with low latency collaborative whiteboard and IDE with real time chat.
            It also powers you with the ability to practice problems and code it right in here with our google cloud powered IDE. 
          </p>
        </div>
        
      </div>
      <div className="i-right">
        <div className="i-bg"></div>
        <img src={Me} alt="" className="i-img" />
      </div>
    </div>
  );
};

export default Intro;

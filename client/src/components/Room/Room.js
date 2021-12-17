import React from 'react'
import './Room.css'
// import { Link } from 'react-router-dom'
// import Logo from '../../assets/images/navLogo.svg'
import Unauthorized from '../unauthorized/Unauthorized';
import Github from '../RoomComp/Github/Github'
import Codeforces from '../RoomComp/CF/Cf'
import Ide from '../ide/Ide'
import { UseUtils } from '../utils/roomUtils';


const Room = (props) => {

   const { setInterview, name, room } = props;
   let username = name;
   let roomid = room;
   const { show_video, show_chat, show_board, show_code, show_git, show_cf } = UseUtils();
   setInterview(false);


   if (props.user === undefined) {
      return (
         <Unauthorized />
      )
   }
   else {
   return (
      <>
         {/* <nav className="navbar navbar-expand-lg navbar-light" style={{ "backgroundColor": "white", "height": "50px", zIndex: '100', "boxShadow": "0px 2px 10px #EAEAEA" }}>
            <div className="container-fluid">
               <Link className="navbar-brand ms-5" to="/" style={{ "marginLeft": "10px" }}><img src={Logo} alt="" /> </Link>
            </div>
         </nav> */}
         <div className="sidebar">
            <button onClick={show_video} data-toggle="tooltip" data-placement="right" title="Dashboard">
               <i className="fas fa-desktop fa-2x"></i></button>
            <button onClick={show_chat} data-toggle="tooltip" data-placement="right" title="Chat">
               <i className="fas fa-comment fa-2x"></i></button >
            <button onClick={show_board} data-toggle="tooltip" data-placement="right" title="Whiteboard">
               <i className="fas fa-edit fa-2x"></i></button>
            <button onClick={show_code} data-toggle="tooltip" data-placement="right" title="Compiler">
               <i className="fas fa-code fa-2x"></i></button>
            <button onClick={show_git} data-toggle="tooltip" data-placement="right" title="GitHub">
               <i className="fab fa-github fa-2x"></i></button >
            <button onClick={show_cf} data-toggle="tooltip" data-placement="right" title="Codeforces">
               <i className="fas fa-chart-bar fa-2x"></i></button>
         </div>

         <div className="content_space">
            <div className="room row">
               <div className="col-md-12 col-sm-12 video " id="video_space">
                  <div className="video">
                     <div id="videos">
                        <video id="remote_Video" autoplay playsinline ></video>
                        <video id="local_Video" muted autoplay playsinline></video>
                     </div>
                  </div>
               </div>
               <div className="col-md-12 col-sm-12 d-none" id="chat_space" >
                  <div className="container-fluid" id='chattt' style={{ 'height': '100vh'}} >
                     <embed src={`https://chat-with-space.herokuapp.com/?username=${username}&room=${roomid}`} id="chat_s" style={{ 'height': '99vh', 'width': '96vw' }} /> 
                     {/* <embed src="http://localhost:7000/?username=Rishika&room=1234" id="chat_s" style={{ 'height': '99vh', 'width': '98vw'}} /> */}
                  </div>
               </div>
               <div className="col-md-12 col-sm-12  d-none" id="board_space">
                  <div className="container-fluid">
                     
                  </div>
               </div>
               <div className="col-md-12 col-sm-12  d-none" id="code_space">
                  <div className="container-fluid">
                     <Ide user={props.user}/>
                  </div>
               </div>
               <div className="col-md-12 col-sm-12 d-none" id="git_space">
                  <div className="container-fluid" >
                     <Github />
                  </div>
               </div>
               <div className="col-md-12 col-sm-12 d-none" id="cf_space">
                  <div className="container-fluid" >
                     <Codeforces />
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
}

export default Room

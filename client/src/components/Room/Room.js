import React from 'react'
import './Room.css'
import Unauthorized from '../unauthorized/Unauthorized';
import Github from '../RoomComp/Github/Github'
import Codeforces from '../RoomComp/CF/Cf'
// import Ide from '../ide/Ide'



const Room = (props) => {

   const { setInterview } = props;
   setInterview(false);

   // if (props.user === undefined) {
   //    return (
   //       <Unauthorized />
   //    )
   // }
   // else {
      return (
         <>
            <div className="sidebar">
               <button onClick="show_video()" data-toggle="tooltip" data-placement="right" title="Dashboard">
                  <i className="fas fa-desktop fa-2x"></i></button>
               <button href="#" onClick="show_chat()" data-toggle="tooltip" data-placement="right" title="Chat">
                  <i className="fas fa-comment fa-2x"></i></button >
               <button href="#" onClick="show_board()" data-toggle="tooltip" data-placement="right" title="Whiteboard">
                  <i className="fas fa-edit fa-2x"></i></button>
               <button href="#" onClick="show_code()" data-toggle="tooltip" data-placement="right" title="Compiler">
                  <i className="fas fa-code fa-2x"></i></button>
               <button href="#" onClick="show_git()" data-toggle="tooltip" data-placement="right" title="GitHub">
                  <i className="fab fa-github fa-2x"></i></button >
               <button href="#" onClick="show_cf()" data-toggle="tooltip" data-placement="right" title="Codeforces">
                  <i className="fas fa-chart-bar fa-2x"></i></button>
            </div>

            <div className="content_space">
               <div className="row">
                  <div className="col-md-12 col-sm-12 video d-none" id="video_space">
                     <div className="video">
                        <div id="videos">
                           <video id="remoteVideo" autoplay playsinline style={{ "height": "100vh" }}></video>
                           <video id="localVideo" muted autoplay playsinline></video>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12  d-none" id="chat_space">
                     <div className="container-fluid" style={{ "height": "100vh" }}>

                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12  d-none" id="board_space">
                     <div className="container-fluid" style={{ "height": "100vh" }}>
                        
                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12  d-none" id="code_space">
                     <div className="container-fluid" style={{ "height": "100vh" }}>
                        {/* <Ide/> */}
                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12 d-none" id="git_space" style={{ "height": "100vh"}}>
                     <div className="container-fluid" style={{ "height": "100vh" }}>
                        <Github/>
                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12 d-none" id="cf_space" style={{ "height": "100vh" }}>
                     <div className="container-fluid" style={{ "height": "100vh" }}>
                        <Codeforces/>
                     </div>
                  </div>
               </div>
            </div>
         </>
      )
   }
// }

export default Room

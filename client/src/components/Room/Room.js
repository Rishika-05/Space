import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Room.css'
import Unauthorized from '../unauthorized/Unauthorized';
import Github from '../RoomComp/Github/Github'
import Codeforces from '../RoomComp/CF/Cf'
import Ide from '../ide/Ide'
import { UseUtils } from '../utils/roomUtils';
import init from '../utils/videoUtils';
import {
   Modal, ModalHeader, ModalBody, Button, ModalFooter
} from "reactstrap"

var aud = window.localStorage.getItem('audio');
var vid = window.localStorage.getItem('video');



const Room = (props) => {

   const { setInterview } = props;
   const { show_video, show_chat, show_board, show_code, show_git, show_cf } = UseUtils();
   setInterview(false);

   const navigate = useNavigate();

   const [modal, setModal] = useState(false);
   const [modalw, setModalW] = useState(false);

   var username = window.localStorage.getItem('Name');
   var roomid = window.localStorage.getItem('ID');

   
   const [micr, setMicr] = useState(aud);
   const [camr, setCamr] = useState(vid);

   console.log(aud + '<- Audio & Video -> ' + vid);
   console.log(micr + '<- Micro & Came -> ' + camr);

   useEffect(() => {
      if (window.localStorage.getItem('Type') === 'IE') {
         toggle();
      }
      document.title = 'Room | Space'
      const localVideo = document.querySelector('#local_Video');
      const remoteVideo = document.querySelector('#remote_Video');
      init(localVideo, remoteVideo);
      window.addEventListener('beforeunload', onUnload);
      // eslint-disable-next-line
   }, []);
   
   const onUnload = () => {
      navigate("/join");
   };

   const toggle = () => {
      setModal(!modal);
   }
   
   const togglew = () => {
      setModalW(!modalw);
   }

   var elem = document.documentElement;

   const fullScreen = () => {
      if (elem.requestFullscreen) {
         elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
         elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
         elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
         elem.msRequestFullscreen();
      }
   }

   if (window.localStorage.getItem('Type') === 'IE') {
      document.addEventListener('fullscreenchange', exitHandler);
      document.addEventListener('webkitfullscreenchange', exitHandler);
      document.addEventListener('mozfullscreenchange', exitHandler);
      document.addEventListener('MSFullscreenChange', exitHandler);

      function exitHandler() {
         if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            togglew();
         }
      }
   }

   const toggleCamera = async () => {
      vid = !vid;
      window.localStorage.setItem('video', vid);
      setCamr(!camr);
      console.log("Video " +window.localStorage.getItem('video'));
   }

   const toggleMic = async () => {
      aud = !aud;
      window.localStorage.setItem('audio', aud);
      setMicr(!micr);
      console.log("Audio "+window.localStorage.getItem('audio'));
   }

   const hangUpRe = () => {
      navigate('/');
   }


   if (props.user === undefined) {
      return (
         <Unauthorized />
      )
   }
   else {
   
      props.user._id = username;
      return (
         <>
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
                  <div className="col-md-12 col-sm-12 video" id="video_space">
                     <div className="video">
                        <div>
                           <span id="currentRoom"></span>
                        </div>
                        <div id="videos">
                           <video id="remote_Video" autoPlay playsInline ></video>
                           <video id="local_Video" muted autoPlay playsInline></video>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12 d-none" id="chat_space" >
                     <div className="container-fluid" id='chattt' style={{ 'height': '100vh' }} >
                        <embed src={`https://chat-with-space.herokuapp.com/?username=${username}&room=${roomid}`} id="chat_s" style={{ 'height': '99vh', 'width': '96vw' }} />
                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12  d-none" id="board_space">
                     <div className="container-fluid">

                     </div>
                  </div>
                  <div className="col-md-12 col-sm-12  d-none" id="code_space">
                     <div className="container-fluid">
                        <Ide user={props.user} />
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

            <div className="footer row " id="setting_space">
               <div className="col-md-4 my-auto">
                  <button id="toggleCamera" onClick={toggleCamera}>
                     <i id="toggleCameraIcon" className={camr ? "fa fa-video" : "fa fa-video-slash"} aria-hidden="true"></i>
                  </button>
               </div>
               <div className="col-md-4 my-auto">
                  <button id="toggleMic" onClick={toggleMic}>
                     <i id="toggleMicIcon" className={micr ? "fa fa-microphone" : "fa fa-microphone-slash"} aria-hidden="true"></i>
                  </button>
               </div>
               <div className="col-md-4 my-auto">
                  <button id="hangupBtn" onClick={hangUpRe}>
                     <i className="fa fa-phone" aria-hidden="true"></i>
                  </button>
               </div>
            </div>

            <Modal isOpen={modal} toggle={toggle} className="modals" >
               <ModalHeader
                  toggle={toggle} className="modal-cen" >Important Instructions</ModalHeader>
               <ModalBody className='modal-col'>
                  <p> You would be entering the full screen mode for this meeting.</p>
                  <p className="text-warning"><small>If you don't agree to go full screen, you can't continue using the meeting features.</small></p>
                  <p className="text-info"><small><strong>Note:</strong> Whenever you try exiting the fullscreen mode in-between the meeting, the interviewer would be notified. You will only be exiting the full screen mode after your interview is finished.</small></p>
               </ModalBody>
               <ModalFooter className="modal-cen">
                  <div style={{ "margin": "auto" }}>
                     <Button color="dark" onClick={() => { toggle(); fullScreen(); }}>Open Full Screen</Button>
                  </div>
               </ModalFooter>
            </Modal>

            <Modal isOpen={modalw} toggle={togglew} className="modalw" >
               <ModalHeader
                  toggle={togglew} className="modal-cen" >Warning</ModalHeader>
               <ModalBody className='modal-col'>
                  <p> You have exited the full screen mode.</p>
                  <p className="text-warning"><small><strong>Note:</strong> Whenever you try exiting the fullscreen mode in-between the meeting, the interviewer would be notified</small></p>
               </ModalBody>
               <ModalFooter className="modal-cen">
                  <div style={{ "margin": "auto" }}>
                     <Button color="dark" onClick={() => { togglew(); fullScreen(); }}>Open Full Screen</Button>
                  </div>
               </ModalFooter>
            </Modal>
         </>
      )
   }
}

export default Room

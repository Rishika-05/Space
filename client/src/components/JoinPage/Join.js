import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Join.css'
import db from '../Firebase/firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let audio = true;
let video = true;


const Join = () => {

   const navigate = useNavigate();
   let localStream;

   const [name, setName] = useState('');
   const [roomID, setRoomID] = useState('');
   const [mic, setMic] = useState(true);
   const [cam, setCam] = useState(true);

   useEffect(() => {
      getStream();
   })

   const getStream = async () => {
      if(video || audio)
      localStream = await navigator.mediaDevices.getUserMedia({ video:video, audio:audio });
      document.querySelector('#localVideo').srcObject = localStream;
      document.querySelector('#localVideo').play();
      console.log(localStream);
      console.log('Stream:', document.getElementById('localVideo').srcObject);
      document.getElementById('toggleCamera').disabled = false;
      document.getElementById('toggleMic').disabled = false;
      window.localStorage.setItem('video', video);
      window.localStorage.setItem('audio', audio);
   }

   const toggleCamera = async () => {
      if (video)
         localStream.getVideoTracks()[0].enabled = !(localStream.getVideoTracks()[0].enabled);
      video = !video;
      setCam(!cam);
      window.localStorage.setItem('video', video);
      console.log(window.localStorage.getItem('video'));
   }

   const toggleMic = async () => {
      if(audio)
         localStream.getAudioTracks()[0].enabled = !(localStream.getAudioTracks()[0].enabled);
      audio = !audio;
      setMic(!mic);
      window.localStorage.setItem('audio', audio);
      console.log(window.localStorage.getItem('audio'));
   }

   const validateUser = () => {
      console.log('validate');
      window.localStorage.setItem('Name', name);
      if (roomID.endsWith('R')) {
         window.localStorage.setItem('Type', 'IR');
      } else {
         window.localStorage.setItem('Type', 'IE');
      }
      console.log(window.localStorage.getItem('Type'));
      const ID = roomID.slice(0, 10);
      console.log(ID);
      document.getElementById("form").reset();

      const findKey = (data) => {
         console.log('inside data');
         data = data.val();
         console.log(data);
         let keys = Object.keys(data);
         var flag = keys.includes(ID);
         console.log(flag);
         if (flag) {
            const url = `/room/${ID}`;
            navigate(url);
         } else {
            toast('Stay calm and enter correct ID!', {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         }
      }

      db.on("value", findKey);

   }

   return (
      <div className="join">
         <div className="row d-flex">
            <div className="col-sm-8 mx-auto">
               <div className="video-mask">
                  <video id="localVideo" muted autoplay playsinline ></video>
                  <div className="buttons">
                     <button className="button" id="toggleCamera" onClick={toggleCamera}>
                        <i className={cam ?"fa fa-video":"fa fa-video-slash"} aria-hidden="true"></i>
                     </button>
                     <button className="button" id="toggleMic" onClick={toggleMic}>
                        <i className={mic ? "fa fa-microphone" :"fa fa-microphone-slash"} aria-hidden="true"></i>
                     </button>
                  </div>
               </div>
            </div>
            <div className="col-sm-4 mx-auto mt-4">
               <div className="boxmeet mt-5">
                  <h2 className="mb-5" >Join Meeting</h2>
                  <form id="form" className="valid">
                     <div className="inputBox">
                        <input type="text" onChange={(e) => setName(e.target.value)} id="room_name" placeholder="Name" name="room_name" />
                        <label className="mb-2" style={{"fontSize":"15px"}} ></label>
                     </div>
                     <div className="inputBox">
                        <input type="text" onChange={(e) => setRoomID(e.target.value)} id="room_id" placeholder="Room ID" name="room_id" />
                        <label className="mb-2" style={{ "fontSize": "15px" }} ></label>
                     </div>
                     <button type="button" onClick={validateUser} name="sign-in" style={{ "fontSize": "18px" }} className="btn btn-dark my-4 submit-btn">Join Room</button>
                  </form>
               </div>
            </div>
         </div>
         <ToastContainer />
      </div>
   )
}

export default Join

// iNui4tRrLH
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Join.css'
import db from '../Firebase/firebase'


const Join = () => {

   const navigate = useNavigate();

   const [name, setName] = useState('');
   const [roomID, setRoomID] = useState('');

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
            alert("Stay calm & enter correct ID!");
         }
      }

      db.on("value", findKey);

   }

   return (
      <>
         <div className="row d-flex">
            <div className="col-sm-8 mx-auto">
               <div className="video-mask">
                  <video id="localVideo" muted autoplay playsinline allowfullscreen=""></video>
                  <div className="buttons">
                     <button className="button" id="toggleCamera">
                        <i className="fa fa-video" aria-hidden="true"></i>
                     </button>
                     <button className="button" id="toggleMic">
                        <i className="fa fa-microphone" aria-hidden="true"></i>
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
      </>
   )
}

export default Join

// iNui4tRrLH
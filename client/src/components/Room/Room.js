import React from 'react'
import './Room.css'
import Unauthorized from '../unauthorized/Unauthorized';
const Room = (props) => {

   const { setInterview } = props;
   setInterview(false);

   if (props.user === undefined) {
      return (
         <Unauthorized />
      )
   }
   else {
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
                  <i className="far fa-file-code fa-2x"></i></button>
               <button href="#" onClick="show_git()" data-toggle="tooltip" data-placement="right" title="GitHub">
                  <i className="fab fa-github fa-2x"></i></button >
               <button href="#" onClick="show_cf()" data-toggle="tooltip" data-placement="right" title="Codeforces">
                  <i className="fas fa-code fa-2x"></i></button>
            </div>

         </>
      )
   }
}

export default Room

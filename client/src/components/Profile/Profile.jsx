import React from 'react'
import {useLayoutEffect,useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Calender from '../Calender/Calender'
import Particles from 'react-particles-js'
import patriclesConfig from './config/particle-config'
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
  } from "reactstrap"
import './profile.css'

export default function Profile(props) {
    const [userProfile, setuserProfile] = useState();
    const [avatar,setAvatar] = useState();
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const navigate = useNavigate();
    const toggle = () => {
        setModal(!modal);
    }
    const toggle1 = () => {
        setModal1(!modal1);
    }
    useLayoutEffect(() =>{
        getUserProfile();
    },[])
    const {id} = useParams();
    const getUserProfile = async ()=>{
        let res = await fetch(`http://localhost:9002/profile/${id}`,{method:"GET",headers: {
            'Content-Type': 'application/json'
        },});
        
        let userData = await res.json();
        setuserProfile(userData.user);
        const fullName = userData.user.name.split(' ');
        const nameString = fullName[0] +'+'+fullName[fullName.length-1]
        let av = await fetch(`https://ui-avatars.com/api/?name=${nameString}&background=171C3D&color=FFFFFF`)
        setAvatar(av);
    }
    const handleSubmit = (event)=>{
        
        event.preventDefault()
        let data = {name:event.target.name.value,email:event.target.email.value,country:event.target.country.value}
        
        let res = fetch(`http://localhost:9002/update/summary/${id}`,{method:"POST",body: JSON.stringify(data),headers: {
            'Content-Type': 'application/json'
        },});
        getUserProfile();
        
    }
    const handleSubmit1 = (event)=>{
        
        event.preventDefault()
        
        let data = {about:event.target.about.value,institute:event.target.institute.value,graduation:event.target.graduation.value,degree:event.target.degree.value}
        
        let res = fetch(`http://localhost:9002/update/about/${id}`,{method:"POST",body: JSON.stringify(data),headers: {
            'Content-Type': 'application/json'
        },});
        getUserProfile();
        
    }
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(7), (val, index) => index + year);
    
    
    if(userProfile){
        return (
            <>
                <div id = "outer-div">
                <Particles style = {{"zIndex":"-1"}}
                            params={patriclesConfig} />
                    <div id = "left-profile-data">
                        <div className = "left-card">
                            <div id = "profile-summary-card">
                                <span id = "initials-avatar" className = "d-flex justify-content-between"><img src={(avatar)?avatar.url:""} alt="Avatar" /><button onClick = {toggle}type = "button" className = "summary-edit-button"><i class="fas fa-edit"></i></button></span>
                                <h1 id = "profile-heading">{userProfile.name}</h1>
                                <p id = "profile-user-name">{userProfile.email}</p>
                            </div>
                            <p id= "profile-user-name">{(userProfile.country)?userProfile.country:"-"}</p>

                        </div>
                        <hr></hr>
                        <div className = "left-card">
                            <h4 className = "d-flex justify-content-between">About<button onClick = {toggle1}type = "button" className = "summary-edit-button"><i class="fas fa-edit"></i></button></h4>
                            <div className = "info-container">
                                <p className = "profile-about">Institute</p>
                                <strong>{userProfile.institute}</strong>
                            </div>
                            <div className = "info-container">
                                <p className = "profile-about">Expected year of graduation</p>
                                <strong>{userProfile.graduation}</strong>
                            </div>
                            <div className = "info-container">
                                <p className = "profile-about">Program/Degree</p>
                                <strong>{userProfile.degree}</strong>
                            </div>
                            <div className = "info-container">
                            <p className = "profile-about">More about me</p>
                            <strong>{userProfile.about}</strong>
                            </div>
                        </div>
                    </div>
                    <div id = "right-profile-data">
                        <div className="right-card">
                            <Calender calender = {userProfile.calender}></Calender>
                        </div>
                    </div>
                </div>
                {/* modal for profile summary */}
                <Modal isOpen={modal} toggle={toggle} className="modal-40w" centered >
                <ModalHeader
                toggle={toggle} className="modal-cen" centered >Edit Intro</ModalHeader>
                <ModalBody className='modal-col d-flex justify-content-center' centered>
                <form id="schedule-form" onSubmit={handleSubmit}>
                    <div className="modal-body">
                    <div className="row">
                        <fieldset className="col-xs-12 col-sm-6 col-md-6">
                        
                        <div className="input-area my-4" style={{ "textAlign": "center" }}>
                            <input className='modal-in' type="text" autoComplete="off" placeholder="Name" name="name"   required />
                            <label className="label-name"></label>
                        </div>
                        <div className="input-area my-4" style={{ "textAlign": "center" }}>
                            <input className='modal-in' type="email" autoComplete="off" placeholder="Email" name="email"  required />
                            <label className="label-name"></label>
                        </div>
                        <div className="input-area my-4" style={{ "textAlign": "center" }}>
                            <input className='modal-in' type="country" autoComplete="off" placeholder="Country" name="country"  required />
                            <label className="label-name"></label>
                        </div>
                        </fieldset>
                        
                    </div>
                    
                    </div>
                    <div style={{"margin": "auto" }}>
                        <Button type = "submit" color="dark" onClick={toggle} id="schedule-submit-btn" >Submit</Button>
                    </div>
                </form>
                </ModalBody>
                </Modal>
                {/* Modal for about panel................................................... */}
                <Modal isOpen={modal1} toggle={toggle1} className="modal-40w" centered >
                <ModalHeader
                toggle={toggle1} className="modal-cen" centered >Edit About</ModalHeader>
                <ModalBody className='modal-col d-flex justify-content-center' centered>
                <form id="schedule-form1" onSubmit={handleSubmit1}>
                    <div className="modal-body">
                    <div className="row">
                        <fieldset className="col-xs-12 col-sm-6 col-md-6">
                            <div className="input-area my-4" style={{ "textAlign": "center" }}>
                                <input className='modal-in form-control form-control-lg mb-1 about-class' type="text" autoComplete="off" placeholder="About yourself......" name="about"/>
                                <label className="label-name"></label>
                            </div>
                            <div className="input-area my-4" style={{ "textAlign": "center" }}>
                                <input className='modal-in form-control form-control-lg mb-1' type="text" autoComplete="off" placeholder="Institute" name="institute"   />
                                <label className="label-name"></label>
                            </div>
                            <div className="input-area my-4" style={{ "textAlign": "center" }}>
                            <input list="year" className = "modal-in form-control form-control-lg mb-1" name = "graduation" placeholder="Select year of graduation" />
                                <datalist id="year">
                                    {
                                        years.map((year, index) => {
                                            return <option key={`year${index}`} value={year}>{year}</option>
                                          }) 
                                    }
                                    <option value = "Still in high school"></option>
                                </datalist>
                            </div>
                            <div className="input-area my-4" style={{ "textAlign": "center" }}>
                                <input className='modal-in form-control form-control-lg mb-1' type="text" autoComplete="off" placeholder="Program/Degree" name="degree"  required />
                                <label className="label-name"></label>
                            </div>
                        </fieldset>
                        
                    </div>
                    
                    </div>
                    <div style={{"margin": "auto" }}>
                        <Button type = "submit" color="dark" onClick={toggle1} id="schedule-submit-btn" >Submit</Button>
                    </div>
                </form>
                </ModalBody>
                </Modal>
            <style jsx global>{`
            .modal-40w {
                width: 40vw;
                max-width: none !important;
            }
            `}
            </style>
                    </>
        )
    }else{
        return(
        <>
        </>
        )
    }
}

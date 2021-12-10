import React from 'react'
import {useLayoutEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css'

export default function Profile(props) {
    const [userProfile, setuserProfile] = useState();
    const [avatar,setAvatar] = useState();
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
    
    
    if(userProfile){
        return (
            <>
                <div id = "outer-div">
                    <div id = "left-profile-data">
                        <div className = "left-card">
                            <div id = "profile-summary-card">
                                <span id = "initials-avatar" className = "d-flex justify-content-between"><img src={(avatar)?avatar.url:""} alt="Avatar" /><button type = "button" className = "summary-edit-button"><i class="fas fa-edit"></i></button></span>
                                <h1 id = "profile-heading">{userProfile.name}</h1>
                                <p id = "profile-user-name">{userProfile.email}</p>
                            </div>
                            <p id= "profile-user-name">India</p>

                        </div>
                        <hr></hr>
                        <div className = "left-card">

                        </div>
                    </div>
                    <div id = "right-profile-data">

                    </div>
                </div>
            </>
        )
    }else{
        return(
        <>
        </>
        )
    }
}

import React from 'react'
import {useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css'

export default function Profile(props) {
    const [userProfile, setUserProfile] = useState(undefined);
    useEffect(() =>{
        getUserProfile();
        getAvatar();
        
    },[])
    const {id} = useParams();
    
    const getUserProfile = async ()=>{
        let res = await fetch(`http://localhost:9002/profile/${id}`,{method:"GET",headers: {
            'Content-Type': 'application/json'
        },});
        
        let userData = await res.json();
        
        setUserProfile(userData.user);
        
    }
    const getAvatar = ()=>{
        const fullName = userProfile.name.split(' ');
        const nameString = fullName[0] +'+'+fullName[fullName.length-1]
        // let avatar = await fetch(`https://ui-avatars.com/api/?${nameString}&background=random`)
    }
    
    if(userProfile){
        return (
            <>
                <div id = "outer-div">
                    <div id = "left-profile-data">
                        <div className = "left-card">
                            
                        </div>
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

import React from 'react'
import {useEffect,useState} from 'react'
import './Github.css'
const Github = () => {  
   const [gitProfile,setGitProfile] = useState({});
   const getProfileData = async () =>{
      let res = await fetch(`https://api.github.com/users/RatulDawar`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        let data = await res.json();
        setGitProfile(data);
   }
   const getRepos = async()=>{
      let res = await fetch(`https://api.github.com/users/RatulDawar/repos`, {
            method: "GET", headers: {
                'Content-Type': 'application/json'
            },
        });
        let data = await res.json();
        console.log(data);
   }
   useEffect(()=>{
      getProfileData();
      //getRepos();
   })
   return (
      <>
         <div class="cardN">
         <img src={gitProfile.avatar_url} alt="name" style={{"width":"100%"}}/>
         <h1>{gitProfile.name}</h1>
         <p class="title">{gitProfile.bio}</p>
         <span className = "git-brief btn btn-dark">Public Repos:{gitProfile.public_repos}</span>
         <span className = "git-brief btn btn-info">Public Gists:{gitProfile.public_gists}</span>
         <span className = "git-brief btn btn-success">Followers :{gitProfile.followers}</span>
         <span className = "git-brief btn btn-danger">Following :{gitProfile.following}</span>
         
         </div>
      </>
   )
}

export default Github

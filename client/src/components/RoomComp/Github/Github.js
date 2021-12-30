import React from 'react'
import {useEffect,useState} from 'react'
import './Github.css'
import Loading from '../../Loading/Loading.jsx'
import Tabs from './Tabs/Tabs.js'
import Repositories from './Repositories/Repositories.js'
const Github = () => {  
   const [gitProfile,setGitProfile] = useState();
   const [repositories,setRepo] = useState();
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
        setRepo(data);
   }
   useEffect(()=>{
      getProfileData();
      getRepos();
   },[true])
   if(gitProfile && repositories){
   return (
      <>
         <div className="p-4 search-div">
            <div class="input-group d-flex justify-content-center">
               <div class="form-outline">
                  <input id="search-input" type="search" id="form1" placeholder="Search" style = {{width:"25vw"}}class="form-control" />

               </div>
               <button id="search-button" type="button" class="btn btn-dark">
                  <i class="fas fa-search"></i>
               </button>
            </div>
         </div>
         <div className = "row">
         <div className="cardN p-2 col-sm-4 col-md-4">
            <img src={gitProfile.avatar_url} alt="name" style={{"width":"50%"}}/>
            <h1>{gitProfile.name}</h1>
            <p class="title">{gitProfile.bio}</p>
            <span className = "git-brief btn-sm btn-dark">Public Repos: {gitProfile.public_repos}</span>
            <span className = "git-brief btn-sm btn-info">Public Gists: {gitProfile.public_gists}</span>
            <span className = "git-brief btn-sm btn-success">Followers : {gitProfile.followers}</span>
            <span className = "git-brief btn-sm btn-danger">Following : {gitProfile.following}</span>
            <div className = "d-flex flex-column git-info-box my-3">
               <div className = "pt-2"><strong>Company</strong> : {gitProfile.company?gitProfile.company:"N/A"}</div>
               <hr></hr>
               <div><strong>Website/blog</strong> : {gitProfile.blog?gitProfile.blog:"N/A"}</div>
               <hr></hr>
               <div><strong>Location</strong> : {gitProfile.location?gitProfile.location:"N/A"}</div>
               <hr></hr>
               <div className = "pb-3"><strong>Member</strong> Since : {gitProfile.created_at.slice(0,10)}</div>
            </div>
         </div>
         <div className = "col-md-8 col-sm-8 ms-4">
            <Tabs repos={repositories} user={gitProfile} />
            <Repositories repos={repositories} user={gitProfile} />
         </div>
         </div>
      </>
   )
   }else{
      return <Loading />
   }
}


export default Github

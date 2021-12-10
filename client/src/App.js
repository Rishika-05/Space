import React, { useState } from 'react'
import './components/login.css'
import SignIn from './components/SignIn/SignIn.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import Home from './components/Home/Home.js'
import Interview from './components/Interview/Interview'
import Navbar from './components/Navbar/Navbar.js'
import Profile from './components/Profile/Profile.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';


function App() {
  const [user, setLoginUser] = useState({})
  
  return (
    <>
      <Router>
        {
          user && user._id ? <Navbar /> : <></>
        }
        <Routes>
          <Route exact path="/login" element={<SignIn setLoginUser={setLoginUser} />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/" element={
            user && user._id ? <Home user={user} /> : <SignIn setLoginUser={setLoginUser} />
          } />
          <Route exact path="/interview" element={<Interview />} />
          <Route path="/profile/:id"  element={<Profile/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
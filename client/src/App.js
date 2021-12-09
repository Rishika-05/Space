import React, { useState } from 'react'
import './components/login.css'
import SignIn from './components/SignIn/SignIn.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import Home from './components/Home/Home.jsx'
import Interview from './components/Interview/Interview'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar'

function App() {
  const [user, setLoginUser] = useState({})
  return (
    <>
      <Router>
        {
          user && user._id ? <Navbar /> : <></>
        }
        <Routes>
          <Route exact path="/user/login" element={<SignIn setLoginUser={setLoginUser} />} />
          <Route exact path="/user/SignUp" element={<SignUp />} />
          <Route exact path="/user/home" element={
            user && user._id ? <Home user={user} /> : <SignIn setLoginUser={setLoginUser} />
          } />
          <Route exact path="/interview" element={<Interview />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
import React, { useState } from 'react'
import './components/login.css'
import SignIn from './components/SignIn/SignIn.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import Home from './components/Home/Home.js'
import Interview from './components/Interview/Interview'
import Navbar from './components/Navbar/Navbar.js'
import Profile from './components/Profile/Profile.jsx'
import QuestionForm from './components/QuestionForm/QuestionForm.jsx'
import Problemset from './components/Problemset/Problemset'
import ProblemPage from './components/ProblemPage/ProblemPage'
import Ide from './components/ide/Ide'
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
          user && user._id ? <Navbar user={user} setLoginUser={setLoginUser} /> : <></>
        }
        <Routes>
          <Route exact path="/login" element={<SignIn setLoginUser={setLoginUser} />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/" element={
            user && user._id ? <Home user={user} setLoginUser={setLoginUser} /> : <SignIn setLoginUser={setLoginUser} />
          } />
          <Route exact path="/interview" element={
            user && user._id ? <Interview /> : <SignIn setLoginUser={setLoginUser} />
          } />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/questionUpload" element={<QuestionForm />} />
          <Route exact path="/problemset" element={<Problemset />} />
          <Route exact path="/problemPage/:id" element={<ProblemPage user={user} />} />
          <Route exact path="/ide" element={<Ide />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
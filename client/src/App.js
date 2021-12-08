import React, { useState } from 'react'
import './components/login.css'
import SignIn from './components/SignIn/SignIn.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import Home from './components/Home/home.jsx'
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
        <Routes>
          <Route exact path="/user/login" element={<SignIn setLoginUser={setLoginUser} />} />
          <Route exact path="/user/SignUp" element={<SignUp />} />
          <Route exact path="/user/home" element={
            user && user._id ? <Home user={user} /> : <SignIn setLoginUser={setLoginUser} />
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
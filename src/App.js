import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./Pages/LoginForm"
import LoginForm from './Pages/LoginForm';
import ForgotPass from "./Pages/ForgotPass";
import Homepage from './Pages/homepage';
import Profile from "./Pages/Profile";

function App() {

 

  //UserLogin
  const loggedIn = window.localStorage.getItem("isLoggedIn")
  const [ user, setLoginUser] = useState({
      rNum:"",
      dob:"",
      pass:""
  })
  console.log(user._id)
  

  return (
    
    <div className="App"  sx={{margin:0}}>
      
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={((user && user._id) || loggedIn) ? <Homepage setLoginUser={setLoginUser}/> : <LoginForm setLoginUser={setLoginUser}/>}/> 
          <Route path="/LoginForm" element={<LoginForm setLoginUser={setLoginUser}/>}/>
          <Route path="/Forgotpassword" element={<ForgotPass/>} />
          <Route path="/Profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;

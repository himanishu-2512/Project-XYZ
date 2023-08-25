import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./Global.css";
import "./Pages/LoginForm";
import LoginForm from "./Pages/LoginForm";
import ForgotPass from "./Pages/ForgotPass";
import Homepage from "./Pages/homepage";
import Profile from "./Pages/Profile";
import ChangePass from "./Pages/ChangePass";

function App() {
  //UserLogin
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const [user, setLoginUser] = useState({
    rNum: "",
    dob: "",
    pass: "",
  });
  console.log(user._id);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              (user && user._id) || loggedIn ? (
                <Homepage setLoginUser={setLoginUser} />
              ) : (
                <LoginForm setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            path="/LoginForm"
            element={<LoginForm setLoginUser={setLoginUser} />}
          />
          <Route path="/Forgotpassword" element={<ForgotPass />} />
          <Route path="/Changepassword" element={<ChangePass />} />

          <Route
            path="/Profile/:username"
            element={
              (user && user._id) || loggedIn ? (
                <Profile setLoginUser={setLoginUser} />
              ) : (
                <LoginForm setLoginUser={setLoginUser} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

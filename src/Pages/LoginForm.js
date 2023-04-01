import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import  { Container } from '@mui/material';
// import './style.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'


const LoginForm = ({setLoginUser}) => {

	//Forgot Password
	const Navigate = useNavigate();

	//Sliding window
	const [active,setActive]=useState(false)	
    
    const Change=(e)=>{
		e.preventDefault()
        setActive(!active)
    }

	// registration
	const [ newuser, setNewUser] = useState({
        rNum:"",
        dob:"",
        pass:""
    })
	//console.log(newuser);

	const val = (e) => {
		e.preventDefault()
		const {value, name} = e.target;
		//console.log(value,name);
		setNewUser (()=>{
			return{
				...newuser,
				[name]:value
			}
		})
	}

	//SignUp button
	const handlChange = (e) => {
        e.preventDefault()
		const {rNum, dob, pass} = newuser
		if(rNum && dob && pass){
			axios.post("http://localhost:9002/register", newuser)
			.then( res => {
                alert(res.data.message)
				window.location.reload();
            })
		} else {
			alert("Invalid Input")
		}
		
    }

	//SignIn
	const [ user, setUser] = useState ({
        rNum:"",
        pass:""
    })
	//console.log(user);

	const vale = (e) => {
		e.preventDefault()
		const {value, name} = e.target;
		//console.log(value,name);
		setUser (()=>{
			return{
				...user,
				[name]:value
			}
		})
	}

	
	//SignIn button
	const handleChange = (e) => {
		e.preventDefault()
        const {rNum, pass} = user
		if(rNum && pass){
			axios.post("http://localhost:9002/login", user)
			.then(res => {
				alert(res.data.message)
				if(res.data.user)
				{
					setLoginUser(res.data.user)
					window.localStorage.setItem("isLoggedIn", true);
				}
				Navigate('/')
			})
		} else {
			alert("Invalid Input")
		}
    }

  return (
    
    <>
    
    <Containers >
    <meta name="viewport" content ="width=device-width,initial-scale=1.0"/>
        <div class={`container ${active ? "right-panel-active" : ""}`} id="container">
          <div class={`form-container sign-up-container ${active ? "right-panel-active" : ""}`}>
              <form action="#">
                  <h1>Create Account</h1>
                  
                  <input type="text" name ="rNum" onChange={val} placeholder="Registration Number" />
                  <input type="text" name="dob" onChange={val} placeholder="Date Of Birth (DDMMYYYY)" />
                  <input type="password" name="pass" onChange={val} placeholder="Create Your Password" />
                  <button onClick = { handlChange } >Sign Up</button>
                  <button id="sign" onClick ={ Change } >Sign In</button>
              </form>
          </div>
          <div class="form-container sign-in-container">
              <form action="#">
                  <h1>Sign In</h1>
                  
                  <input type="text" name ="rNum" onChange={vale} placeholder="Registration Number" />
                  <input type="password" name ="pass" onChange={vale} placeholder="Password" />
                  <Link  to='Forgotpassword' href="#" >Forgot your password?</Link>
                  <button onClick = { handleChange } >Sign In</button>
                  <button id="sign" onClick ={ Change } >Sign Up</button>
              </form>
          </div>
          <div class="overlay-container">
              <div class="overlay">
                  <div class="overlay-panel overlay-left">
                      <h1>Welcome Back!</h1>
                      <p>To keep connected with us please login with your personal info</p>
                      <button class="ghost" id="signIn" onClick= { Change } >Sign In</button>
                  </div>
                  <div class="overlay-panel overlay-right">
                      <h1>Hello, Friend!</h1>
                      <p>Enter your personal details and start journey with us</p>
                      <button class="ghost" id="signUp" onClick= { Change } >Sign Up</button>
                  </div>
              </div>
          </div>
      </div>
      
      </Containers>
      </>
  )
}

const Containers=styled.div`




	background: #232323;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction:column;
	font-family: 'Montserrat', sans-serif;
	height: 100vh;
	margin: 0;
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

    * {
        box-sizing: border-box;
    }

h1 {
	font-weight: bold;
	margin: 0;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
    margin:5px;
	border-radius: 20px;
	border: 1px solid #020202;
	background-color: #000000;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
	background-color: #fff;
	border-radius: 10px;
  	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #ffffff;
	background: -webkit-linear-gradient(to right, #929292, #000000);
	background: linear-gradient(to right, #000, #919191, #000);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

#sign{
	display:none;
}

@media (max-width: 554px){
    .sign-in-container {
	    width: 100%;
    }
    .container.right-panel-active{
        position:relative;
        display:flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    #sign{
	    display:flex;
    }
    .sign-up-container{
        width:100%;
    }
    .sign-up-container form{
        position:absolute;
        left:0;
    transform:translateX(-100%);
	    width: 100%;
	    z-index: 0;
    }
    .overlay-container {
	    display :none;
    }
}

`

export default LoginForm
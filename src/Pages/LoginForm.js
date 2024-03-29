import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '@mui/lab/LoadingButton';

const LoginForm = ({ setLoginUser }) => {
	const [loading1, setLoading1] = useState(false);
	const [loading2, setLoading2] = useState(false);
	const BASE_URL = process.env.REACT_APP_BASE_URL
	useEffect(() => {
		const loader = document.getElementById("preloader");
		const onPageLoad = () => {
			loader.style.display = "none";
		};

		// Check if the page has already loaded
		if (document.readyState === 'complete') {
			onPageLoad();
		} else {
			window.addEventListener('load', onPageLoad);
			// Remove the event listener when component unmounts
			return () => window.removeEventListener('load', onPageLoad);
		}
	}, []);



	//Forgot Password
	const Navigate = useNavigate();

	//Sliding window
	const [active, setActive] = useState(false);

	const Change = (e) => {
		e.preventDefault();
		setActive(!active);
	};

	// registration
	const [newuser, setNewUser] = useState({
		rNum: "",
		dob: "",
		pass: "",
	});

	const val = (e) => {
		e.preventDefault();
		const { value, name } = e.target;
		setNewUser(() => {
			return {
				...newuser,
				[name]: value,
			};
		});
	};

	//SignUp button
	const handlChange = async (e) => {

		e.preventDefault();
		const { username, email, password, name } = newuser;
		if (username && email && password && name) {
			setLoading1(true)
			await axios.post(`${BASE_URL}/auth/register`, newuser).then((res) => {
				if (res.data.status) {
					toast.success(res.data.message, {
						position: "top-center"
					})
				}
				else {
					toast.error(res.data.message, {
						position: "top-center"
					})
				}
				console.log(res.data.user)

			}).catch(error => {
				toast.error(error.message);
			});
		} else {
			toast.error("Invalid data", {
				position: "top-center"
			})
		}
		setLoading1(false)
	};

	//SignIn
	const [user, setUser] = useState({
		rNum: "",
		pass: "",
	});

	const vale = (e) => {
		e.preventDefault();
		const { value, name } = e.target;
		setUser(() => {
			return {
				...user,
				[name]: value,
			};
		});
	};

	//SignIn button
	const handleChange = async (e) => {
		setLoading2(true)
		e.preventDefault();
		const { username, password } = user;
		if (username && password) {
			await axios.post(`${BASE_URL}/auth/login`, user).then((res) => {
				if (res.data.user) {
					toast.success(res.data.message, {
						position: "top-center"
					})
					setLoginUser(res.data.user);
					window.localStorage.setItem("isLoggedIn", true);
					window.localStorage.setItem("userId", res.data.user._id);
					window.localStorage.setItem("username", res.data.user.username);
					Navigate("/");
				}
				else {
					toast.error(res.data.message, {
						position: "top-center"
					})
				}

			})
				.catch(error => {
					toast.error(error.message);
				});
		} else {
			toast.error("Invalid data", {
				position: "top-center"
			})
		}
		setLoading2(false)
	};

	return (
		<>
			<Containers>
				<ToastContainer autoClose={5000} position="top-center" closeOnClick pauseOnHover draggable />
				<div id="preloader"></div>
				<div className={`container ${active ? "right-panel-active" : ""}`} id="container">
					<div className={`form-container sign-up-container ${active ? "right-panel-active" : ""}`}>
						<form action="#" className="sign-up-form">
							<div className="sign-up-background">
								<h1>Create Account</h1>
								<input type="text" name="name" onChange={val} placeholder="Name" />
								<input type="text" name="username" onChange={val} placeholder="Username" />
								<input type="email" name="email" onChange={val} placeholder="Email" />
								<input
									type="password"
									name="password"
									onChange={val}
									placeholder="Create Your Password"
								/>
								<LoadingButton loading={loading1} variant="contained" onClick={handlChange} loadingPosition="end">
									<span>Sign Up</span>
								</LoadingButton>
								<button id="sign" onClick={Change}>
									Sign In
								</button>
							</div>
						</form>
					</div>
					<div className="form-container sign-in-container">
						<form action="#" className="sign-in-form">
							<div className="sign-in-background">
								<h1>Sign In</h1>

								<input type="text" name="username" onChange={vale} placeholder="Username or Email" />
								<input type="password" name="password" onChange={vale} placeholder="Password" />
								<Link to="Forgotpassword">
									Forgot your password?
								</Link>
								<LoadingButton loading={loading2} variant="contained" onClick={handleChange} loadingPosition="end">
									<span>Sign In</span>
								</LoadingButton>
								<button id="sign" onClick={Change}>
									Sign Up
								</button>
							</div>
						</form>
					</div>
					<div className="overlay-container">
						<div className="overlay">
							<div className="overlay-subcontainer">
								<div className="overlay-panel overlay-left">
									<h1>Welcome Back!</h1>
									<p>To keep connected with us please login with your personal info</p>
									<button className="ghost" id="signIn" onClick={Change}>
										Sign In
									</button>
								</div>
								<div className="overlay-panel overlay-right">
									<h1>Hello, Friend!</h1>
									<p>Enter your personal details and start journey with us</p>
									<button className="ghost" id="signUp" onClick={Change}>
										Sign Up
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Containers>
		</>
	);
};



const Containers = styled.div`
	background: #232323;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: "Montserrat", sans-serif;
	height: 100vh;
	margin: 0;
	@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;600&display=swap");

	* {
		box-sizing: border-box;
	}

	h1 {
		font-weight: bold;
		margin: 0 0 5px 0;
	}

	h2 {
		text-align: center;
	}

	p {
		font-size: 14px;
		font-weight: 300;
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
		margin: 5px;
		border-radius: 20px;
		border: 1px solid #020202;
		background-color: #000000;
		color: #ffffff;
		font-size: 12px;
		font-weight: bold;
		padding: 12px 45px;
		letter-spacing: 1px;
		text-transform: uppercase;
		transition: transform 80ms ease-in;
	}
	button:hover{
		background-color: #000000;
	}

	button:active {
		transform: scale(0.95);
	}

	button:focus {
		outline: none;
	}

	button.ghost {
		background-color: transparent;
		border-color: #ffffff;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		text-align: center;
	}

	input {
		background-color: #e8e8e8;
		border-radius: 8px;
		border: none;
		padding: 12px 15px;
		margin: 10px 0;
		width: 100%;
	}

	.container {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
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

	.sign-in-form {
		background-image: url("images/doodle2_left.jpg");
		background-size: cover;
	}

	.sign-up-form {
		background-image: url("images/doodle2_right.jpg");
		background-size: cover;
		background-position: right;
	}

	.sign-in-background,
	.sign-up-background {
		width: 100%;
		padding: 12%;
		height: 100%;
		font-weight: 300;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background: rgba(255, 255, 255, 0.9);
	}

	@keyframes show {
		0%,
		49.99% {
			opacity: 0;
			z-index: 1;
		}

		50%,
		100% {
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

	.container.right-panel-active .overlay-container {
		transform: translateX(-100%);
	}

	.overlay {
		background-image: url("images/doodle1.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0 0;
		color: #ffffff;
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

	.overlay-subcontainer {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.45);
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

	#sign {
		display: none;
	}

	#preloader{
		background: #000 url(images/pre2.gif) no-repeat center center;
		background-size: 10%;
		height: 100vh;
		width: 100%;
		position: fixed;
		z-index:110;
	}

	@media (max-width: 554px) {
		.sign-in-container {
			width: 100%;
		}
		.container.right-panel-active {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
		}
		#sign {
			display: flex;
		}
		.sign-up-container {
			width: 100%;
		}
		.sign-up-container form {
			position: absolute;
			left: 0;
			transform: translateX(-100%);
			width: 100%;
			z-index: 0;
		}
		.overlay-container {
			display: none;
		}
	}
`;

export default LoginForm;

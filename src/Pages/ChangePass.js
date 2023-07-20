import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '@mui/lab/LoadingButton';

function ChangePass() {
	const Navigate = useNavigate();
	const BASE_URL = process.env.REACT_APP_BASE_URL
	const [loading, setLoading] = useState(false);
	const [newuser, setNewUser] = useState({
		rNum: "",
		dob: "",
		pass: "",
	});
	// console.log(newuser);

	const val = (e) => {
		const { value, name } = e.target;
		setNewUser(() => {
			return {
				...newuser,
				[name]: value,
			};
		});
	};
	const handleChange = async (e) => {
		e.preventDefault();
		const { user, token, password } = newuser;
		if (user && token && password) {
			setLoading(true)
			await axios.post(`${BASE_URL}/auth/verifyToken`, newuser).then((res) => {
				if(res.data.status){
                    toast.success(res.data.message);
					Navigate("/forgotpassword");
				}
				else{
					toast.error(res.data.message)
				}
			})
			.catch(error=>{
				toast.error(error.message)
			});
		} else {
			toast.error("invalid input")
		}
		setLoading(false)
	};

	return (
		<Containers>
			<ToastContainer autoClose={5000} position="top-center" closeOnClick pauseOnHover draggable />
			<div class="container" id="container">
				<div class="Fpass">
					<form action="#">
						<h1>Forgot Your Password</h1>
						<input type="text" name="user" onChange={val} placeholder="Username or Email" />
						<input type="text" name="password" onChange={val} placeholder="New Password" />
						<input type="text" name="token" onChange={val} placeholder="OTP" />
						
						<LoadingButton  loading={loading} variant="contained"  onClick={handleChange} loadingPosition="end">
  							<span>submit</span>
						</LoadingButton>

						<button onClick={() => Navigate("/")}>Sign In</button>
					</form>
				</div>
			</div>
		</Containers>
	);
}

const Containers = styled.div`
	background: #232323;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: "Montserrat", sans-serif;
	height: 100vh;
	margin: 0;
	@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

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
		color:white;
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
		padding: 0 50px;
		height: 100%;
		text-align: center;
	}

	input {
		background-color: #eee;
		border-radius: 8px;
		border: none;
		padding: 12px 15px;
		margin: 8px 0;
		width: 100%;
	}

	.container {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		position: relative;
		overflow: hidden;
		width: 384px;
		max-width: 100%;
		min-height: 480px;
		background: url("images/doodle2_right.jpg");
		background-size: contain;
	}

	.Fpass {
		top: 0;
		height: 100%;
		background: rgba(255, 255, 255, 0.9);
	}
`;

export default ChangePass;

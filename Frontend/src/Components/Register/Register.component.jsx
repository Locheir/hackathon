import React, { useRef, useState } from 'react';
import './Register.component.css';
import { ServerName } from '../Constants/Constants.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ isLoading, setIsLoading }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [date, setDate] = useState(new Date());
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const Navigate = useNavigate();

	const registerUser = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (password.length > 16 || password.length < 8) {
			alert('password length should be in range of 8 - 16 characters...');
			setPassword('');
			setConfirmPassword('');
			setIsLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			alert('Password and Confirm Password are not Same');
			setPassword('');
			setConfirmPassword('');
			setIsLoading(false);
			return;
		}

		if (!name || !email || !date || !password || !confirmPassword) {
			alert('all fields are required...');
			setIsLoading(false);
			return;
		}

		const myData = {
			name: name,
			email: email.toLowerCase(),
			date: date,
			password: password,
		};

		const result = await axios
			.post(`${ServerName}/register`, myData)
			.catch((err) => {
				alert(
					'Teacher Has been Register Already or Teacher could not register due to failure..'
				);
				console.log(err);
			});

		setName('');
		setEmail('');
		setDate(new Date());
		setPassword('');
		setConfirmPassword('');

		setIsLoading(false);

		if (result) {
			goToLogin();
			alert('Teacher has been Registered ... ');
		}
	};

	const goToLogin = () => {
		Navigate('/login');
	};

	return (
		<div className="container">
			<form className="registerForm">
				<h1>Register</h1>
				<input
					type="text"
					placeholder="Name"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<input
					type="date"
					name="dob"
					id="dob"
					onChange={(e) => {
						setDate(e.target.value);
					}}
					value={date}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					onChange={(e) => setConfirmPassword(e.target.value)}
					value={confirmPassword}
				/>
				<input
					type="submit"
					value="Register"
					onClick={registerUser}
					id="login"
				/>
				<a onClick={goToLogin}>Login</a>
			</form>
		</div>
	);
};

export default Register;

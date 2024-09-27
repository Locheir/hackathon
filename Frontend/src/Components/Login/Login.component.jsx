import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ServerName } from '../Constants/Constants.js';
import './Login.component.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ loggedIn, setLoggedIn, isLoading, setIsLoading }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const Navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const res = await axios.post(
				`${ServerName}/is-logged-in`,
				{},
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
					},
				}
			);

			console.log(res);

			if (res.data.data.isLogin) {
				setLoggedIn(true);
				Navigate('/');
			}
		})();
	}, []);

	useEffect(() => {
		if (loggedIn) {
			Navigate('/');
		}
	}, [loggedIn]);

	const loginUser = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (password.length > 16 || password.length < 8) {
			alert('password length should be in range of 8 - 16 characters...');
			setPassword('');
			return;
		}

		if (!email || !password) {
			alert('all fields are required...');
			return;
		}

		const myData = {
			email: email.toLowerCase(),
			password: password,
		};

		const res = await axios.post(`${ServerName}/login`, myData).catch((err) => {
			alert('Email or Password Invalid');
			console.log(err);
		});

		if (res) {
			localStorage.setItem('accessToken', res.data.data.accessToken);
			localStorage.setItem('refreshToken', res.data.data.refreshToken);
			setIsLoading(false);
			setLoggedIn(true);
		}
		setIsLoading(false);
	};

	function handleRegister(e) {
		e.preventDefault();

		Navigate('/register');
	}

	return (
		<div className="container">
			<form className="form">
				<h1>Login Page</h1>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					id="email"
					className="inputs"
					placeholder="E-mail"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					id="password"
					className="inputs"
					placeholder="Password"
				/>
				<input type="submit" value="Login" onClick={loginUser} id="login" />
				<a onClick={handleRegister}>Register</a>
			</form>
		</div>
	);
};

export default Login;

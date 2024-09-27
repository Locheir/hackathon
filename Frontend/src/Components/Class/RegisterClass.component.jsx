import React, { useState } from 'react';
import axios from 'axios';
import './RegisterClass.component.css';
import { ServerName } from '../Constants/Constants.js';
import { useNavigate } from 'react-router-dom';

function RegisterClass({ loggedIn, isLoading, setIsLoading }) {
	const [classRoom, setClassRoom] = useState('');
	const Navigate = useNavigate();

	const registerClassRoom = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		if (!classRoom) {
			alert('Class Room name is Required..');
		}

		const res = await axios
			.post(
				`${ServerName}/register-class`,
				{ classRoom },
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
					},
				}
			)
			.catch((err) => {
				alert('the class has been already registered');
				console.log(err);
			});

		if (res) {
			alert('New ClassRoom Has been Registered ... ');
		}
		setIsLoading(false);
	};

	function handleRegisterSubject(e) {
		setIsLoading(true);
		e.preventDefault();

		if (!loggedIn) {
			Navigate('/login');
		}

		Navigate('/register-subject');
		setIsLoading(false);
	}

	function handleRegisterStudent(e) {
		setIsLoading(true);
		e.preventDefault();

		if (!loggedIn) {
			Navigate('/login');
		}

		Navigate('/register-student');
		setIsLoading(false);
	}

	return (
		<div className="container">
			<form>
				<h1>Register Class</h1>
				<input
					type="text"
					name="classRoom"
					id="classRoom"
					onChange={(e) => setClassRoom(e.target.value.toUpperCase())}
					placeholder="Class Name"
				/>

				<input
					type="submit"
					value="Register Class"
					onClick={registerClassRoom}
					id="login"
				/>
				<a onClick={handleRegisterSubject}>Register Subject</a>
				<a onClick={handleRegisterStudent}>Register Student</a>
			</form>
		</div>
	);
}

export default RegisterClass;

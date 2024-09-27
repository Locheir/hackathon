import React, { useEffect, useState } from 'react';
import './Catalogue.component.css';
import { ServerName } from '../Constants/Constants.js';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Catalogue = ({ loggedIn, setLoggedIn, isLoading, setIsLoading }) => {
	const Navigate = useNavigate();

	// console.log(loggedIn);

	useEffect(() => {
		if (!loggedIn) {
			Navigate('/login');
		}
	}, []);

	async function logoutTeacher(e) {
		setIsLoading(true);

		e.preventDefault();

		const result = await axios.post(
			`${ServerName}/logout`,
			{},
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
			}
		);

		localStorage.removeItem('accessToken');

		if (result) {
			alert('Teacher has been logged out ...');
			setLoggedIn(false);
			Navigate('/login');
		}
		setIsLoading(false);
	}

	async function handleRegisterClass(e) {
		setIsLoading(true);
		e.preventDefault();

		if (!loggedIn) {
			Navigate('/login');
		}

		Navigate('/register-class');
		setIsLoading(false);
	}

	async function handleRegisterStudent(e) {
		setIsLoading(true);

		e.preventDefault();

		if (!loggedIn) {
			Navigate('/login');
		}

		Navigate('/register-student');
		setIsLoading(false);
	}

	async function handleRegisterSubject(e) {
		setIsLoading(true);
		e.preventDefault();

		if (!loggedIn) {
			Navigate('/login');
		}

		Navigate('/register-subject');
		setIsLoading(false);
	}

	async function handleRegisterAttendance(e) {
		setIsLoading(true);
		e.preventDefault();

		if (!loggedIn) {
			Navigate('/login');
		}

		Navigate('/register-attendance');
		setIsLoading(false);
	}

	async function handleShowStudentAttendance(e) {
		setIsLoading(true);
		e.preventDefault();

		if (!loggedIn) {
			Navigate('/login');
		}

		Navigate('/show-student-attendance');
		setIsLoading(false);
	}

	async function handleShowClassAttendance(e) {
		setIsLoading(true);
		e.preventDefault();

		if (!loggedIn) {
			Navigate('/login');
		}

		Navigate('/show-class-attendance');
		setIsLoading(false);
	}

	return (
		<div className="container">
			<form className="catalogue">
				<h1>Catalogue Menu</h1>
				<input
					type="submit"
					value="Register New Class"
					onClick={handleRegisterClass}
				/>
				<input
					type="submit"
					value="Register New Student"
					onClick={handleRegisterStudent}
				/>
				<input
					type="submit"
					value="Register New Subject"
					onClick={handleRegisterSubject}
				/>

				<input
					type="submit"
					value="Register New Attendance"
					onClick={handleRegisterAttendance}
				/>
				<input
					type="submit"
					value="Show Student Attendance"
					onClick={handleShowStudentAttendance}
				/>
				<input
					type="submit"
					value="Show Class Attendance"
					onClick={handleShowClassAttendance}
				/>
				<input type="submit" value="Logout" onClick={logoutTeacher} />
			</form>
		</div>
	);
};

export default Catalogue;

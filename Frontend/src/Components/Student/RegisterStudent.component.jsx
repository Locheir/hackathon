import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerName } from '../Constants/Constants.js';
import ShowOptions from '../../utils/ShowOptions.utils.jsx';
import GetClasses from '../../utils/GetClasses.utils.jsx';

function RegisterStudent({ isLoading, setIsLoading }) {
	const [classes, setClasses] = useState([]);
	const [name, setName] = useState('');
	const [rollNo, setRollNo] = useState(null);
	const [classRoom, setClassRoom] = useState('');

	const registerStudent = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		if (!rollNo || !name || !classRoom) {
			alert('All Fields Are Required..');
		}

		const myData = {
			name,
			rollNo: Number(rollNo),
			classRoom,
		};

		const res = await axios
			.post(`${ServerName}/register-student`, myData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
			})
			.catch((err) => {
				alert('Student is has been Already Registered or Server Problem ...');
				console.log(err);
			});

		if (res) {
			alert('Student has been Registered Successfully ...');
		}

		setIsLoading(false);

		console.log(res);
	};

	return (
		<div className="container">
			<form>
				<h1>Register Student</h1>
				<GetClasses setClasses={setClasses} />

				<ShowOptions setClassRoom={setClassRoom} classes={classes} />

				<input
					type="text"
					name="student"
					id="student"
					onChange={(e) => setName(e.target.value)}
					placeholder="Name of the student"
				/>
				<input
					type="number"
					name="rollNo"
					id="rollNo"
					onChange={(e) => setRollNo(e.target.value)}
					placeholder="Roll no"
				/>
				<input
					type="submit"
					value="Register"
					onClick={registerStudent}
					id="login"
				/>
			</form>
		</div>
	);
}

export default RegisterStudent;

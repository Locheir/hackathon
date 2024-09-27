import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerName } from '../Constants/Constants.js';
import ShowOptions from '../../utils/ShowOptions.utils.jsx';

function RegisterSubject({ loggedIn, isLoading, setIsLoading }) {
	const [classes, setClasses] = useState([]);
	const [classRoom, setClassRoom] = useState('');
	const [subject, setSubject] = useState('');

	useEffect(() => {
		(async () => {
			let classes = await axios.get(`${ServerName}/get-classes`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
			});
			setClasses(classes.data.data);
		})();
	}, []);

	const registerSubject = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		if (!subject || !classRoom) {
			alert('All Fields Are Required..');
		}

		const myData = {
			subject,
			classRoom,
		};

		const res = await axios
			.post(`${ServerName}/register-subject`, myData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
			})
			.catch((err) => {
				alert('Subject is has been Already Registered or Server Problem ...');
				console.log(err);
			});

		setIsLoading(false);

		if (res) {
			alert('Subject has been Registered ... ');
		}
		console.log(res);
	};

	return (
		<div className="container">
			<form>
				<h1>Register Subject</h1>
				<ShowOptions setClassRoom={setClassRoom} classes={classes} />

				<input
					type="text"
					name="subject"
					id="subject"
					onChange={(e) => setSubject(e.target.value.toUpperCase())}
					placeholder="Subject"
				/>
				<input type="submit" value="Register" onClick={registerSubject} />
			</form>
		</div>
	);
}

export default RegisterSubject;

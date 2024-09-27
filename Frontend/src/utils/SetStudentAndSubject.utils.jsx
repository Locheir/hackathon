import React, { useEffect } from 'react';
import { ServerName } from '../Components/Constants/Constants';
import axios from 'axios';

function SetStudentAndSubject({
	setStudents,
	setSubject,
	classRoom,
	isLoading,
	setIsLoading,
}) {
	useEffect(() => {
		if (!classRoom) {
			setSubject([{}]);
			setStudents([{}]);
			return;
		}

		const myData = {
			classRoom: classRoom,
		};

		(async () => {
			let subjects = await axios.post(`${ServerName}/get-subject`, myData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
			});

			setSubject(subjects.data.data);
		})();

		(async () => {
			const students = await axios.post(`${ServerName}/get-students`, myData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
			});
			setStudents(students.data.data);
		})();
	}, [classRoom]);

	return <></>;
}

export default SetStudentAndSubject;

import React, { useEffect, useState } from 'react';
import GetClasses from '../../utils/GetClasses.utils.jsx';
import ShowOptions from '../../utils/ShowOptions.utils.jsx';
import axios from 'axios';
import { ServerName } from '../Constants/Constants.js';
import ShowClassAttendanceTable from './ShowClassAttendanceTable.controller.jsx';
import Loading from '../Loading/Loading.component.jsx';

function ShowClassAttendance() {
	const [classes, setClasses] = useState([{}]);
	const [classRoom, setClassRoom] = useState('');

	const [subjects, setSubjects] = useState([{}]);
	const [currSubject, setCurrSubject] = useState('');

	const [date, SetDate] = useState();

	const [mainData, setMainData] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!classRoom) {
			setSubjects([{}]);
			SetDate();
			return;
		}

		(async () => {
			let subjects = await axios.post(
				`${ServerName}/get-subject`,
				{ classRoom },
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
					},
				}
			);

			setSubjects(subjects.data.data);
		})();
	}, [classRoom]);

	async function showAttendanceOfClass(e) {
		e.preventDefault();

		if (!classRoom || (!currSubject && !date)) {
			alert('Class and Date or Subject is required ... ');
			return;
		}

		setIsLoading(true);

		const result = await axios
			.post(
				`${ServerName}/get-class-attendance`,
				{ classRoom, currSubject, date },
				{
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
					},
				}
			)
			.catch((err) => {
				alert('Error in Fetching Attendance Data from Server ... ');
				console.log(err);
			});

		setIsLoading(false);

		setMainData(result.data.data);
	}

	return isLoading ? (
		<Loading />
	) : (
		<div>
			<div className="container">
				<form>
					{/* running all useEffect utility functions */}
					<GetClasses setClasses={setClasses} />

					{/* Selection for classes */}
					<ShowOptions setClassRoom={setClassRoom} classes={classes} />

					{/* Selection for Subjects */}
					<ShowOptions setClassRoom={setCurrSubject} classes={subjects} />

					<input
						type="date"
						name="date"
						id="date"
						value={date}
						onChange={(e) => SetDate(e.target.value)}
					/>

					<input
						type="submit"
						value="Show Attendance"
						onClick={showAttendanceOfClass}
						id="login"
						href="attendanceTable"
					/>
				</form>
			</div>
			<ShowClassAttendanceTable
				mainData={mainData}
				currSubject={currSubject}
				date={date}
				subjects={subjects}
			/>
		</div>
	);
}

export default ShowClassAttendance;

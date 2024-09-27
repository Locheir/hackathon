import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ServerName } from '../Constants/Constants.js';
import ShowOptions from '../../utils/ShowOptions.utils.jsx';
import GetClasses from '../../utils/GetClasses.utils.jsx';
import SetStudentAndSubject from '../../utils/SetStudentAndSubject.utils.jsx';
import ShowAttendanceTable from './ShowAttendanceTable.component.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading.component.jsx';

function ShowStudentAttendance() {
	const [classes, setClasses] = useState([{}]);
	const [classRoom, setClassRoom] = useState('');

	const [subjects, setSubjects] = useState([{}]);
	const [currSubject, setCurrSubject] = useState('');

	const [students, setStudents] = useState([{}]);
	const [studentInput, setStudentInput] = useState('');

	const [selectedStudent, setSelectedStudent] = useState({});

	const [attendance, setAttendance] = useState([]);

	const [isLoading, setIsLoading] = useState(false);

	const Navigate = useNavigate();

	let countAttendance = 0;

	const showAttendance = async (e) => {
		e.preventDefault();

		if (!classRoom || !selectedStudent) {
			alert('ClassRoom and Student is required ...');
			return;
		}

		const myData = {
			classRoom,
			currSubject,
			selectedStudent,
		};

		setIsLoading(true);

		const result = await axios
			.post(`${ServerName}/get-student-attendance`, myData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
			})
			.catch((err) => {
				alert('Server Problem in Showing attendance ... ');
				console.log(err);
			});

		setIsLoading(false);

		setAttendance(result.data.data);
	};

	return isLoading ? (
		<Loading />
	) : (
		<div>
			<div className="container containerTemp">
				<form className="form">
					{/* running all useEffect utility functions */}
					<GetClasses
						setClasses={setClasses}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>

					{/* Selection for classes */}
					<ShowOptions setClassRoom={setClassRoom} classes={classes} />

					{/* Selection for Subjects */}
					<ShowOptions setClassRoom={setCurrSubject} classes={subjects} />

					<SetStudentAndSubject
						setStudents={setStudents}
						setSubject={setSubjects}
						classRoom={classRoom}
					/>

					{/* input roll no */}
					<input
						type="number"
						name="student"
						id="student"
						value={studentInput}
						onChange={(e) => setStudentInput(e.target.value)}
						placeholder="Roll No."
					/>
					<input type="submit" value="Search" onClick={showAttendance} />
				</form>
				<div className="container2">
					{/* for selecting According to Roll no */}
					<table className="table1">
						<thead>
							<tr className="tableRow">
								<td>Roll No.</td>
								<td>Name</td>
							</tr>
						</thead>
						<tbody className="tableBody">
							{students
								.filter((stud) => {
									const num = stud?.rollNo;
									return stud && String(num).includes(studentInput);
								})
								.map((stud) => {
									return (
										<tr
											key={stud._id || Math.random()}
											onClick={(e) => setSelectedStudent(stud)}
											className="tableRow"
										>
											<td>{stud.rollNo}</td>
											<td>{stud.name}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
					<table className="table2">
						<thead>
							<tr>
								<td>Selected Student</td>
							</tr>
						</thead>
						<tbody>
							{
								<tr>
									<td>{selectedStudent.rollNo}</td>
									<td>{selectedStudent.name}</td>
								</tr>
							}
						</tbody>
					</table>
				</div>
			</div>
			<ShowAttendanceTable
				attendance={attendance}
				currSubject={currSubject}
				countAttendance={countAttendance}
				selectedStudent={selectedStudent}
			/>
		</div>
	);
}

export default ShowStudentAttendance;

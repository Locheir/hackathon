import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ServerName } from '../Constants/Constants';
import ShowOptions from '../../utils/ShowOptions.utils';
import GetClasses from '../../utils/GetClasses.utils';
import SetStudentAndSubject from '../../utils/SetStudentAndSubject.utils';
import './RegisterAttendance.component.css';

function RegisterAttendance({ isLoading, setIsLoading }) {
	const [classes, setClasses] = useState([{}]);
	const [classRoom, setClassRoom] = useState('');

	const [subject, setSubject] = useState([{}]);
	const [currSubject, setCurrSubject] = useState('');

	const [students, setStudents] = useState([{}]);
	const [currStudent, setCurrStudent] = useState('');

	const [selectedStudent, setSelectedStudent] = useState({});
	const [attendedStudent, setAttendedStudent] = useState([]);

	useEffect(() => {
		if (!selectedStudent._id) return;

		let flag = false;

		attendedStudent.map((item) => {
			if (item._id === selectedStudent._id) {
				flag = true;
			}
		});

		if (flag) return;

		setAttendedStudent(attendedStudent.concat(selectedStudent));
	}, [selectedStudent]);

	const registerAttendance = async (e) => {
		setIsLoading(true);
		e.preventDefault();

		if (!classRoom || !currSubject || !attendedStudent) {
			alert('all Fields are Required...');
		}

		const myData = {
			classRoom,
			currSubject,
			attendedStudent,
		};

		const res = await axios
			.post(`${ServerName}/register-attendance`, myData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
			})
			.catch((err) => {
				alert('Server Problem in Registering attendance...');
				console.log(err);
			});

		if (res) {
			alert('Attendance has been Registered ...');
			setAttendedStudent([]);
		}
		setIsLoading(false);

		console.log(res);
	};

	function removeStudent(e, item) {
		e.preventDefault();

		const removedStudent = attendedStudent.filter(
			(stud) => stud.rollNo !== item.rollNo
		);

		setAttendedStudent(removedStudent);
	}

	// console.log(attendedStudent);

	return (
		<div className="container containerTemp">
			<form className="form">
				{/* running all useEffect utility functions */}
				<GetClasses setClasses={setClasses} />
				<SetStudentAndSubject
					setStudents={setStudents}
					setSubject={setSubject}
					classRoom={classRoom}
				/>

				{/* Selection for classes */}
				<ShowOptions setClassRoom={setClassRoom} classes={classes} />

				{/* Selection for Subjects */}
				<ShowOptions setClassRoom={setCurrSubject} classes={subject} />

				{/* input roll no */}
				<input
					type="number"
					name="student"
					id="student"
					value={currStudent}
					onChange={(e) => setCurrStudent(e.target.value)}
					placeholder="Roll No."
				/>

				<input
					type="submit"
					value="Register Attendance"
					onClick={registerAttendance}
					id="login"
				/>
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
								return stud && String(num).includes(currStudent);
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
						<tr className="tableRow">
							<td>Selected Students</td>
						</tr>
					</thead>
					<tbody className="tableBody">
						{/* Selected Student showing */}
						{attendedStudent.map((item) => {
							return (
								<tr key={item._id} className="tableRow">
									<td className="cancelStudent">
										{item.name}
										<input
											type="submit"
											value="X"
											onClick={(e) => removeStudent(e, item)}
											className="cancelButton"
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default RegisterAttendance;

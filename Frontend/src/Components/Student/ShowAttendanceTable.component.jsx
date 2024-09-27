import React, { useState } from 'react';
import './ShowStudentAttendanceTable.component.css';

function ShowAttendanceTable({
	attendance,
	currSubject,
	countAttendance,
	selectedStudent,
	isLoading,
	setIsLoading,
}) {
	function format(inputDate) {
		let date, month, year;

		date = inputDate.getDate();
		month = inputDate.getMonth() + 1;
		year = inputDate.getFullYear();
		date = date.toString().padStart(2, '0');
		month = month.toString().padStart(2, '0');
		return `${date}-${month}-${year}`;
	}

	return (
		<div className="div">
			<div className="divForm">
				<h1>Student Attendance</h1>
				<table className="table">
					<thead>
						<tr className="TempRow">
							<th>Date</th>
							<th>subject</th>
							<th>attendance</th>
						</tr>
					</thead>
					<tbody>
						{attendance.map((item) => {
							if (item.present) {
								countAttendance = countAttendance + 1;
							}

							if (currSubject) {
								if (currSubject === item.subject._id) {
									return (
										<tr key={item._id} className="TempRow color">
											<td>{format(new Date(item.Date))}</td>
											<td>{item.subject.name}</td>
											<td>{item.present ? 'Present' : 'Absent'}</td>
										</tr>
									);
								} else {
									return;
								}
							}

							return (
								<tr key={item._id} className="TempRow color">
									<td>{format(new Date(item.Date))}</td>
									<td>{item.subject.name}</td>
									<td>{item.present ? 'Present' : 'Absent'}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div>
					<h3>
						Attendance Percentage of {selectedStudent.name || 'mr. NoBody'} is:
						{((countAttendance / attendance.length) * 100).toFixed(2) || 0}
					</h3>
				</div>
			</div>
		</div>
	);
}

export default ShowAttendanceTable;

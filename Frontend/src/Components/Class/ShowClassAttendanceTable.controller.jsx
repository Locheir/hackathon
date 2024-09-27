import React from 'react';
import './ShowClassAttendanceTable.component.css';

function ShowClassAttendanceTable({ mainData, currSubject, date, subjects }) {
	function format(inputDate) {
		let date, month, year;

		date = inputDate.getDate();
		month = inputDate.getMonth() + 1;
		year = inputDate.getFullYear();
		date = date.toString().padStart(2, '0');
		month = month.toString().padStart(2, '0');
		return `${date}-${month}-${year}`;
	}

	function isDateSame(date1, date2) {
		const newDate = new Date(date1);
		const currDate = newDate.getDate();
		const currMonth = newDate.getMonth();
		const currYear = newDate.getFullYear();

		const storedDate = new Date(date2);
		const tempDate = storedDate.getDate();
		const tempMonth = storedDate.getMonth();
		const tempYear = storedDate.getFullYear();

		const result =
			currDate === tempDate && currMonth === tempMonth && currYear === tempYear;

		return result;
	}

	function getSubject(subject) {
		if (!currSubject) {
			let ans;
			subjects.map((sub) => {
				if (sub._id === subject) {
					ans = sub.name;
				}
			});
			return ans;
		}
	}

	// console.log(mainData);

	return (
		<div className="div attendanceTable">
			<div className="divForm">
				<h1>Class Attendance</h1>
				<table className="table">
					<thead>
						<tr className="TempRow">
							<th>Roll No.</th>
							<th>Student name</th>
							<th>Subject</th>
							<th>Date</th>
							<th>Attendance</th>
						</tr>
					</thead>
					<tbody>
						{mainData.map((item) => {
							return item.studentAttendances.map((attendance) => {
								if (currSubject && !date) {
									if (currSubject === attendance.subject._id) {
										return (
											<tr key={attendance._id} className="TempRow color">
												<td>{item.student.rollNo}</td>
												<td>{item.student.name}</td>
												<td>
													{attendance.subject?.name ||
														getSubject(attendance.subject)}
												</td>
												<td>{format(new Date(attendance.Date))}</td>
												<td>{attendance.present ? 'true' : 'false'}</td>
											</tr>
										);
									}
								}

								if (!currSubject && date) {
									if (isDateSame(new Date(date), new Date(attendance.Date))) {
										return (
											<tr key={attendance._id} className="TempRow color">
												<td>{item.student.rollNo}</td>
												<td>{item.student.name}</td>
												<td>
													{attendance.subject?.name ||
														getSubject(attendance.subject)}
												</td>
												<td>{format(new Date(attendance.Date))}</td>
												<td>{attendance.present ? 'true' : 'false'}</td>
											</tr>
										);
									}
								}

								if (currSubject && date) {
									if (
										isDateSame(new Date(date), new Date(attendance.Date)) &&
										currSubject === attendance.subject._id
									) {
										return (
											<tr key={attendance._id} className="TempRow color">
												<td>{item.student.rollNo}</td>
												<td>{item.student.name}</td>
												<td>
													{attendance.subject?.name ||
														getSubject(attendance.subject)}
												</td>
												<td>{format(new Date(attendance.Date))}</td>
												<td>{attendance.present ? 'true' : 'false'}</td>
											</tr>
										);
									}
								}
							});
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ShowClassAttendanceTable;

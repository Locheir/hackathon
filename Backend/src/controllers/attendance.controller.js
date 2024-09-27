import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { asyncHandler } from '../utils/asyncHandler.utils.js';
import { ClassRoom } from '../models/classRoom.models.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { Student } from '../models/student.models.js';
import { Subject } from '../models/subject.models.js';
import { Attendance } from '../models/attendance.models.js';
import mongoose from 'mongoose';

const RegisterAttendance = asyncHandler(async (req, res) => {
	//get classRoom, currSubject and attendedStudent from req.body
	//find classroom from Classroom model
	//find students from classroom
	//register student attendance using attendance model
	//update attendance in student model
	//return res with true value

	const { classRoom, currSubject, attendedStudent } = req.body;

	if (!classRoom || !currSubject || !attendedStudent) {
		throw new ApiError(
			402,
			'all fields are required for storing attendance...'
		);
	}

	const Class = await ClassRoom.find({ _id: classRoom });

	const Students = Class[0]?.students;

	let data = [];

	for (let i = 0; i < Students.length; i++) {
		const temp = await Student.findById(Students[i]);
		data.push(temp);
	}

	const subject = await Subject.findById(currSubject);

	const isThere = async (stud) => {
		let result = false;
		await attendedStudent.map((item) => {
			if (new mongoose.Types.ObjectId(stud._id) == item._id) {
				result = true;
				return result;
			}
		});

		return result;
	};

	data.map(async (stud) => {
		const student = await Student.findById(stud._id);

		let attendance;

		if (await isThere(stud)) {
			attendance = await Attendance.create({
				subject: subject,
				Date: new Date(),
				present: true,
			});
		} else {
			attendance = await Attendance.create({
				subject: subject,
				Date: new Date(),
				present: false,
			});
		}

		if (!attendance) {
			throw new ApiError(501, 'Failure in attendance Registration ...');
		}

		const isUpdated = await Student.updateOne(
			{ _id: stud._id },
			{ $push: { attendance: attendance } }
		);

		if (!isUpdated) {
			await Attendance.deleteOne({ _id: attendance._id });
			throw new ApiError(
				501,
				'Attendance is not updated in student array Due to Server Error..'
			);
		}
	});

	return res
		.status(201)
		.json(
			new ApiResponse(
				201,
				{ ...attendedStudent, attendanceRegistered: true },
				'student attendance is done'
			)
		);
});

export { RegisterAttendance };

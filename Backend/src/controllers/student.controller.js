import { asyncHandler } from '../utils/asyncHandler.utils.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { Student } from '../models/student.models.js';
import { ClassRoom } from '../models/classRoom.models.js';
import { Attendance } from '../models/attendance.models.js';
import { Subject } from '../models/subject.models.js';

const RegisterStudent = asyncHandler(async (req, res) => {
	const { name, rollNo, classRoom } = req.body;

	if (!name || !rollNo || !classRoom) {
		throw new ApiError(401, 'all fields are required ...');
	}

	const Class = await ClassRoom.findById(classRoom);

	const students = Class?.students;

	for (let i = 0; i < students.length; i++) {
		const stud = await Student.findById(students[i]);

		if (stud?.rollNo === rollNo) {
			throw new ApiError(409, 'The Student Has Already Registered..');
		}
	}

	// console.log('\nClass');

	const student = await Student.create({
		rollNo,
		name,
	});

	if (!student) {
		throw new ApiError(501, 'Student not registered..');
	}

	const isUpdated = await ClassRoom.updateOne(
		{ _id: classRoom },
		{ $push: { students: student } }
	);

	if (!isUpdated) {
		await Student.deleteOne({ name: student.name });
		throw new ApiError(501, 'error in update the classRoom model ...');
	}

	return res
		.status(201)
		.json(
			new ApiResponse(
				201,
				student,
				`The Student has been Registered Successfully..`
			)
		);
});

const GetStudents = asyncHandler(async (req, res) => {
	const { classRoom } = req.body;

	if (!classRoom) {
		throw new ApiError(409, 'classRoom is Required for Fetching students ... ');
	}

	const Class = await ClassRoom.find({ _id: classRoom });

	const Students = Class[0]?.students;

	let data = [];

	for (let i = 0; i < Students.length; i++) {
		const temp = await Student.findById(Students[i]);
		data.push(temp);
	}

	return res.json(
		new ApiResponse(201, data, 'student data fetched successfully...')
	);
});

const GetStudentAttendance = asyncHandler(async (req, res) => {
	const { classRoom, currSubject, selectedStudent } = req.body;

	if (!classRoom || !selectedStudent) {
		throw new ApiError(401, 'Class and Student are required ... ');
	}

	const student = await Student.findById(selectedStudent._id);

	// console.log(student);

	const attendance = student?.attendance;

	let data = [];

	for (let i = 0; i < attendance.length; i++) {
		let attend = await Attendance.findById(attendance[i]);

		const subject = await Subject.findById(attend.subject._id);

		attend.subject = subject;

		data.push(attend);
	}

	// console.log(data);

	return res
		.status(201)
		.json(
			new ApiResponse(
				201,
				data,
				'Student attendance is fetched Successfully...'
			)
		);
});

export { RegisterStudent, GetStudents, GetStudentAttendance };

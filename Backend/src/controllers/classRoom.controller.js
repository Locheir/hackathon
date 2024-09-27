import { asyncHandler } from '../utils/asyncHandler.utils.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { ClassRoom } from '../models/classRoom.models.js';
import { Student } from '../models/student.models.js';
import { Attendance } from '../models/attendance.models.js';
import { Subject } from '../models/subject.models.js';

const RegisterClassRoom = asyncHandler(async (req, res) => {
	// get the class room name from user
	// check if there is a class of that name
	//create the entry of that class
	// return the class is created

	const { classRoom } = req.body;

	const isClassRoomExist = await ClassRoom.findOne({ classRoom });

	if (isClassRoomExist) {
		throw new ApiError(401, 'the ClassRoom has Already Created ... ');
	}

	const newClass = await ClassRoom.create({ name: classRoom });

	const isNewClassCreated = await ClassRoom.findById(newClass._id);

	if (!isNewClassCreated) {
		throw new ApiError(501, 'Issue With creating the new Class... ');
	}

	return res
		.status(201)
		.json(
			new ApiResponse(201, newClass, 'New ClassRoom is Created Successfully')
		);
});

const GetClasses = asyncHandler(async (req, res) => {
	let allClasses = await ClassRoom.find();
	return res
		.status(201)
		.json(new ApiResponse(201, allClasses, 'all records found successfully..'));
});

const ShowClassAttendance = asyncHandler(async (req, res) => {
	const { classRoom, currSubject, date } = req.body;

	if ((!classRoom && !currSubject) || (!classRoom && !date)) {
		throw new ApiError(402, 'at least 2 fields are required ... ');
	}

	const Class = await ClassRoom.findById(classRoom);

	const students = [];

	const data = [];

	for (let i = 0; i < Class.students.length; i++) {
		const student = await Student.findById(Class.students[i]);

		students.push(student);
	}

	for (let i = 0; i < students.length; i++) {
		const attendances = students[i].attendance;

		const tempData = [];

		for (let i = 0; i < attendances.length; i++) {
			const attendance = await Attendance.findById(attendances[i]);

			let subject;
			if (currSubject) {
				subject = await Subject.findById(currSubject);
				attendance.subject = subject;
			}

			tempData.push(attendance);
		}

		data.push({ student: students[i], studentAttendances: tempData });
	}

	// console.log(data);

	return res
		.status(201)
		.json(
			new ApiResponse(
				201,
				data,
				'data fetched successfully from show class attendance ... '
			)
		);
});

export { RegisterClassRoom, GetClasses, ShowClassAttendance };

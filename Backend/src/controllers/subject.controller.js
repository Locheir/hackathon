import { asyncHandler } from '../utils/asyncHandler.utils.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { Subject } from '../models/subject.models.js';
import { ClassRoom } from '../models/classRoom.models.js';
import mongoose from 'mongoose';

const RegisterSubject = asyncHandler(async (req, res) => {
	const { subject, classRoom } = req.body;

	const isSubjectExist = await Subject.findOne({ subject });

	if (isSubjectExist) {
		throw new ApiError(401, 'the ClassRoom has Already Created ... ');
	}

	const isSubjectCreated = await Subject.create({
		name: subject,
	});

	if (!isSubjectCreated) {
		throw new ApiError(501, 'Student not registered..');
	}

	const isUpdated = await ClassRoom.updateOne(
		{ _id: classRoom },
		{ $push: { subject: isSubjectCreated } }
	);

	if (isUpdated.modifiedCount == 0) {
		await Subject.deleteOne({ subject: isSubjectCreated });
		throw new ApiError(
			501,
			'error in update the Subject of classRoom model ...'
		);
	}

	return res
		.status(201)
		.json(
			new ApiResponse(
				201,
				isSubjectCreated,
				`The Subject has been Registered Successfully..`
			)
		);
});

const GetSubject = asyncHandler(async (req, res) => {
	const { classRoom } = req.body;

	if (!classRoom) {
		throw new ApiError(402, 'Classroom is Required for Getting Subject ...');
	}

	const Class = await ClassRoom.find({ _id: classRoom });

	const Subjects = Class[0]?.subject;

	let data = [];

	for (let i = 0; i < Subjects.length; i++) {
		const temp = await Subject.findById(Subjects[i]);
		data.push(temp);
	}

	return res
		.status(201)
		.json(new ApiResponse(201, data, 'Subject data fetched successfully...'));
});

export { RegisterSubject, GetSubject };

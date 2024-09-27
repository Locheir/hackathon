import mongoose, { Schema, model } from 'mongoose';

const attendanceSchema = new Schema(
	{
		subject: {
			type: Schema.Types.ObjectId,
			ref: 'Subject',
			required: true,
		},
		Date: {
			type: Date,
			required: true,
		},
		present: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Attendance = model('Attendance', attendanceSchema);

import mongoose, { Schema, model } from 'mongoose';

const studentSchema = new Schema(
	{
		rollNo: {
			type: Number,
			required: true,
		},

		name: {
			type: String,
			required: true,
		},

		attendance: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Attendance',
			},
		],
	},
	{ timestamps: true }
);

export const Student = model('Student', studentSchema);

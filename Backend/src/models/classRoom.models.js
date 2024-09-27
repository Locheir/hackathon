import mongoose, { Schema, model } from 'mongoose';

const classRoomSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		subject: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Subject',
			},
		],
		students: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Student',
			},
		],
	},
	{ timestamps: true }
);

export const ClassRoom = model('ClassRoom', classRoomSchema);

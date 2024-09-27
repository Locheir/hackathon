import mongoose, { Schema, model } from 'mongoose';

const subjectSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Subject = model('Subject', subjectSchema);

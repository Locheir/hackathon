import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const teacherSchema = new Schema(
	{
		Name: {
			type: String,
			required: true,
		},
		Email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			index: true,
		},
		DOB: {
			type: Date,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: String,
		},
	},
	{ timestamps: true }
);

teacherSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

teacherSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

teacherSchema.methods.generateAccessToken = async function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

teacherSchema.methods.generateRefreshToken = async function () {
	const refreshToken = jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
	return refreshToken;
};

export const Teacher = mongoose.model('Teacher', teacherSchema);

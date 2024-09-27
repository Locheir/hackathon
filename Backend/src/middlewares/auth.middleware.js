import { Teacher } from '../models/teacher.models.js';
import { asyncHandler } from '../utils/asyncHandler.utils.js';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.utils.js';

export const verifyJwt = asyncHandler(async (req, res, next) => {
	try {
		const token =
			req.cookies?.accessToken ||
			req.header('Authorization')?.replace('Bearer ', '') ||
			req.body?.headers?.Authorization?.replace('Bearer ', '');

		if (!token) {
			throw new ApiError(401, 'Unauthorized request..');
		}

		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		const teacher = await Teacher.findById(decodedToken?._id).select(
			'-password -refreshToken'
		);

		if (!teacher) {
			throw new ApiError(401, 'Invalid Access Token');
		}

		req.teacher = teacher;
		next();
	} catch (error) {
		throw new ApiError(401, error?.message || 'Invalid access token');
	}
});

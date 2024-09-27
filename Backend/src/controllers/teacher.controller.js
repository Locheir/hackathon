import { asyncHandler } from '../utils/asyncHandler.utils.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { Teacher } from '../models/teacher.models.js';

const generateAccessAndRefreshToken = async (teacherID) => {
	try {
		const teacher = await Teacher.findById(teacherID);
		const accessToken = await teacher.generateAccessToken();
		const refreshToken = await teacher.generateRefreshToken();

		teacher.refreshToken = refreshToken;
		await teacher.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(
			500,
			'Something went wrong while generating refresh and access token'
		);
	}
};

const RegisterTeacher = asyncHandler(async (req, res) => {
	const { name, email, date, password } = req.body;

	if (!name || !email || !date || !password) {
		throw new ApiError(400, 'All Fields are Required..');
	}

	const existedTeacher = await Teacher.findOne({ Email: email });

	if (existedTeacher) {
		throw new ApiError(409, 'The Teacher Has Already Registered..');
	}

	const teacher = await Teacher.create({
		Name: name,
		Email: email,
		DOB: date,
		password,
	});

	const createdTeacher = await Teacher.findById(teacher._id).select(
		'-password -refreshToken'
	);

	if (!createdTeacher) {
		throw new ApiError(501, 'Teacher not registered..');
	}

	return res
		.status(201)
		.json(
			new ApiResponse(
				201,
				createdTeacher,
				`The Teacher has been Registered Successfully..`
			)
		);
});

const LoginTeacher = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new ApiError(400, 'All Fields are Required..');
	}

	const teacher = await Teacher.findOne({ Email: email });

	if (!teacher) {
		throw new ApiError(409, 'The Teacher is not Registered..');
	}

	const isPasswordValid = await teacher.isPasswordCorrect(password);

	if (!isPasswordValid) {
		throw new ApiError(401, 'invalid user Credentials...');
	}

	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		teacher._id
	);

	const loggedInTeacher = await Teacher.findById(teacher._id).select(
		'-password -refreshToken'
	);

	const options = {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
	};

	return res
		.status(201)
		.cookie('accessToken', accessToken, options)
		.cookie('refreshToken', refreshToken, options)
		.json(
			new ApiResponse(
				201,
				{
					teacher: loggedInTeacher,
					refreshToken,
					accessToken,
				},
				`user Logged in Successfully`
			)
		);
});

const IsLoggedIn = asyncHandler(async (req, res) => {
	return res
		.status(201)
		.json(new ApiResponse(201, { isLogin: true }, 'user is also logged in'));
});

const LogoutTeacher = asyncHandler(async (req, res) => {
	await Teacher.findByIdAndUpdate(
		req.teacher._id,
		{
			$set: {
				refreshToken: undefined,
			},
		},
		{
			new: true,
		}
	);

	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.clearCookie('accessToken', options)
		.clearCookie('refreshToken', options)
		.json(new ApiResponse(200, {}, 'Teacher Logged Out'));
});

export { RegisterTeacher, LoginTeacher, LogoutTeacher, IsLoggedIn };

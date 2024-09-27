import { Router } from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import {
	IsLoggedIn,
	LoginTeacher,
	LogoutTeacher,
	RegisterTeacher,
} from '../controllers/teacher.controller.js';
import {
	RegisterClassRoom,
	GetClasses,
	ShowClassAttendance,
} from '../controllers/classRoom.controller.js';
import {
	GetStudentAttendance,
	GetStudents,
	RegisterStudent,
} from '../controllers/student.controller.js';
import {
	GetSubject,
	RegisterSubject,
} from '../controllers/subject.controller.js';
import { RegisterAttendance } from '../controllers/attendance.controller.js';

const router = Router();

router.route('/register').post(RegisterTeacher);
router.route('/login').post(LoginTeacher);
router.route('/logout').post(verifyJwt, LogoutTeacher);
router.route('/is-logged-in').post(verifyJwt, IsLoggedIn);

router.route('/register-class').post(verifyJwt, RegisterClassRoom);
router.route('/get-classes').get(verifyJwt, GetClasses);
router.route('/get-class-attendance').post(verifyJwt, ShowClassAttendance);

router.route('/register-student').post(verifyJwt, RegisterStudent);
router.route('/get-students').post(verifyJwt, GetStudents);
router.route('/get-student-attendance').post(verifyJwt, GetStudentAttendance);

router.route('/register-subject').post(verifyJwt, RegisterSubject);
router.route('/get-subject').post(verifyJwt, GetSubject);

router.route('/register-attendance').post(verifyJwt, RegisterAttendance);

export default router;

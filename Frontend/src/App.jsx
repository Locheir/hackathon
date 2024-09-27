import { useEffect, useState } from 'react';
import './App.css';
import Catalogue from './Components/Catalogue/Catalogue.component.jsx';
import Register from './Components/Register/Register.component.jsx';
import Login from './Components/Login/Login.component.jsx';
import RegisterClass from './Components/Class/RegisterClass.component.jsx';
import RegisterStudent from './Components/Student/RegisterStudent.component.jsx';
import RegisterSubject from './Components/Subject/RegisterSubject.component.jsx';
import RegisterAttendance from './Components/Attendance/RegisterAttendance.controller.jsx';
import ShowStudentAttendance from './Components/Student/ShowStudentAttendance.component.jsx';
import ShowClassAttendance from './Components/Class/ShowClassAttendance.component.jsx';
import Layout from './Components/Layout/Layout.component.jsx';
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Loading from './Components/Loading/Loading.component.jsx';
import ShowAttendanceTable from './Components/Student/ShowAttendanceTable.component.jsx';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path="/"
				element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
			>
				<Route
					path=""
					element={
						<Catalogue
							loggedIn={loggedIn}
							setLoggedIn={setLoggedIn}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
					}
				/>
				<Route
					path="register-class"
					element={
						<RegisterClass
							loggedIn={loggedIn}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
					}
				/>
				<Route
					path="register-student"
					element={
						<RegisterStudent
							setIsLoading={setIsLoading}
							isLoading={isLoading}
						/>
					}
				/>
				<Route
					path="register-subject"
					element={
						<RegisterSubject
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
					}
				/>
				<Route
					path="register-attendance"
					element={
						<RegisterAttendance
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
					}
				/>
				<Route
					path="show-student-attendance"
					element={
						<ShowStudentAttendance
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
					}
				/>
				<Route path="show-class-attendance" element={<ShowClassAttendance />} />
				<Route
					path="register"
					element={
						<Register isLoading={isLoading} setIsLoading={setIsLoading} />
					}
				/>
				<Route
					path="login"
					element={
						<Login
							loggedIn={loggedIn}
							setLoggedIn={setLoggedIn}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
					}
				/>
			</Route>
		)
	);

	return <>{isLoading ? <Loading /> : <RouterProvider router={router} />}</>;
}

export default App;

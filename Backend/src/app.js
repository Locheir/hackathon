import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { RegisterTeacher } from './controllers/teacher.controller.js';

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// //import routes
import router from './routes/index.router.js';

// //routes declaration
app.use('/api', router);

// http://localhost:8000/api

export { app };

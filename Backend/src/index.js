import { app } from './app.js';
import connectDB from './db/connectDB.db.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

connectDB()
	.then(() => {
		app.on('error', (error) => {
			console.log('error in connecting to mongodb', error);
			throw error;
		});
		app.listen(process.env.PORT || 8000, () => {
			console.log(`server is running at port : ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.log('mongodb promise is rejected.....', error);
	});

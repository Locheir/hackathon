import mongoose from 'mongoose';
import { DBName } from '../constants.js';

const connectDB = async () => {
	try {
		const connectedDB = await mongoose.connect(
			`${process.env.MONGODB_URI}/${DBName}`
		);
		console.log(
			`\nthe database is connected and host is : ${connectedDB.connection.host}`
		);
	} catch (error) {
		console.log('error in database connection', error);
		process.exit(1);
	}
};

export default connectDB;

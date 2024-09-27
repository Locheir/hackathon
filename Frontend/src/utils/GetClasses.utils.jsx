import axios from 'axios';
import React, { useEffect } from 'react';
import { ServerName } from '../Components/Constants/Constants';

const GetClasses = ({ setClasses, isLoading, setIsLoading }) => {
	useEffect(() => {
		(async () => {
			let classes = await axios.get(`${ServerName}/get-classes`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				},
			});
			setClasses(classes.data.data);
		})();
	}, []);

	return <></>;
};

export default GetClasses;

import React from 'react';
import './ShowOptions.utils.css';

const ShowOptions = ({ setClassRoom, classes }) => {
	return (
		<select
			name="classes"
			id="classes"
			onChange={(e) => setClassRoom(e.target.value)}
			className="selectMenu"
		>
			<option value="">no Input</option>
			{classes.map((Class) => (
				<option value={Class._id} key={Class._id || Math.random()}>
					{Class.name}
				</option>
			))}
		</select>
	);
};

export default ShowOptions;
